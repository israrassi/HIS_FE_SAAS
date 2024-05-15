import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrls: ['./add-patients.component.scss']
})
export class AddPatientsComponent {

  @Input() pageSetup: any = this.tps.fullPatientComponentView
  @Input() set makeSubmit(z: any) {
    if (z)
      this.save()
  }
  @Output() saveSubmitted = new EventEmitter<any>();

  lang = "labelEn"
  modal: any = {}
  Id: any;

  constructor(private lookupsService: LookupsService, private accountService: AccountService, private tps: ThirdPartytoastyService, private route: ActivatedRoute) {
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
      this.modal = { isActive: 'true', UserType: 3 }
    }
  }
  UserDetails(Id: any) {
    this.accountService.UserDetails(Id).subscribe(z => {
      this.modal = this.parseObjFromServer(z);
      this.birthDateChanged()

    })
  }
  lstKeysRequiredOnInventoryLookups = ['Gender', 'Countries', 'Cities', 'States'];
  lstInventoryLookupsByKey: any = {}
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;
      })
    })
  }
  parseObjFromServer(z: any) {
    z['createDate'] = this.tps.dateFormat(z['createDate'])
    z['birthDate'] = this.tps.dateFormat(z['birthDate'])
    z['isActive'] = z['isActive'] == true ? 'true' : 'false'
    return z;
  }
  prepareObjToServer(modal: any) {
    modal.isActive = modal.isActive == 'true';
    return modal;
  }
  reqFields: any = ['nameEn1', 'nameAr1', 'nameEn4', 'nameAr4', 'phone1']
  save() {
    let validRes = this.tps.checkValidation(this.modal, this.reqFields);
    if (validRes.isValid) {
      let modal = this.prepareObjToServer(this.modal);
      this.tps.info("Please wait!", "")
      this.accountService.AddUser(modal).subscribe({
        next: z => {
          if (z.status) {
            this.tps.success("Save", "Saved Successfully!")
            this.Id = z['entityId']
            this.UserDetails(this.Id);
            this.saveSubmitted.emit(this.Id)
          }
          if (z['lstError'].length > 0) {
            this.tps.error(z['lstError'][0])
            this.saveSubmitted.emit(false)
          }
        }, error: e => {
          this.tps.error("Fill required fields")
          this.saveSubmitted.emit(false)
        }
      })
    } else {
      this.tps.error("Fill required fields")
      this.saveSubmitted.emit(false)
    }
  }

  birthDateChanged() {
    if (this.modal.birthDate) {
      this.modal['age'] = this.tps.calculateAge(new Date(this.modal.birthDate))
    } else {
      this.modal['age'] = ''
    }
  }
  back() {
    this.tps.navigateTo('../settings/patients')
  }
}
