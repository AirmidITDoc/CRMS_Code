import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SponserService {

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  public getSponserInformationList(Params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_SponserInformationList", Params);
  }

  public InsertSponserInformation(Params) {
    return this._httpClient.post("Master/Save_InsertSponserInformation", Params);
  }
}

