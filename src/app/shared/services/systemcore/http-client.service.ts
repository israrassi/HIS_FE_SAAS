import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LocalHttpClient {
  baseUrl = ''
  baseUrlWithoutApi = 'https://3azmak.com'; //Remote
  // baseUrlWithoutApi = 'http://localhost:5042';

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = this.baseUrlWithoutApi + '/api/';
    // this.testToken().subscribe(z => {
    //   console.log("TOKEN TESTED ");
    // })
  }
  testToken() {
    this.authenticatedHttp();
    return this.http.get(this.baseUrl + 'Account/testToken', this.httpOptions).pipe(
      catchError(x => this.handleAuthError(x, this.router))
    );
  }

  handleAuthError(err: any, router: any): any {
    // //handle your auth error or rethrow
    // if (err.status === 401) {
    //   router.navigate(["../pages/authentication/login-v2"]);
    // }
    // setTimeout(() => {
    //   this._coreLoadingScreenService.hide();
    // }, 100);
    // return throwError(err);
  }

  get(url: any, useCache = false) {
    this.authenticatedHttp();
    // if (useCache) {
    //   let apiUrl = this.baseUrl + url;
    //   return this.cachingApiService.observable(apiUrl, this.http.get(apiUrl, this.httpOptions).map(res => res))
    // }
    // else {
    return this.http.get(this.baseUrl + url, this.httpOptions).pipe(
      tap(_ => console.log('Get Respponse', this.baseUrl + url)),
    );
    // }
  }
  getWithObj(url: any, data: any) {
    this.authenticatedHttp();
    let strQueryString = "";
    let keys = Object.keys(data);
    keys.forEach((key, i) => {
      strQueryString += `${key}=${data[key]}`;
      if (i != (keys.length - 1)) {
        strQueryString += "&"
      }
    })
    // console.log("Get Request", this.baseUrl + url + "?" + strQueryString);
    // 
    return this.http.get(this.baseUrl + url + "?" + strQueryString, this.httpOptions).pipe(
      tap(_ => console.log('Get Respponse', this.baseUrl + url + "?" + strQueryString)),
    );
  }

  post(url: any, data: any) {
    this.authenticatedHttp();
    console.log("Post Request", this.baseUrl + url, JSON.stringify(data));
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }
  purePost(url: any, data: any) {
    console.log("Post Request", url, JSON.stringify(data));
    return this.http.post(url, data, this.httpOptions);
  }
  delete(url: any, data: any) {
    this.authenticatedHttp();
    let strQueryString = "";
    let keys = Object.keys(data);
    keys.forEach((key, i) => {
      strQueryString += `${key}=${data[key]}`;
      if (i != (keys.length - 1)) {
        strQueryString += "&"
      }
    })

    console.log("Post Request", this.baseUrl + url + "?" + strQueryString, JSON.stringify(data));
    return this.http.delete(this.baseUrl + url + "?" + strQueryString, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      "Access-Control-Allow-Origin": '*'
    })
  };
  authenticatedHttp() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("lebwoiubpaneltoken"),
      })
    };
    this.httpOptions.headers = this.httpOptions.headers.append('langId', "1");
    // this.httpOptions.headers = this.httpOptions.headers.append('langId', sessionStorage.getItem("langId") ? "0" : sessionStorage.getItem("langId"));
  }

}