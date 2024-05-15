import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-visit-auto-service',
  templateUrl: './visit-auto-service.component.html',
  styleUrls: ['./visit-auto-service.component.scss']
})
export class VisitAutoServiceComponent {
  lstInventoryLookupsByKey: any = {}
  searchStrFilter = new FormControl('')
  activeStatusFilter = new FormControl('')
  constructor(private tps: ThirdPartytoastyService, private hisLogicService: HISLogicService, private lookupsService: LookupsService) {
    setTimeout(() => {
      this.search()
    }, 10);
    this.loadLookups()
    this.searchStrFilter.valueChanges.subscribe(z => this.search())
    this.activeStatusFilter.valueChanges.subscribe(z => this.search())
  }

  lstKeysRequiredOnInventoryLookups = ['VisitTypes', 'visitSubType', 'Departments', 'Services'];
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;
      })
    })
    this.lstInventoryLookupsByKey['ActiveStatus'] = this.tps.lstActiveStatusLkps;
    this.searchDoctors()
  }
  lstDoctors: any = []
  searchDoctors() {
    this.lookupsService.LookupsWithObj({ categoryCode: 'UserBasedType', userTypeId: 2 }).subscribe(z => {
      this.lstInventoryLookupsByKey['lstDoctors'] = z;
    })
  }
  lstData: any = []
  search() {
    this.hisLogicService.VisitServicesList().subscribe(z => {
      this.lstData = z.lstData;
    })
  }

  addNew() {
    this.lstData.push({})
  }


  save() {
    this.tps.info("Please wait!", "")
    this.hisLogicService.AddVisitService({ lstVisitServices: this.lstData }).subscribe(z => {
      this.tps.success("Save", "Saved Successfully!")

    })
  }
}
