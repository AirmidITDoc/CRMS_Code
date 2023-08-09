import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MemberMasterService {

  
  personalFormGroup: FormGroup;
  myFilterform: FormGroup;
  
  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.personalFormGroup = this.createPesonalForm();
    this.myFilterform = this.filterForm();
   }



   filterForm(): FormGroup {
    return this._formBuilder.group({
      MemberId:'',
      FirstName:'',
      LastName:''
      // start: [(new Date()).toISOString()],
      // end: [(new Date()).toISOString()],

    });
  }


  createPesonalForm() {
    return this._formBuilder.group({
      MemberId: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Member_Address: '',
      CityId: '',
      PinCode: ' ',
      MobileNo: '',
      EmailId: '',
      StudyAmount: ''

    });
  }


  public getMemberList(Params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_M_MemberMasterList", Params);
  }

  public InsertMemberMaster(Params) {
    return this._httpClient.post("Master/Save_InsertMemberMaster", Params);
  }

  public UpdateMemberMaster(Params) {
    return this._httpClient.post("Master/Update_UpdateMemberMaster", Params);
  }
  
  //  city list
  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }
  public MemberDetailInsert(employee){
    return this._httpClient.post("Master/Save_InsertMemberMaster", employee);
  }

  public MemberDetailUpdate(employee){
    return this._httpClient.post("Master/Update_UpdateMemberMaster", employee);
  }

  populateForm(param) {
    this.personalFormGroup.patchValue(param);
}

public getdeletemember(data){
  return this._httpClient.post("Generic/GetBySelectQuery?query="+data, {})
}
}
