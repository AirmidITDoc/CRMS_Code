import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommitteMeetingService {
  personalFormGroup: FormGroup;
  myFilterform: FormGroup;
  mySaveForm: FormGroup;
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
      CommitteeMeetingId:'',
     
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }


  createPesonalForm() {
    return this._formBuilder.group({
      CommitteeId: '',
      MemberId: '',
      MemberName: '',
      CommitteeMeetingName: '',
      CommitteeName: '',
      Location: '',
      Amount: '',
      CommitteeMeetingId:''
    });
  }

  public MemberDetailInsert(employee){
    return this._httpClient.post("Master/Save_InsertMemberMaster", employee);
  }

  public MemberDetailUpdate(employee){
    return this._httpClient.post("Master/Update_UpdateMemberMaster", employee);
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
  
  //  city list
  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }

  public getCommitteeMeetingList(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CommitteeListCombo", {})
  }
  
  
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
