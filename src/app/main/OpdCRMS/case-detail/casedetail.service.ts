import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CasedetailService {
  myStudyScheduleform: FormGroup;

  personalFormGroup: FormGroup;
  myFilterform: FormGroup;
  mySaveForm: FormGroup;
  studySchFormGroup: FormGroup;
  studyServicesFormGroup: FormGroup;

  now = Date.now();
  sIsLoading: string = '';
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    // this.mySaveForm = this.saveForm();
    this.studySchFormGroup = this.createstudySchForm();
    this.personalFormGroup = this.createPesonalForm();
    this.myStudyScheduleform =this.createStudyScheduleUpdate();
  
    // this.studyServicesFormGroup = this.createStudyservicesForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      RegNo:'',
      CaseId:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      CaseName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      // DoctorId:'',
      // DoctorName:'',
      // IsMark: 2,
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }

  createPesonalForm() {
    return this._formBuilder.group({
      ProtocolNo: '',
      ProtocolTitle: '',
      StudyProduct: '',
      TotalSubjects: '',
      TotalVisits: ['', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern("^[0-9]*$")]],
      VisitFrequency:'',
      StudyStartDate:[(new Date()).toISOString()],
      StudyEndDate:[(new Date()).toISOString()],
      Sponser: '',
      Investigator: '',
      Institution:' ',
      AgreementFileName: '',
      CompanyId:'',
      StudyId:'',
      StudyPrefix:'',
      StudyNumber:0,
      VisitStartsFrom:''
    });
  }

  
  createstudySchForm() {
    return this._formBuilder.group({
      VisitId: '',
      VisitName: '',
      VisitDescription: '',
      Amount: '',
      TotalAmount:' ',
      VisitFrequency:0,
      VisitStartsFrom:'',
      });
  }
  createdocumentForm() {
    return this._formBuilder.group({
      StudyId: '',
      DocumentTypeId: '',
      DocumentName: '',
      DocumentPath: '',
    });
  }

  createStudyScheduleUpdate(): FormGroup {
    return this._formBuilder.group({
      StudyVisitId:[0],
      VisitDescription: [""],
      VisitFrequency: [0],
      VisitStartsFrom:['']
    });
  }

 
  populateStudyScheduleUpdateForm(param) {
    this.myStudyScheduleform.patchValue(param);
  }

  public StudyInfoInsert(employee){
    return this._httpClient.post("CRMSTran/Save_StudyInformation", employee);
  }

  public StudyInfoUpdate(employee)
  {    
    return this._httpClient.post("CRMSTran/Update_StudyInformation",employee);
  }

  public getCaseDetailPrint(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CasedetailId",employee);
  }
  public StudyDistributionInsert(employee)
  {    
    return this._httpClient.post("CRMSTran/Insert_SSDoctorPecentage",employee);
  }
  
  public StudyDistributionUpdate(employee)
  {    
    return this._httpClient.post("CRMSTran/update_SSDoctorPecentage",employee);
  }
  populateFormpersonal(employee) {
    this.personalFormGroup.patchValue(employee);
  }

  public getDocumentList(D_data){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Constants", D_data);
  }

  public getVisitFrequencyCList(D_data){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Constants", D_data);
  }
   //company Combobox List
   public getCompanyCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_SponserInformationForCombo", {})
  }

  public getStudyInformationList(Params){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationList",Params);
  }

  public StudySchduleInsert(employee){
    return this._httpClient.post("CRMSTran/Save_InsertStudySchedule", employee)
  }

  public StudySchduleUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudySchedule", employee)
  }
  public Update_UpdateStudyScheduleId(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudyScheduleId", employee)
  }

  public DocumentInsert(employee){
    return this._httpClient.post("CRMSTran/Save_StudyUploadDocument", employee)
  }

  public DocumentUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_StudyUploadDocument", employee)
  }
  
  public getInstitutionCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InstitutionInformationCombo",{});
  }

  public getStudyschdulebyStuIdList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_SchduleDetailBySchId",employee);
  }

  public getVistNameList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_SchduleDetailBySchId",employee);
  }

  public getServviceNameList(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_ServiceMasterList",{});
  }
  public StudyServiceInsert(employee){
    return this._httpClient.post("CRMSTran/Save_InsertStudyService", employee)
  }
  public StudyServiceUpdate(employee){
    return this._httpClient.post("CRMSTran/Update_UpdateStudyService", employee)
  }

  public getStudyservicebyStuIdList(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyServicebyStudyId",employee);
  }

  public getCaseIDCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationCombo", {});
  }

  public getVisitStartsFrom(Params)
  {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Constants",Params);
  }

  public getDoctorTypeList(Params){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_DoctorTypeMasteList_by_Name",Params);
  }
}
