import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  personalFormGroup: FormGroup;

  public afterMethodFileSelect: Subject<any> = new Subject();
  
  myFilterform: FormGroup;
  mySaveForm: FormGroup;
  now = Date.now();
  sIsLoading: string = '';
  constructor(
    private handler: HttpBackend,private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.personalFormGroup = this.createPesonalForm();
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
      MrNo:'',
    });
  }



  createPesonalForm() {
    return this._formBuilder.group({
      RegId: '',
      RegNo: '',
      PrefixId: '',
      PrefixID: '',
      FirstName: ['', [
        // Validators.required,
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      MiddleName: ['', [

        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName: ['', [
        // Validators.required,
        Validators.pattern("^[A-Za-z]*[a-zA-z]*$"),
      ]],
      GenderId: '',
      Address: '',
      DateOfBirth:  [(new Date()).toISOString()],
      AgeYear: ['', [
        // Validators.required,
        Validators.maxLength(3),
        Validators.pattern("^[0-9]*$")]],
      AgeMonth: ['', [
        Validators.pattern("^[0-9]*$")]],
      AgeDay: ['', [
        Validators.pattern("^[0-9]*$")]],
      PhoneNo: ['', [Validators.minLength(10),
      Validators.maxLength(15),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]],
      MobileNo: ['', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]],
      AadharCardNo: ['', [
        // Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(12),
        Validators.maxLength(12),
      ]],
      PanCardNo: '',
      MaritalStatusId: '',
      ReligionId: '',
      AreaId: '',
      CityId: '',
      StateId: '',
      CountryId: '',
      IsCharity: '',
    });
  }

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

  public getSearchRegistrationList1(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_PatientRegistrationList1",employee)
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
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_ServiceList", employee)
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



public InvoiceBillUpdateIntegration(employee){
  return this._httpClient.post("CRMSTran/Update_Bill_integration", employee);
}

public InvoiceBillAddchargesInteration(employee){
  return this._httpClient.post("CRMSTran/update_AddCharges_integration", employee);
}



public UpdateInvoiceBill(employee){
  return this._httpClient.post("OutPatient/UpdateInvoiceRegno", employee);
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
  return this._httpClient.post("Generic/GetByProc?procName=rptBillPrint", employee)
}

public getPatientScreeningBillingList(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_PatientScreeningBillingList", employee)
}
public getBillGeneration(employee){
  return this._httpClient.post("Generic/GetByProc?procName=AutoBillGeneration", employee)
}

//Bill detail
public getVisitdetailsList(employee){
  return this._httpClient.post("Generic/GetByProc?procName=crms_visitdetails", employee)
}

public getBillList(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_bill", employee)
}

public getMainBillDetData(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_T_BillDetailList", employee)
}

//API Connection

public getstudywiseservicelist(employee){
  return this._httpClient.post("Generic/GetByProc?procName=Rtrv_VisitWiseStudyServiceInform", employee)
}

public RegDocInsert(employee){
  return this._httpClient.post("OutPatient/InvoiceBillMappinngSave", employee);
}



}