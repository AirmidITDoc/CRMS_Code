import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

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
      StudyId:'',
      // DoctorName:'',
      // IsMark: 2,
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

  // Add new registration
  public regInsert(employee) {
    return this._httpClient.post("OutPatient/OPDRegistrationSave", employee);
  }

  // update registration
  public regUpdate(employee) {
    return this._httpClient.post("OutPatient/RegistrationUpdate", employee);
  }

  // Add new Appointment
  public appointregInsert(employee) {
    return this._httpClient.post("OutPatient/RegistrationInsert", employee);
  }

  // Update  registration
  public appointregupdate(employee) {
    return this._httpClient.post("OutPatient/RegistrationUpdate", employee);
  }

  // display Appointment list
  public getAppointmentList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_VisitDetailsList", employee)
  }
  // Doctor Master Combobox List
  public getAdmittedDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }


  // Admission Form Combobox old

  //Prefix Combobox List
  public getPrefixCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrievePrefixMasterForCombo", {})
  }

  //Gender Combobox List
  public getGenderCombo(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_SexMasterForCombo_Conditional", { "Id": Id })
  }

  

  public getGenderMasterCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveGenderMasterForCombo", {})
  }

  // Classmaster List
  public getClassMasterCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_WardClassMasterForCombo", {})
  }

  //Area Combobox List
  public getAreaCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_AreaMasterForCombo", {})
  }

  //Area Combobox List
  public getPurposeList() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_PurposeMasterForCombo", {})
  }
  

  //Marital Combobox List
  public getMaritalStatusCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_MaritalStatusMasterForCombo", {})
  }
  //Religion Combobox List
  public getReligionCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_ReligionMasterForCombo", {})
  }
  //Hospital Combobox List
  public getHospitalCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_UnitMaster_1", {})
  }
  //Patient Type Combobox List
  public getPatientTypeCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrievePatientTypeMasterForCombo", {})
  }
  //Tariff Combobox List
  public getTariffCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveTariffMasterForCombo", {})
  }
  //company Combobox List
  public getCompanyCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCompanyMasterForCombo", {})
  }
  //subtpa Combobox List
  public getSubTPACompCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveM_SubTPACompanyMasterForCombo", {})
  }
  //relationship Combobox List
  public getRelationshipCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveRelationshipMasterForCombo", {})
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
  //Ward Combobox List
  public getWardCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RoomMasterForCombo", {})
  }
  //Bed Combobox List
  public getBedCombo(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveBedMasterForCombo_Conditional", { "Id": Id })
  }

  //  city list
  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }
  //state Combobox List
  public getStateList(CityId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StateMasterForCombo_Conditional", { "Id": CityId })
  }
  //country Combobox List
  public getCountryList(StateId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional", { "Id": StateId })
  }
  //service Combobox List
  public getServiceList() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_ServiceMasterForCombo", {})
  }
  //registration list 
  public getRegistrationList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RegistrationList", employee)
  }

  public UpdateQueryByStatement(query) {
    return this._httpClient.post("Generic/ExecByQueryStatement?query="+query, {})
  }

  // public getDeptwiseDoctorMaster(){
  //   return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorWithDepartMasterForCombo", {})
  // }

  public getDeptwiseDoctorMaster(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorWithDepartMasterForCombo", {})
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

  public getCaseIDCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationCombo", {});
  }

  public getStudyListCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_StudyInformationCombo", {});
  }

  public getCaseDetailPrint(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CasedetailId",employee);
  }
  public getchargesList(data) {
    return this._httpClient.post("Generic/GetBySelectQuery?query=" + data, {})
  }

  public InsertOPAddCharges(employee) {
    return this._httpClient.post("OutPatient/OPDAddCharges", employee);
  }
   // Get billing Service List 
   public getBillingServiceList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveServices", employee)
  }
  public InsertOPBilling(employee) : Observable<any> {
    return this._httpClient.post("OutPatient/BillInsert", employee)
  }

  public getBillPrint(BillNo) {
    return this._httpClient.post("Generic/GetByProc?procName=rptBillPrint", BillNo)
  } 
  public getClassCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_ClassName", {})
  }
public getConcessionCombo()
{
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_ConcessionReasonMasterForCombo", {});
}
public getBankMasterCombo() {
  return this._httpClient.post("Generic/GetByProc?procName=RetrieveBankMasterForCombo", {})
}

public getVisitDateCombo(Id){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_VisitDateTime", Id)
}

public VisitInsert(employee){
  return this._httpClient.post("OutPatient/VisitAddSave", employee)
}


public VisitUpdate(employee){
  return this._httpClient.post("OutPatient/VisitUpdate", employee)
}

public PaymentInsert(employee){
return this._httpClient.post("OutPatient/PaymentSave", employee)
}


public InvoiceBillMappingInsert(employee){
  return this._httpClient.post("OutPatient/InvoiceBillMappinngSave", employee);
}

public InvoiceBillMappingUpdate(employee){
  return this._httpClient.post("OutPatient/InvoiceBillMappinngUpdate", employee);
}

// public getBrowseBillsList(employee){
//   return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InvoiceBill", employee)
// }

public getBrowseBilldetailList(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_InvoiceBill", employee)
}



public getCaseIDList (D_data){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_CaseWisePatientSummary", D_data);
}

public getFinancialSummarybudgetPrint(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_VisitDateTime", employee)
}

}