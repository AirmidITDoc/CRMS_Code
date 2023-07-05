import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CompanyMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createCompanymasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createCompanymasterForm(): FormGroup {
        return this._formBuilder.group({
            CompanyId: [""],
            CompanyName: [""],
            Address: ["", Validators.required],
            State: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
                ],
            ],
            StateCode: [""],
            PinCode: ["", [Validators.minLength(6), Validators.maxLength(6)]],
            ContactNo: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],

            GSTIN: [""],
            SAC: [""],
            PAN: [""],
            PlaceOfSupply: ["", Validators.pattern("[0-9]+")],
            CreatedBy: [""],

        });
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            CompanyNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createCompanymasterForm();
    }

    public getCompanyMaster(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_CompList_by_Name",
            param
        );
    }

    public getStateList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_StateMaster",
            {}
        );
    }

  

    public companyMasterInsert(param) {
        return this._httpClient.post("Master/CompanySave", param);
    }

    public companyMasterUpdate(param) {
        return this._httpClient.post("Master/CompanyUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
