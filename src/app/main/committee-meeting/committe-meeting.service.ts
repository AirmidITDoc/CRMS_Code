import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommitteMeetingService {

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

  public MemberDetailInsert(employee){
    return this._httpClient.post("OutPatient/CaseDetailSave", employee);
  }

  public MemberDetailUpdate(employee){
    return this._httpClient.post("OutPatient/CaseDetailUpdate", employee);
  }
public getCommitteeList(){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_T_CommitteeMeeting_List", {})
}

public CommitteeDetailInsert(employee){
  return this._httpClient.post("OutPatient/CaseDetailSave", employee);
}

public CommitteeMemberDetailInsert(employee){
  return this._httpClient.post("OutPatient/CaseDetailSave", employee);
}

public getMemberMasterList(){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_M_MemberMaster_by_Name", {})
}
  populateFormpersonal(employee) {
    // this.personalFormGroup.patchValue(employee);
  }
  
  //  city list
  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }

  
  public getDepartmentCombobox() {
    return this._httpClient.post(
        "Generic/GetByProc?procName=RetrieveDepartmentMasterForCombo",
        {}
    );
}

}
