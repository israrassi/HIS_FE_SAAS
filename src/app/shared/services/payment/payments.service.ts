import { Injectable } from '@angular/core';
import { LocalHttpClient } from '../systemcore/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  mainRoute = "Payment";
  constructor(private http: LocalHttpClient) { }


  
  GenerateCaptureContext(): Observable<any> {
    return this.http.post(`${this.mainRoute}/GenerateCaptureContext`, {});
  }
  CreatePayment(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/CreatePayment`, obj);
  }


  PostToAnyUrl(url: any): Observable<any> {
    return this.http.purePost(url, {});
  }

  CapturePayment(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/CapturePayment`, obj);
  }
  // SetupCompletionWithCardNumber(obj: any): Observable<any> {
  //   return this.http.post(`${this.mainRoute}/SetupCompletionWithCardNumber`, obj);
  // }
  // EnrollWithPendingAuthentication(obj: any): Observable<any> {
  //   return this.http.post(`${this.mainRoute}/EnrollWithPendingAuthentication`, obj);
  // }
  ValidateAuthenticationResults(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/ValidateAuthenticationResults`, obj);
  }

  //Trnsmit Token Only
  SetupCompletionWithFlexTransientToken(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/SetupCompletionWithFlexTransientToken`, obj);
  }
  //Trnsmit Token & Amount Only
  EnrollWithTransientToken(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/EnrollWithTransientToken`, obj);
  }
  AddPaymentTransaction(obj: any): Observable<any> {
    return this.http.post(`${this.mainRoute}/AddPaymentTransaction`, obj);
  }
}
