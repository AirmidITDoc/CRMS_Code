import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClinicalDocumentService {

  constructor(  private handler: HttpBackend,private _httpClient: HttpClient,
    private _formBuilder: FormBuilder) { }

    public getDropDownList(Param){
      return this._httpClient.post("Generic/GetByProc?procName=m_RtrvDropDownMaster",Param)
    }
    public getSearchPatientInformList(Param){
      return this._httpClient.post("Generic/GetByProc?procName=m_RtrvPatientInformation ",Param)
    }
    public SavePatientPastHistory(employee) {
      return this._httpClient.post("Cardiology/SavePatientPastHistory", employee);
    }
    public SavePatient2DEchoDet(employee) {
      return this._httpClient.post("Cardiology/SavePatient2DEchoDetails", employee);
    }
    public SaveCardiacRiskFactor(employee) {
      return this._httpClient.post("Cardiology/SaveCardiacRiskFactor", employee);
    }
    public SaveProcedureDetails(employee) {
      return this._httpClient.post("Cardiology/SaveProcedureDetails", employee);
    }
    public SaveLesionDetails(employee) {
      return this._httpClient.post("Cardiology/SaveLesionDetails", employee);
    }
    public SaveAcuteCorSyndrome(employee) {
      return this._httpClient.post("Cardiology/SaveAcsPatientDetails", employee);
    }
    public SaveStableCoronary(employee) {
      return this._httpClient.post("Cardiology/SaveScsPatientDetails", employee);
    }
    public SaveIdcadPatient(employee) {
      return this._httpClient.post("Cardiology/SaveIdcadPatientDetails", employee);
    }
    
}
