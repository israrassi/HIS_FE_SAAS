import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ManagementService } from 'src/app/shared/services/Management/management.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

  lstInventoryLookupsByKey: any = {}
  searchStrFilter = new FormControl('')
  activeStatusFilter = new FormControl('')
  constructor(private thirdPartytoastyService: ThirdPartytoastyService, private managementService: ManagementService) {
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
    this.managementService.DepartmentsList(this.paggingManager.currentPage, 10, this.searchStrFilter.value).subscribe(z => {
      z.lstData.forEach((e: any) => {
        e['_lstDepartmentBranches'] = e.lstDepartmentBranches.map((z: any) => z.branchNameEn).join(",")
      });
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
    this.thirdPartytoastyService.navigateTo('../settings/departments/cu/' + id)
  }
}
