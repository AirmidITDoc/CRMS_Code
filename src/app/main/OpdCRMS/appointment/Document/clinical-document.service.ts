import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClinicalDocumentService {

  constructor(  private handler: HttpBackend,private _httpClient: HttpClient,
    private _formBuilder: FormBuilder) { }
}
