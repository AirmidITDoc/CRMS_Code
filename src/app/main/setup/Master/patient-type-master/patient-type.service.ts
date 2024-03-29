import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientTypeService {
  myForm: FormGroup;
  myformSearch: FormGroup;
  constructor(
      private _httpClient: HttpClient,
      private _formBuilder: FormBuilder
  ) {
      this.myForm = this.createPatientTypeForm();
      this.myformSearch = this.createSearchForm();
  }
  createSearchForm(): FormGroup {
      return this._formBuilder.group({
          PatientTypeSearch: [""],
          IsDeletedSearch: ["2"],
      });
  }

  createPatientTypeForm(): FormGroup {
      return this._formBuilder.group({
          PatientTypeId: [""],
          PatientType: [""],
          IsDeleted: ["false"],
          AddedBy: ["0"],
          UpdatedBy: ["0"],
          AddedByName: [""],
      });
  }

  initializeFormGroup() {
      this.createPatientTypeForm();
  }

  public getPatientTypeMasterList() {
      return this._httpClient.post(
          "Generic/GetByProc?procName=RetrievePatientTypeMasterForCombo",
          {}
      );
  }

  public patientTypeMasterInsert(param) {
      return this._httpClient.post("Master/PatientTypeSave", param);
  }

  public patientTypeMasterUpdate(param) {
      return this._httpClient.post(
          "Master/PatientTypeUpdate",
          param
      );
  }

  populateForm(param) {
      this.myForm.patchValue(param);
  }

  public getdeletemember(data){
    return this._httpClient.post("Generic/GetBySelectQuery?query="+data, {})
  }
}

