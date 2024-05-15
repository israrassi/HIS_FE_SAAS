import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  lstInventoryLookupsByKey: any = {}
  searchStrFilter = new FormControl('')
  activeStatusFilter = new FormControl('')
  userTypeFilter = new FormControl('')
  constructor(private thirdPartytoastyService: ThirdPartytoastyService, private accountService: AccountService) {
    setTimeout(() => {
      this.search()
    }, 10);
    this.loadLookups()
    this.searchStrFilter.valueChanges.subscribe(z => this.search())
    this.activeStatusFilter.valueChanges.subscribe(z => this.search())
    this.userTypeFilter.valueChanges.subscribe(z => this.search())
  }

  loadLookups() {
    this.lstInventoryLookupsByKey['ActiveStatus'] = this.thirdPartytoastyService.lstActiveStatusLkps;
    this.lstInventoryLookupsByKey['UsersTypes'] = [{ 'value': '', 'label': 'All' },...this.thirdPartytoastyService.lstUsersTypesLkps];
  }

  lstData: any = []
  search() {
    this.accountService.UserList(this.paggingManager.currentPage, 10, this.searchStrFilter.value, this.activeStatusFilter.value, this.userTypeFilter.value, true).subscribe(z => {
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
    this.thirdPartytoastyService.navigateTo('../settings/users/cu/' + id)
  }
}
