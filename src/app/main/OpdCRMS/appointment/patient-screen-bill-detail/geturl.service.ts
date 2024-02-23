import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeturlService {
  constructor(
    private handler: HttpBackend, private _httpClient: HttpClient
  ) { }

  getVisitData(emp) {
    this._httpClient = new HttpClient(this.handler);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    let httpOptions = {
      headers: headers,
    };
    // { "mrno": 111023 },
    return this._httpClient
      .post<any>("http://192.168.6.2:8052/api/Generic/GetByProc?procName=crms_visitdetails", emp, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
        } else {

          return throwError(error);
        }
      }));
  }
  
  getBillData(emp) {
    this._httpClient = new HttpClient(this.handler);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    let httpOptions = {
      headers: headers,
    };
    // { "visitid":2652762 }
    return this._httpClient
      .post<any>("http://192.168.6.2:8052/api/Generic/GetByProc?procName=crms_bill", emp, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
        } else {

          return throwError(error);
        }
      }));
  }
  getBillDetData(emp) {
    this._httpClient = new HttpClient(this.handler);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    let httpOptions = {
      headers: headers,
    };
    // { "billid": 2623564 }
    return this._httpClient
      .post<any>("http://192.168.6.2:8052/api/Generic/GetByProc?procName=crms_billdetails", emp, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
        } else {

          return throwError(error);
        }
      }));
  }
}
