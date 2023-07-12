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

  public StudyInfoInsert(employee){
    return this._httpClient.post("CRMSTran/Save_StudyInformation", employee);
  }

  public StudyInfoUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_StudyInformation", employee);
  }


  public getCaseDetailPrint(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CasedetailId",employee);
  }

  populateFormpersonal(employee) {
    // this.personalFormGroup.patchValue(employee);
  }

  public getDocumentList(D_data){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Constants", D_data);
  }

  public getVisitFrequencyCList(D_data){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Constants", D_data);
  }
   //company Combobox List
   public getCompanyCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CompanyDetailsForCombo", {})
  }

  public getStudyInformationList(Params){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationList",Params);
  }

  public StudySchduleInsert(employee){
    return this._httpClient.post("CRMSTran/Save_InsertStudySchedule", employee)
  }

  public StudySchduleUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudySchedule", employee)
  }

  public DocumentInsert(employee){
    return this._httpClient.post("CRMSTran/Save_StudyUploadDocument", employee)
  }

  public DocumentUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_StudyUploadDocument", employee)
  }
}
