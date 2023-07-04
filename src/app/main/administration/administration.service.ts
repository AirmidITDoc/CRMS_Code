import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  myformSearch: any;
  myFilterform: FormGroup;
  myPharmacyformSearch: FormGroup;
  myBillCancellationformSearch: FormGroup;
  myDocShrformSearch: FormGroup;
  mySaveForm: FormGroup;
  constructor(private _httpClient: HttpClient, private _formBuilder: FormBuilder) {
    this.myFilterform = this.filterForm();
    this.myformSearch = this.filterForms();
    this.myPharmacyformSearch = this.pharmacyPaymodeForm();
    this.myBillCancellationformSearch = this.billCancellationForm();
    this.myDocShrformSearch = this.BillListForDocShr();
    this.mySaveForm = this.saveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      UserName: '',
      FirstName: '',
      LastName: ''
    });
  }


  filterForms(): FormGroup {
    return this._formBuilder.group({
      FirstName: '',
      LastName: '',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      RegNo: '',
      PBillNo: '',
      ReceiptNo: '',
      StatusSearch: '',


    });
  }

  pharmacyPaymodeForm(): FormGroup {
    return this._formBuilder.group({
      FirstName: '',
      LastName: '',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      RegNo: '',
      SalesNo: '',
      StatusSearch: '',


    });
  }
  billCancellationForm(): FormGroup {
    return this._formBuilder.group({
      FirstName: '',
      LastName: '',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      RegNo: '',
      PBillNo: '',


    });
  }

  saveForm(): FormGroup {
    return this._formBuilder.group({
      ConfigId: '',
      PrintRegAfterReg: '',
      PDPrefix: '',
      OTCharges: '',
      PrintOPDCaseAfterVisit: '',
      PrintIPDAfterAdm: '',
      PopOPBillAfterVisit: '',
      PopPayAfterOPBill: '',
      GenerateOPBillInCashOption: '',
      MandatoryFirstName: '',
      MandatoryMiddleName: '',
      MandatoryLastName: '',
      MandatoryAddress: '',
      MandatoryCity: '',
      MandatoryAge: '',
      MandatoryPhoneNo: '',
      OPBillCounter: '',
      OPReceiptCounter: '',
      OPRefundOfBillCounter: '',
      IPAdvanceCounter: '',
      IPBillCounter: '',
      IPReceiptCounter: '',
      IPRefundBillCounter: '',
      IPRefofAdvCounter: '',
      RegPrefix: '',
      RegNo: '',
      IPPrefix: '',
      IPNo: '',
      OPPrefix: '',
      OPNo: '',
      PathDepartment: '',
      IsPathologistDr: '',
      OPD_Billing_CounterId: '',
      OPD_Receipt_CounterId: '',
      OPD_Refund_Bill_CounterId: '',
      OPD_Advance_CounterId: '',
      OPD_Refund_Advance_CounterId: '',
      IPD_Advance_CounterId: '',
      IPD_Billing_CounterId: '',
      IPD_Receipt_CounterId: '',
      IPD_Refund_of_Bill_CounterId: '',
      IPD_Refund_of_Advance_CounterId: '',
      PatientTypeSelf: '',
      ClassForEdit: '',
      PharmacySales_CounterId: '',
      PharmacySalesReturn_CounterId: '',
      PharmacyReceipt_CounterId: '',
      ChkPharmacyDue: '',
      G_IsPharmacyPaperSetting: '',
      PharmacyPrintName: '',
      G_PharmacyPaperName: '',
      G_IsOPPaperSetting: '',
      G_PharmacyPrintName: '',
      G_OPPaperName: '',
      DepartmentId: '',
      DoctorId: '',
      G_IsIPPaperSetting: '',
      G_IPPaperName: '',
      G_OPPrintName: '',
      IsOPSaleDisPer: '',
      OPSaleDisPer: '',
      IsIPSaleDisPer: '',
      IPSaleDisPer: '',
      PatientTypeID: '',


    });
  }

  BillListForDocShr(): FormGroup {
    return this._formBuilder.group({

      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      DoctorId: '',
      PBillNo: '',


    });
  }

  public getUserList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=RtrvUserList", employee)
  }

  // Pharmay Payment mode changes
  public getPharmacyPaymentModeList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_BrowsePharmacyPayReceipt", employee)
  }

  public getPharmacyPaymentIPAdvModeChanges(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPAdvPayPharReceipt", employee)
  }

  // Hospital Payment mode changes
  public getHosptialPaymentOPModeList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseOPDPaymentReceipt", employee)
  }

  public getHosptialPaymentIPModeChanges(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPDPaymentReceipt", employee)
  }

  public getHosptialPaymentIPAdvModeChanges(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPAdvPaymentReceipt", employee)
  }

  // Hospital OP Bill Cancellation
  public getHosptialOPBillCancellationList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=rtrvIPBillist", employee)
  }

  //Doctor Share
  public getBillListForDocShrList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_BillListForDocShr", employee)
  }

  // Doctor Master Combobox List
  public getAdmittedDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }


  public ConfigSettingParamList() {
    // debugger;
    return this._httpClient.post(`Generic/GetByProc?procName=SS_ConfigSettingParam`, {})
    // console.log(this.configSettingParam);
  };
  public SchedulerParamList() {
    // debugger;
    return this._httpClient.post(`Generic/GetByProc?procName=ss_get_schedulerList`, {})

  };


  //Patient Type Combobox List
  public getPatientTypeCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrievePatientTypeMasterForCombo", {})
  }


  public getOPDBillingCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCashCounterMasterForCombo", {})
  }

  public getPathDepartmentCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveDocDepartmentMasterForCombo", {})
  }
  public getPathologistDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_PathologistDoctorMasterForCombo", {})
  }

  public ConfigUpdate(employee) {
    return this._httpClient.post("OutPatient/UpdateConfigSetting", employee);
  }


  public getUserId(data) {
    return this._httpClient.post("Generic/GetBySelectQuery?query=" + data, {})
  }

  public getpasswwordupdate(data) {
    return this._httpClient.post("Generic/ExecByQueryStatement?query=" + data, {})
  }

  // bill edit option
  public getbilllistforEdit(data) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPDBill", data)
  }

  public getIPbillforEdit(data) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_IPBill", data)
  }

   public getIPPaymentforEdit(data) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_IPBill_Payment", data)
  }

  public getTalltinterface(query){
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  }

  public getIPAdvancePayment(query){
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  }
  public getOPbillListForEdit(data) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_OP_Bill_Update", data)
  }

  public IPBillUpdate(employee){
    return this._httpClient.put("InPatient/IPBillingEditProcess", employee)
  }

  public IPAdvanceUpdate(employee){
    return this._httpClient.post("InPatient/IPAdvanceEditProcess", employee)
  }

  public getssroletemplatemasterList() {
   
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RoleMasterForCombo", {})
  }
  public RoleTemplateMasterSave(employee)
{    
  return this._httpClient.post("OutPatient/OP_SS_RoleTemplateMasterSave",employee);
}

public getRoleElementDetails(Id) {
  return this._httpClient.post("Generic/GetByProc?procName=ps_Rtrv_RoleListWithId", {"RoleId": Id});
}


public getRoleCombobox() {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RoleMasterForCombo", {})
}

public getStoreCombo() {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StoreNameForCombo", {})
}


public getDoctorMasterCombo() {
  return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
}

 
public UserInsert(employee) {
  return this._httpClient.post("DoctorMaster/DoctorSave", employee);
}

public UserUpdate(employee) {
  return this._httpClient.post("DoctorMaster/DoctorUpdate", employee);
}


}
