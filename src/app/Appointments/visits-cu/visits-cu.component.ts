import { AfterViewInit, Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddPatientsComponent } from 'src/app/Settings/add-patients/add-patients.component';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-visits-cu',
  templateUrl: './visits-cu.component.html',
  styleUrls: ['./visits-cu.component.scss']
})
export class VisitsCuComponent {
  patientSearchFilter = new FormControl('')
  lang = "labelEn"
  modal: any = {}
  Id;
  @ViewChild('addQuickPatient') addQuickPatientModal?: TemplateRef<HTMLDivElement>;

  constructor(private lookupsService: LookupsService, private hisLogicService: HISLogicService, private tps: ThirdPartytoastyService, private route: ActivatedRoute) {
    this.Id = this.route.snapshot.paramMap.get("id");
    setTimeout(() => {
      this.searchPatients()
    }, 10);


    this.patientSearchFilter.valueChanges.subscribe(z => this.searchPatients())
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
      this.modal = { isActive: 'true', UserType: 3 }
    }
  }
  UserDetails(Id: any) {
    this.hisLogicService.ServiceDetails(Id).subscribe(z => {
      this.modal = this.parseObjFromServer(z);
      this.birthDateChanged()

    })
  }
  lstKeysRequiredOnInventoryLookups = [];
  lstInventoryLookupsByKey: any = {}
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;
      })
    })
  }
  parseObjFromServer(z: any) {
    // z['createDate'] = this.tps.dateFormat(z['createDate'])
    // z['isActive'] = z['isActive'] == true ? 'true' : 'false'
    return z;
  }
  prepareObjToServer(modal: any) {
    modal.isActive = modal.isActive == 'true';
    return modal;
  }
  reqFields: any = ['nameEn', 'nameAr']
  save() {
    let validRes = this.tps.checkValidation(this.modal, this.reqFields);
    if (validRes.isValid) {
      let modal = this.prepareObjToServer(this.modal);
      this.tps.info("Please wait!", "")
      this.hisLogicService.AddService(modal).subscribe({
        next: z => {
          if (z.status) {
            this.tps.success("Save", "Saved Successfully!")
            this.Id = z['entityId']
            this.UserDetails(this.Id);
          }
          if (z['lstError'].length > 0) {
            this.tps.error(z['lstError'][0])
          }

        }, error: e => {
          this.tps.error("Fill required fields")
        }
      })
    } else {
      this.tps.error("Fill required fields")
      return false;
    }
    return true;
  }

  birthDateChanged() {
    if (this.modal.birthDate) {
      this.modal['age'] = this.tps.calculateAge(new Date(this.modal.birthDate))
    } else {
      this.modal['age'] = ''
    }
  }
  back() {
    this.tps.navigateTo('../settings/services')
  }
  openAddQuickPatient() {
    this.patientPageSetup = JSON.parse(JSON.stringify(this.tps.fullPatientComponentView));
    this.patientPageSetup['showNavs'] = false;
    this.patientPageSetup['showButtons'] = false;
    this.makeSubmit = null;
    this.tps.ShowModel(this.addQuickPatientModal, { class: 'modal-xl', backdrop: 'static' })
  }

  makeSubmit: any
  makeSubmitEvent_AddQuickPatient() {
    this.makeSubmit = new Date();
  }
  SubmitOutputEvent_AddQuickPatient(id: any) {
    if (id) {
      this.closeAddQuickPatient()
      this.searchPatients()
    }
  }
  closeAddQuickPatient() {
    this.tps.modalRef?.hide()
  }
  patientPageSetup: any = {}
  lstPatients: any = {}
  selectedPatient: any = {}
  selecPatient(r: any) {
    if (this.selectedPatient != r) {
      this.selectedPatient = r;
      this.VisitPatientDetails()
    }
  }
  searchPatients() {
    this.hisLogicService.VisitPatientsList(1, 30, this.patientSearchFilter.value).subscribe(z => {
      this.lstPatients = z.lstData;
    })
  }

  VisitPatientDetails() {
    this.hisLogicService.VisitPatientDetails(this.selectedPatient.id).subscribe(z => {
      this.selectedPatient['details'] = z;
      this.selectedPatient['details']['age'] = this.tps.calculateAge(new Date(this.selectedPatient['details'].birthDate))
    })
  }
}
