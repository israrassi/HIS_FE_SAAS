import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {
  lstInventoryLookupsByKey: any = {}
  searchStrFilter = new FormControl('')
  activeStatusFilter = new FormControl('')
  constructor(private thirdPartytoastyService: ThirdPartytoastyService, private hisLogicService: HISLogicService) {
    setTimeout(() => {
      this.search()
    }, 10);
    this.loadLookups()
    this.searchStrFilter.valueChanges.subscribe(z => this.search())
    this.activeStatusFilter.valueChanges.subscribe(z => this.search())
  }

  loadLookups() {
    this.lstInventoryLookupsByKey['ActiveStatus'] = this.thirdPartytoastyService.lstActiveStatusLkps;
  }

  lstData: any = []
  search() {
    this.hisLogicService.ServicesList(this.paggingManager.currentPage, 10, this.searchStrFilter.value, this.activeStatusFilter.value).subscribe(z => {
      this.lstData = z.lstData;
      this.paggingManager.totalItems = z.rowsCount
    })
  }

  public paggingManager = {
    id: 'x',
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 10
  }
  pageChanged($e: any) {
    this.paggingManager.currentPage = $e;
    this.search();
  }
  addEditObj(id: any = '') {
    this.thirdPartytoastyService.navigateTo('../settings/services/cu/' + id)
  }
}
