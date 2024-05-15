import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {

  lang = "labelEn"
  modal: any = {}
  Id;
  constructor(private lookupsService: LookupsService, private hisLogicService: HISLogicService, private tps: ThirdPartytoastyService, private route: ActivatedRoute) {
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
    this.tps.navigateTo('../settings/services')
  }
}
