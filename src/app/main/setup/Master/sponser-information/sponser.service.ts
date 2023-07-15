import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SponserService {
  personalFormGroup: FormGroup;
  myFilterform: FormGroup;


  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) { this.personalFormGroup = this.createPesonalForm(); 
    this.myFilterform = this.filterForm();}


  createPesonalForm() {
    return this._formBuilder.group({
      SponserId: '',
      SponserName: '',
      Address: '',
      ContactNo: '',
      PinCode: '',
      State: '',
      StateCode: ' ',
      GSTIN: '',
      SAC:'',
      PAN:'',
      PlaceOfSupply:'',
      EmailId: '',
      CreatedBy:0,
      UpdatedBy:0
    });
  }


  

  filterForm(): FormGroup {
    return this._formBuilder.group({
      SponserId:'',
      SponserName:'',
      ContactNo:''
      // start: [(new Date()).toISOString()],
      // end: [(new Date()).toISOString()],

    });
  }

  public getSponserInformationList(Params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_SponserInformationList", Params);
  }

  public InsertSponserInformation(Params) {
    return this._httpClient.post("Master/Save_InsertSponserInformation", Params);
  }

  public UpdateSponserInformation(Params) {
    return this._httpClient.post("Master/Update_UpdateSponserInformation", Params);
  }


  populateForm(param) {
    this.personalFormGroup.patchValue(param);
}
}

