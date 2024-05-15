import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ManagementService } from 'src/app/shared/services/Management/management.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-appointments-setup',
  templateUrl: './appointments-setup.component.html',
  styleUrls: ['./appointments-setup.component.scss']
})
export class AppointmentsSetupComponent {
  branchIdFilter = new FormControl()
  model: any = {};
  constructor(public thirdPartytoastyService: ThirdPartytoastyService, private HISLogicService: HISLogicService, private lookupsService: LookupsService) {
    // setTimeout(() => {
    //   this.searchDepartments()
    // }, 10);
    this.branchIdFilter.valueChanges.subscribe(z => {
      this.lstDoctors = []
      this.lstDepartments = []
      this.model = {}
      this.searchDepartments(this.branchIdFilter.value ?? "")
    })

    this.loadLookups()

  }

  lstDepartments: any = []
  searchDepartments(branchId: any) {
    this.lookupsService.LookupsWithObj({ categoryCode: 'Departments', branchId: branchId }).subscribe(z => {
      this.lstDepartments = z;
    })
  }
  lstDoctors: any = []
  searchDoctors(departmentId: any, branchId: any) {
    this.lookupsService.LookupsWithObj({ categoryCode: 'UserBasedType', userTypeId: 2, departmentId: departmentId, branchId: branchId }).subscribe(z => {
      this.lstDoctors = z;
    })
  }
  selectedDepartment: any = {}
  selectDepartment(r: any) {
    this.lstDoctors = []
    this.model = {}

    this.selectedDepartment = r
    this.model.departmentId = r.value
    this.searchDoctors(r.value, this.branchIdFilter.value)
  }
  selectDoctor() {
    setTimeout(() => {
      this.getRelatedAppointment()
    }, 10);
  }
  sortData($e: any) { }
  initModel(obj: any) {
    if (obj) {
      this.model = obj; //
      if (this.model['lstDetails'].length == 0) {
        this.model['lstDetails'] = this.thirdPartytoastyService.lstDaysLkps.map(z => {
          return {
            inDay: z['value'],
            isActive: true
          }
        })
      }
    } else {
      this.model = { ...this.model, branchId: this.branchIdFilter.value }
      this.model['lstDetails'] = this.thirdPartytoastyService.lstDaysLkps.map(z => {
        return {
          inDay: z['value'],
          isActive: true
        }
      })
    }
  }
  getRelatedAppointment() {
    this.HISLogicService.AppointmentSetupDetails({
      doctorId: this.model.doctorId,
      departmentId: this.model.departmentId,
      branchId: this.branchIdFilter.value
    }).subscribe(z => {
      this.initModel(z)
    })
  }
  lstKeysRequiredOnInventoryLookups = ['Branches'];
  lstInventoryLookupsByKey: any = {}
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;
      })
    })
  }

  save() {
    this.thirdPartytoastyService.info("Please wait!", "")
    this.HISLogicService.AddAppointmentSetup(this.model).subscribe(z => {
      if (z.status) {
        this.thirdPartytoastyService.success()
        ////////////
      }
    })
  }
}
