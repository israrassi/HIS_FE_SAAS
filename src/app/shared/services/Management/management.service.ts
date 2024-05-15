import { Injectable } from '@angular/core';
import { LocalHttpClient } from '../systemcore/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  mainRoute = "Management";
  constructor(private http: LocalHttpClient) { }

  AddDepartment(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddDepartment`, obj);
  }
  DepartmentDetails(id: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/DepartmentDetails?id=${id}`);
  }
  DepartmentsList(page: any, pageSize: any, strSearch: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/DepartmentsList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}`);
  }
}
