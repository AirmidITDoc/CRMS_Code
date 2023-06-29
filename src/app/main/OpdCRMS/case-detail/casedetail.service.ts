import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CasedetailService {
  
  myFilterform: FormGroup;
  mySaveForm: FormGroup;
  now = Date.now();
  sIsLoading: string = '';
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    // this.mySaveForm = this.saveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      RegNo:'',
      CaseId:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      CaseName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      // DoctorId:'',
      // DoctorName:'',
      // IsMark: 2,
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }

  public CaseDetailInsert(employee){
    return this._httpClient.post("OutPatient/CaseDetailSave", employee);
  }

  public CaseDetailUpdate(employee){
    return this._httpClient.post("OutPatient/CaseDetailUpdate", employee);
  }
  public getCaseIDCombo(D_data){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CasedetailId", D_data);
  }

  public getCaseDetailPrint(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CasedetailId",employee);
  }

  populateFormpersonal(employee) {
    // this.personalFormGroup.patchValue(employee);
  }

}
