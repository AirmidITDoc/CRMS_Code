import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceMaster } from "./service-master.component";

@Injectable({
    providedIn: "root",
})
export class ServiceMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;
    registerObj = new ServiceMaster({});
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createServicemasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createServicemasterForm(): FormGroup {
        return this._formBuilder.group({
            ServiceId: [""],
            GroupId: [""],
            GroupName: [""],
            ServiceShortDesc: [""],
            ServiceName: [""],
            Price: ["", Validators.pattern("[0-9]+")],
            IsEditable: [0],
            CreditedtoDoctor: [0],
            IsPathology: [0],
            IsRadiology: [0],
            IsActive: [1],
            PrintOrder: ["", Validators.pattern("[0-9]+")],
            IsPackage: [0],
            SubGroupId: [""],
            DoctorId: [""],
            FirstName: ["", Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")],
            IsEmergency: [0],
            EmgAmt: ["", Validators.pattern("[0-9]+")],
            EmgPer: ["", Validators.pattern("[0-9]+")],
            IsDocEditable: [0],
            AddedBy: [""],
            UpdatedBy: [""],
            AddedByName: [""],
            Emergencyamt:[''],
            ServiceDetailId: [""],
            TariffId: [""],
            ClassId: ["0"],
            ClassRate: ["0"],
            DoctorID:[""],
            EffectiveDate:[{ value: this.registerObj.EffectiveDate }],
        });
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            ServiceNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createServicemasterForm();
    }

    public getServiceMasterList(m) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_ServList",
            m
        );
    }

    // public getGroupMasterCombo() {
    //     return this._httpClient.post(
    //         "Generic/GetByProc?procName=Retrieve_GroupMasterForCombo",
    //         {}
    //     );
    // }

    public getDoctorMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_DoctorMasterForCombo",
            {}
        );
    }

    // public getSubgroupMasterCombo() {
    //     return this._httpClient.post(
    //         "Generic/GetByProc?procName=Retrieve_SubGroupMasterForCombo",
    //         {}
    //     );
    // }
    
    // Retrive_servicedetails_classwise
    public getServiceClassMasterList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrive_Classname",
            {}
        );
    }

   public getServiceClassMasterUpdateList(emp){
    return this._httpClient.post(
        "Generic/GetByProc?procName=Retrive_servicedetails_classwise",
    emp
    );
   }

    public getTariffMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveTariffMasterForCombo",
            {}
        );
    }

    public serviceMasterInsert(param) {
        return this._httpClient.post("Master/ServiceSave", param);
    }

    public serviceMasterUpdate(param) {
        return this._httpClient.post("Master/ServiceUpdate", param);
    }

    public serviceDetailInsert(param) {
        return this._httpClient.post("Billing/ServiceSave", param);
    }

    public serviceDetDelete(param) {
        return this._httpClient.post("Billing/ServiceUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }

     // Doctor Master Combobox List
  public getAdmittedDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }

  public getGroupMasterCombo() {
    return this._httpClient.post(
        "Generic/GetByProc?procName=Retrieve_GroupMasterForCombo",
        {}
    );
}
}
