import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalHttpClient } from '../systemcore/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  mainRoute = "AutoComplete";
  constructor(private http: LocalHttpClient) { }
  Lookups(categoryCode: any, Id1 = '', Id2 = '', Id3 = '', IsDefaultSelected = '', Flag01 = ''): Observable<any> {
    return this.http.get(`${this.mainRoute}/Lookups?categoryCode=${categoryCode}&Id1=${Id1}&Id2=${Id2}&Id3=${Id3}&IsDefaultSelected=${IsDefaultSelected}&Flag01=${Flag01}`);
  }


  LookupsWithObj(obj: any): Observable<any> {
    return this.http.getWithObj(`${this.mainRoute}/Lookups`, obj);
  }

  AddCategory(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddSystemLookupCategory`, obj);
  }
  AddLookup(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddSystemLookup`, obj);
  }
  CategoryList(page: any, pageSize: any, strSearch: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/SystemLookupCategoryList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}`);
  }
  LookupList(CategoryId: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/SystemLookupsDetailsList?CategoryId=${CategoryId}`);
  }
}
