import { Injectable } from '@angular/core';
import { LocalHttpClient } from '../systemcore/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HISLogicService {
  mainRoute = "HISLogic";
  constructor(private http: LocalHttpClient) { }

  AddAppointmentSetup(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddAppointmentSetup`, obj);
  }
  AppointmentSetupDetails(obj: any): Observable<any> {
    //Cache
    return this.http.getWithObj(`${this.mainRoute}/AppointmentSetupDetails`, obj);
  }

  AddAppointment(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddAppointment`, obj);
  }
  AppointmentDetails(Id: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/AppointmentDetails?Id=${Id}`);
  }
  AppointmentPatientDetails(PatientId: any): Observable<any> {
    //Cache
    return this.http.get(`${this.mainRoute}/AppointmentPatientDetails?PatientId=${PatientId}`);
  }
  AppointmentsList(page: any, pageSize: any, strSearch: any, StartDate: any, EndDate: any, BranchId: any, DepartmentId: any, DoctorId: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/AppointmentsList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&StartDate=${StartDate}&EndDate=${EndDate}&BranchId=${BranchId}&DepartmentId=${DepartmentId}&DoctorId=${DoctorId}`);
  }
  DoctorAvailableAppointments(BranchId: any, DepartmentId: any, DoctorId: any, CurrentDate: any): Observable<any> {
    //Can't cached
    return this.http.get(`${this.mainRoute}/DoctorAvailableAppointmentsQuery?BranchId=${BranchId}&DoctorId=${DoctorId}&DepartmentId=${DepartmentId}&CurrentDate=${CurrentDate}`);
  }


  AddService(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddService`, obj);
  }
  ServiceDetails(Id: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/ServiceDetails?Id=${Id}`);
  }
  ServicesList(page: any, pageSize: any, strSearch: any, isActive: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/ServicesList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}&isActive=${isActive ?? ''}`);
  }
  VisitServicesList(page: any = 1, pageSize: any = 1000): Observable<any> { //without pagination
    return this.http.get(`${this.mainRoute}/VisitServicesList?page=${page}&pageSize=${pageSize}`);
  }
  AddVisitService(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddVisitService`, obj);
  }
  VisitPatientsList(page: any, pageSize: any, strSearch: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/VisitPatientsList?page=${page}&pageSize=${pageSize}&strSearch=${strSearch}`);
  }
  VisitPatientDetails(PatientId: any): Observable<any> {
    return this.http.get(`${this.mainRoute}/VisitPatientDetails?PatientId=${PatientId}`);
  }

  // AppointmentSetupDetails(obj: any): Observable<any> {
  //   return this.http.getWithObj(`${this.mainRoute}/AppointmentSetupDetails`, obj);
  // }
}
