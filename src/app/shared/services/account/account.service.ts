import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalHttpClient } from '../systemcore/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  mainRoute = "Account";
  constructor(private http: LocalHttpClient) { }

  Login(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/Login`, obj);
  }

  AddUser(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddUser`, obj);
  }
  UserDetails(id: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/UserDetails?id=${id}`);
  }

  UserList(page: any, pageSize: any, strSearch: any, isActive: any, UserType: any, LoadSystemUsersOnly: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/UserList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&isActive=${isActive ?? ''}&UserType=${UserType}&LoadSystemUsersOnly=${LoadSystemUsersOnly}`);
  }

  // ClientSupplierList(page, pageSize, strSearch, activeStatus, CountryID, IncotermsID, GovernorateID, SortID, QueryType): Observable<any> {
  //   return this.http.get(`${this.mainRoute}/ClientSupplierList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&isActive=${activeStatus ? true : false}&CountryID=${CountryID ? CountryID : ''}&IncotermsID=${IncotermsID ? IncotermsID : ''}&GovernorateID=${GovernorateID ? GovernorateID : ''}&SortID=${SortID ? SortID : ''}&QueryType=${QueryType}`);
  // }
  // ClientSupplierDetails(accId): Observable<any> {
  //   return this.http.get(`${this.mainRoute}/ClientSupplierDetails?accId=${accId}`);
  // }
  // AddClientSupplierCommand(obj): Observable<any> {
  //   return this.http.post(`${this.mainRoute}/AddClientSupplierCommand`, obj);
  // }


}
