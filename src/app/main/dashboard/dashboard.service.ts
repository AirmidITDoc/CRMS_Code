import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(public _httpClient:HttpClient,
    private _formBuilder: FormBuilder) { }

  public getDailyDashboardSummary() {
    return this._httpClient.post("Generic/GetByProc?procName=rptDailyDashboardSummary", {})
  }

  public getDash_StudyInvoiceInformation(params) {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_Dash_StudyInvoiceInformation", params)
  }

  public getDash_StudySubjectCount(params) {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_Dash_StudySubjectCount", params)
  }
  
  public getDash_PatientVisitInfo(params) {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_Dash_PatientVisitInfo", params)
  }

  public getCaseIDCombo(D_data) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CaseWisePatientSummary", D_data);
  }
}
