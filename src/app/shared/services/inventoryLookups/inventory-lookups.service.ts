import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalHttpClient } from '../systemcore/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryLookupsService {
  mainRoute = "Inventory";

  constructor(private http: LocalHttpClient) { }

  AddCategory(obj): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddCategory`, obj);
  }
  AddLookup(obj): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddLookup`, obj);
  }
  CategoryLookupsList(page, pageSize, strSearch, activeStatus, categoryId): Observable<any> {
    return this.http.get(`${this.mainRoute}/GetCategoryLookupsList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&activeStatus=${activeStatus}&categoryId=${categoryId}`);
  }
  CategoryList(page, pageSize, strSearch, activeStatus): Observable<any> {
    return this.http.get(`${this.mainRoute}/GetCategoryList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&activeStatus=${activeStatus}`);
  }


  
  deleteInventoryLookups(data): Observable<any> {
    return this.http.delete("Inventory/deleteInventoryLookups", data);
  }
  inventoryLookupPageInit(page, pageSize, strSearch): Observable<any> {
    return this.http.get(`Inventory/inventoryLookupPageInit?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}`);
  }
  getMainPartLookups(LKP_Type): Observable<any> {
    return this.http.get(`Inventory/getMainPartLookups?LKP_Type=${LKP_Type}`);
  }
  updateLookups(data): Observable<any> {
    return this.http.post("Inventory/updateLookups", data);
  }
  addEditMainLookup(data): Observable<any> {
    return this.http.post("Inventory/addEditMainLookup", data);
  }


  
  GetItemsRecivedSalesAvgSale(data): Observable<any> {
    return this.http.post("Inventory/GetItemsRecivedSalesAvgSale", data);
  }
}
