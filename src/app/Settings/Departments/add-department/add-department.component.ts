import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ManagementService } from 'src/app/shared/services/Management/management.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {

  lang = "labelEn"
  modal: any = {}
  Id;
  constructor(private lookupsService: LookupsService, private managementService: ManagementService, private thirdPartytoastyService: ThirdPartytoastyService, private route: ActivatedRoute) {
    this.Id = this.route.snapshot.paramMap.get("id");
  }
  lstData = []
  ngOnInit(): void {
    this.loadLookups()
    this.pageInit()
  }

  pageInit() {
    if (this.Id) {
      this.UserDetails(this.Id)
    } else {
      this.modal = { isActive: 'true', UserType: 1, allowToLogin: true }
    }
  }
  UserDetails(Id: any) {
    this.managementService.DepartmentDetails(Id).subscribe(z => {
      this.modal = this.parseObjFromServer(z);
    })
  }
  lstKeysRequiredOnInventoryLookups = ['DepartmentTypes', 'VisitTypes', 'Branches'];
  lstInventoryLookupsByKey: any = {}
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;
      })
    })
  }
  parseObjFromServer(z: any) {
    if (z['lstDepartmentBranches']) {
      z['_lstDepartmentBranches'] = z['lstDepartmentBranches'].map((a: any) => a['branchId'])
    }
    z['isActive'] = z['isActive'] == true ? 'true' : 'false'
    return z;
  }
  prepareObjToServer(modal: any) {
    modal.isActive = modal.isActive == 'true';

    if (modal['_lstDepartmentBranches']) {
      modal['lstDepartmentBranches'] = modal['_lstDepartmentBranches'].map((a: any) => { return { branchId: a } })
    }

    return modal;
  }
  reqFields: any = ['nameEn', 'nameAr', 'departmentTypeId']
  save() {
    let validRes = this.thirdPartytoastyService.checkValidation(this.modal, this.reqFields);
    if (validRes.isValid) {
      let modal = this.prepareObjToServer(this.modal);
      this.thirdPartytoastyService.info("Please wait!", "")
      this.managementService.AddDepartment(modal).subscribe({
        next: z => {
          if (z.status) {
            this.thirdPartytoastyService.success("Save", "Saved Successfully!")
            this.Id = z['entityId']
            this.UserDetails(this.Id);
          }
          if (z['lstError'].length > 0) {
            this.thirdPartytoastyService.error(z['lstError'][0])
          }

        }, error: e => {
          this.thirdPartytoastyService.error("Fill required fields")
        }
      })
    } else {
      this.thirdPartytoastyService.error("Fill required fields")
    }
  }


  back() {
    this.thirdPartytoastyService.navigateTo('../settings/users')
  }
}
