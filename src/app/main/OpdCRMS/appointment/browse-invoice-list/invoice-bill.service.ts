import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceBillService {
  myFilterform: FormGroup ;

  constructor(
    public _httpClient:HttpClient,
    private _formBuilder: FormBuilder
  ) { 
    this.myFilterform=this.filterForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
     
      FirstName: ['', [
         Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
     ]],
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      InvoiceId: '', 
     
    });
  }

  public getBrowseInvoiceBillsList(param) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InvoiceList", param) 
  }  

  public getInvoiceBillPrint(BillNo) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseInvoiceBill", BillNo)
  }

  public getTemplate(query) {
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  } 

}