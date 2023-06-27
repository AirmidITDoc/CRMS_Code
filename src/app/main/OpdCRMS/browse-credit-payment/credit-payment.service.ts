import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditPaymentService {

  public afterMethodFileSelect: Subject<any> = new Subject();
  
  myFilterform: FormGroup;
  mySaveForm: FormGroup;
  now = Date.now();
  sIsLoading: string = '';
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    // this.mySaveForm = this.saveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      RegNo:'',
      FirstName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName:['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      DoctorId:'',
      DoctorName:'',
      IsMark: 2,
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }

  //---Regi starrt-------
  // saveForm(): FormGroup {
  //   return this._formBuilder.group({

  //     RegId: '',
  //     RegDate: '',
  //     RegTime: '',
  //     PrefixId: '',
  //     PrefixID: '',
  //     FirstName: ['', [
  //       Validators.required,
  //       Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
  //     ]],
  //     MiddleName: ['', [
  //       Validators.required,
  //       Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
  //     ]],
  //     LastName: ['', [
  //       Validators.required,
  //       Validators.pattern("^[A-Za-z]*[a-zA-z]*$"),
  //     ]],
  //     Address: '',
  //     City: '',
  //     PinNo: ['', [Validators.minLength(6), Validators.maxLength(6)]],
  //     DateofBirth:  [(new Date()).toISOString()],
  //     Age: '',
  //     GenderId: '',
  //     GenderName: '',
  //     PhoneNo: ['', [
       
  //       Validators.pattern("^[- +()]*[0-9][- +()0-9]*$"),
  //       Validators.minLength(10),
  //       Validators.maxLength(10),
  //     ]],
  //     MobileNo: ['', [
  //       Validators.required,
  //       Validators.pattern("^[0-9]*$"),
  //       Validators.minLength(10),
  //       Validators.maxLength(10),
  //     ]],
  //     AddedBy: '',
  //     RegNo: '',
  //     AgeYear: ['', Validators.pattern("[0-9]+")],
  //     AgeMonth: ['', Validators.pattern("[0-9]+")],
  //     AgeDay: ['', Validators.pattern("[0-9]+")],
  //     CountryId: '',
  //     StateId: '',
  //     CityId: '',
  //     CityName: '',
  //     MaritalStatusId: '',
  //     IsCharity: '',
  //     ReligionId: '',
  //     AreaId: '',
  //     VillageId: '',
  //     TalukaId: '',
  //     PatientWeight: '',
  //     AreaName: '',
  //     AadharCardNo: ['', [
  //       Validators.required,
  //       Validators.pattern("^[0-9]*$"),
  //       Validators.minLength(12),
  //       Validators.maxLength(12),
  //     ]],
  //     PanCardNo: '',
  //     VisitId: '',
  //     RegID: '',
  //     VisitDate: [(new Date()).toISOString()],
  //     VisitTime: [(new Date()).toISOString()],
  //     UnitId: '',
  //     PatientTypeID: '',
  //     PatientType: '',
  //     ConsultantDocId: '',
  //     RefDocId: '',
  //     DoctorId: '',
  //     DoctorName: '',
  //     OPDNo: '',
  //     TariffId: '',
  //     CompanyId: '',
  //     CompanyName: '',
  //     //AddedBy :'',
  //     IsCancelledBy: '',
  //     IsCancelled: '',
  //     IsCancelledDate: '',
  //     ClassId: '',
  //     ClassName: '',
  //     DepartmentId: '',
  //     DepartmentName: '',
  //     PatientOldNew: '',
  //     FirstFollowupVisit: '',
  //     AppPurposeId: '',
  //     FollowupDate: '',
  //     IsMark: '',
  //     IsXray: '',
  //     HospitalID: '',
  
  //     ServiceID: '',
  //     TotalAmt: '',
  //     ConcessionAmt: '',
  //     NetPayableAmt: '',

  //   });
  // }

  initializeFormGroup() {
    // this.saveForm();
  }
  // display Appointment list
  public getAppointmentList(employee) {
    // return this._httpClient.post("Generic/GetByProc?procName=ps_Rtrv_VisitDetailsList", employee)
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveT_VisitDetailsList", employee)
  }
  // Doctor Master Combobox List
  public getAdmittedDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }


  //Deartment Combobox List
  public getDepartmentCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveDepartmentMasterForCombo", {})
  }
  //Doctor Master Combobox List
  public getDoctorMasterCombo(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorWithDepartMasterForCombo_Conditional", { "Id": Id })
  }
  //Doctor 1 Combobox List
  public getDoctorMaster1Combo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorListForCombo", {})
  }
  //Doctor 2 Combobox List
  public getDoctorMaster2Combo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }
  populateForm(employee) {
    this.mySaveForm.patchValue(employee);
  }

  getregisterListByRegId(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RegbyRegID", employee)
  }

  public getTemplate(query) {
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  } 
  public getOPDPrecriptionPrint(PrecriptionId) {
    return this._httpClient.post("Generic/GetByProc?procName=rptOPDPrecriptionPrint ", PrecriptionId)
  }

  public getappschdulelist(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RegbyRegID", employee)
  }

public CaseDetailInsert(employee){
  return this._httpClient.post("OutPatient/CaseDetailSave", employee);
}

  populateFormpersonal(employee) {
    // this.personalFormGroup.patchValue(employee);
  }

 

}

