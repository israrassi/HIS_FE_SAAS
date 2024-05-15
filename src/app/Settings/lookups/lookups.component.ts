import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';

@Component({
  selector: 'app-lookups',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.scss']
})
export class LookupsComponent {
  addCategoryForm: any
  searchCategoryStr = new FormControl('')
  get addCategoryFormControls() {
    return this.addCategoryForm.controls
  }
  addLookupForm: any
  // searchLookupStr = new FormControl('')
  get addLookupFormControls() {
    return this.addLookupForm.controls
  }

  isModalShown = false;
  @ViewChild('addCategoryModal') addCategoryModal?: TemplateRef<HTMLDivElement>;
  @ViewChild('addLookupModal') addLookupModal?: TemplateRef<HTMLDivElement>;
  constructor(private thirdPartytoastyService: ThirdPartytoastyService, private lookupsService: LookupsService) {
    setTimeout(() => {
      this.searchCategories()
    }, 10);
    this.searchCategoryStr.valueChanges.subscribe(z => {
      this.searchCategories()
    })
  }

  /* Start Add Category  */
  public paggingManager = {
    id: 'x',
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 10
  }
  pageChanged($e: any) {
    this.paggingManager.currentPage = $e;
    this.searchCategories();
  }

  selectedCategory: any
  selectCategory(r: any) {
    if (!this.selectedCategory || this.selectedCategory.id != r.id) {
      this.searchLookups(r.id)
    }
    this.selectedCategory = r
  }
  openAddCategory(obj: any = null) {
    this.initialAddCategoryForm(obj);
    this.thirdPartytoastyService.ShowModel(this.addCategoryModal)
  }
  initialAddCategoryForm(obj: any) {
    if (!obj) obj = {}
    this.addCategoryForm = new FormGroup({
      id: new FormControl(obj['id'] ?? ''),
      code: new FormControl(obj['code'] ?? '', Validators.required),
      nameEn: new FormControl(obj['nameEn'] ?? '', Validators.required),
      nameAr: new FormControl(obj['nameAr'] ?? '', Validators.required)
    });
  }
  closeAddCategory(save: boolean = false) {
    if (save) {
      this.lookupsService.AddCategory({ ...this.addCategoryForm.value, isActive: true }).subscribe(z => {
        if (z.status) {
          this.searchCategories()
          this.thirdPartytoastyService.success();
          this.thirdPartytoastyService.modalRef?.hide()
        }
      })
    } else {
      this.thirdPartytoastyService.modalRef?.hide()
    }
  }

  lstCategories: any = []
  searchCategories() {
    this.lookupsService.CategoryList(this.paggingManager.currentPage, 10, this.searchCategoryStr.value).subscribe(z => {
      this.lstCategories = z.lstData;
      this.paggingManager.totalItems = z.rowsCount
    })
  }
  /* End Add Category  */

  /* Start Add Lookup  */
  openAddLookup(obj: any = null) {
    if (!obj) obj = { 'categoryId': this.selectedCategory.id }
    this.initialAddLookupForm(obj);
    this.thirdPartytoastyService.ShowModel(this.addLookupModal)
  }
  initialAddLookupForm(obj: any) {
    if (!obj) obj = {}

    if (obj.categoryId) {
      obj.baseCategoryName = this.selectedCategory.code
    }
    this.addLookupForm = new FormGroup({
      id: new FormControl(obj['id'] ?? ''),
      categoryId: new FormControl(obj['categoryId'] ?? '', Validators.required),
      baseCategoryName: new FormControl({ value: obj['baseCategoryName'] ?? '', disabled: true }),
      nameEn: new FormControl(obj['nameEn'] ?? '', Validators.required),
      nameAr: new FormControl(obj['nameAr'] ?? '', Validators.required)
    });
  }
  closeAddLookup(save: boolean = false) {
    if (save) {
      this.lookupsService.AddLookup({ ...this.addLookupForm.value, isActive: true }).subscribe(z => {
        if (z.status) {
          this.searchLookups(this.selectedCategory.id)
          this.thirdPartytoastyService.success();
          this.thirdPartytoastyService.modalRef?.hide()
        }
      })
    } else {
      this.thirdPartytoastyService.modalRef?.hide()
    }
  }

  lstLookups: any = []
  searchLookups(baseCategoryId: any) {
    this.lookupsService.LookupList(baseCategoryId).subscribe(z => {
      this.lstLookups = z.lstData;
    })
  }
  /* End Add Lookup  */

  doctorsList: any = []

  sortData($e: any) { }
}
