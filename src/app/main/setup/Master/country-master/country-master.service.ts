import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CountryMasterService {

  myform: FormGroup;
  myformSearch: FormGroup;

  constructor(
      private _httpClient: HttpClient,
      private _formBuilder: FormBuilder
  ) {
      this.myform = this.createCountryForm();
      this.myformSearch = this.createSearchForm();
  }
  createSearchForm(): FormGroup {
      return this._formBuilder.group({
          CountryNameSearch: [""],
          IsDeletedSearch: ["2"],
      });
  }
  createCountryForm(): FormGroup {
      return this._formBuilder.group({
          CountryId: [""],
          CountryName: [""],
          IsDeleted: ["false"],
          AddedBy: ["0"],
          UpdatedBy: ["0"],
      });
  }

  initializeFormGroup() {
      this.createCountryForm();
  }

  public getCountryMasterList() {
      return this._httpClient.post(
          "Generic/GetByProc?procName=Rtrv_CountryNameList_by_Name",
          { CountryName: "%" }
      );
  }

  public countryMasterInsert(param) {
      return this._httpClient.post("Master/CountrySave", param);
  }

  public countryMasterUpdate(param) {
      return this._httpClient.post("Master/CountryUpdate", param);
  }

  populateForm(param) {
      this.myform.patchValue(param);
  }
  public getdeletemember(data){
    return this._httpClient.post("Generic/GetBySelectQuery?query="+data, {})
  }
}

