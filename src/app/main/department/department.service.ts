import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  myform:FormGroup;

  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) { 
    this.myform=this.createDepartmentForm();
  }

  createDepartmentForm ():FormGroup{
    return this._formBuilder.group({
      DepartmentId: [''],
      DepartmentName: [''],
      IsDeleted: ['false'],
      DocDeptId:[''],
      DoctorId:[''],
      

    });

  }
    initializeFormGroup() {
      this.createDepartmentForm();
  }


  public getDepartmentMasterList() {
    return this._httpClient.post("Generic/GetByProc?procName=ps_Rtrv_M_DepartmentMaster_by_Name", {DepartmentName:"%"})
  }

  public departmentMasterInsert(employee) {
    return this._httpClient.post("OutPatient/DepartmentInsert", employee);
  }
  
  public departmentMasterUpdate(employee) {
    return this._httpClient.post("OutPatient/DepartmentUpdate", employee);
  }
  
  populateForm(employee) {
    this.myform.patchValue(employee);
  }



  public getDoctortypeMasterList() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrive_DoctortypeMaster_by_Name", {DoctorType:"%"})
  }

  
  public doctortTypeMasterInsert(employee) {
    return this._httpClient.post("OutPatient/DocDeparttmentTypeInsert", employee);
  }
  
  public doctorTypeMasterUpdate(employee) {
    return this._httpClient.post("OutPatient/DocDeparttmentTypeUpdate", employee);
  }


  }
