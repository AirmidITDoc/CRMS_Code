import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditPaymentService {

  myFilterform: FormGroup ;

  constructor(
    public _httpClient:HttpClient,
    private _formBuilder: FormBuilder
  ) { 
    this.myFilterform=this.filterForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      StudyId:'',
      
      FirstName: ['', [
         Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
     ]],
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      PBillNo: '', 
      RegNo: '',
    });
  }

  public getBrowseBillsList(param) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_BrowseOPBillList", param) 
  }  

  public getBillDet(param) {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_BillDetails", param) 
  }  

  public getBillPrint(BillNo) {
    return this._httpClient.post("Generic/GetByProc?procName=rptBillPrint", BillNo)
  } 

  public getTemplate(query) {
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  } 
  public getCaseIDCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationCombo", {});
  }

  
  public PatientServicePaymentupdate(employee){
    return this._httpClient.post("OutPatient/PatientservicePaymentUpdate", employee);
  }
  
}
