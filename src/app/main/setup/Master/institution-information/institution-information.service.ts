import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInformationService {

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  public getInstitutionInformationList(Params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InstitutionInformationList", Params);
  }

  public InsertInstitutionInformation(Params) {
    return this._httpClient.post("Master/Save_InsertInstitutionInformation", Params);
  }
}
