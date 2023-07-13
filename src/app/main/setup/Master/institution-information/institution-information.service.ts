import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInformationService {
  personalFormGroup: FormGroup;
  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.personalFormGroup = this.createPesonalForm();
  }



    
  createPesonalForm() {
    return this._formBuilder.group({
      InstitutionId: '',
      InstitutionName: '',
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
  public getInstitutionInformationList(Params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InstitutionInformationList", Params);
  }

  public InsertInstitutionInformation(Params) {
    return this._httpClient.post("Master/Save_InsertInstitutionInformation", Params);
  }

  public UpdateInstitutionInformation(Params) {
    return this._httpClient.post("Master/Update_UpdateInstitutionInformation", Params);
  }

  populateForm(param) {
    this.personalFormGroup.patchValue(param);
}
}
