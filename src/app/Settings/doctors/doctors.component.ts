import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {

  lstInventoryLookupsByKey: any = {}
  searchStrFilter = new FormControl('')
  activeStatusFilter = new FormControl('')
  constructor(private thirdPartytoastyService: ThirdPartytoastyService, private accountService: AccountService) {
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
    this.accountService.UserList(this.paggingManager.currentPage, 10, this.searchStrFilter.value, this.activeStatusFilter.value, 2, false).subscribe(z => {
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
    this.thirdPartytoastyService.navigateTo('../settings/doctors/cu/' + id)
  }
}
