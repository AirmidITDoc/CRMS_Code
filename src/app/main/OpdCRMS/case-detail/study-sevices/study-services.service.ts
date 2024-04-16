import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudyServicesService {
  studyServicesFormGroup: FormGroup;
  myFilterform: FormGroup;
  myStudyServiceform: FormGroup;
  now = Date.now();
  sIsLoading: string = '';
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
  
    this.studyServicesFormGroup = this.createStudyservicesForm();
    this.myFilterform = this.filterForm();
    this.myStudyServiceform =this.createStudyServiceUpdate();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      // RegNo:'',
      StudyId:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      ServiceName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
    
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }


  createStudyservicesForm(){
    return this._formBuilder.group({
      StudyServicesId:'',
      VisitId: '',
      VisitName: '',
      ServiceName: '',
      Price: '',
      TotalAmount:' ',
      StudyId:''
    });
  }
  createStudyServiceUpdate():FormGroup{
    return this._formBuilder.group({
      StudyServicesId:0,
      VisitName:0,
      StudyVisitId:0,
      ServiceId: 0,
      ServiceName:0,
      Amount: 0,
    });
  }
  
  populateStudyServiceUpdateForm(param) {
    this.myStudyServiceform.patchValue(param);
  }

  public getStudyservicebyStuIdList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyServicebyStudyId",employee);
  }

  public getStudyserviceList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_T_StudyServices",employee);
  }


  public getVistNameList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyScheduleList",employee);
  }

  public getServviceNameList(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_ServiceMasterList",{});
  }

  public StudyServiceInsert(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudyService", employee)
  }
  public StudyServiceUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudyServiceId", employee)
  }

  populateFormpersonal(employee) {
    this.studyServicesFormGroup.patchValue(employee);
  }

}