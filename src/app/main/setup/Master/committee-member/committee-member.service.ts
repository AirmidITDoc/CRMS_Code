import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommitteeMemberService {


  personalFormGroup: FormGroup;
  myFilterform: FormGroup;
  // mySaveForm: FormGroup;
  now = Date.now();
  sIsLoading: string = '';
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.personalFormGroup = this.createPesonalForm();
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

  
  createPesonalForm() {
    return this._formBuilder.group({
      CommitteeId:'',
      CommitteeName: '',
      MemberId: '',
      Amount:''
    });
  }
 
  

public getCommitteeList(){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_T_CommitteeMeeting_List", {})
}

public CommitteeDetailInsert(employee){
  return this._httpClient.post("CRMSTran/Save_InsertCommitteeMaster", employee);
}

public CommitteeMemberDetailInsert(employee){
  return this._httpClient.post("Master/Save_InsertCommitteeMaster", employee);
}

public getMemberMasterList(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_M_MemberMaster_by_Name", employee)
}
  populateFormpersonal(employee) {
    // this.personalFormGroup.patchValue(employee);
  }
  
  //  CommitteeMemberList list
  public getCommitteeMemberDetailList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_M_CommitteeMasterList ", employee)
  }

  // public getCommitteeMeetingList(){
  //   return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CommitteeListCombo", {})
  // }
  
  
  public getCommitteeMemberList(Params){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CommitteeMemberList", Params)
  }
  
  public getDepartmentCombobox() {
    return this._httpClient.post(
        "Generic/GetByProc?procName=RetrieveDepartmentMasterForCombo",
        {}
    );
}
populateForm(param) {
  this.personalFormGroup.patchValue(param);
}
}
