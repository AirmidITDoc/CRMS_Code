import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class MaritalstatusMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createMaritalForm();
        this.myformSearch = this.createSearchForm();
    }

    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            MaritalStatusNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createMaritalForm(): FormGroup {
        return this._formBuilder.group({
            MaritalStatusId: [""],
            MaritalStatusName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    initializeFormGroup() {
        this.createMaritalForm();
    }

    public getmaritalstatusMasterList(e) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_MaritalStatusNameNameList_by_Name",
            e
        );
    }

    public insertMaritalStatusMaster(param) {
        return this._httpClient.post(
            "Master/MaritalStatusSave",
            param
        );
    }

    public updateMaritalStatusMaster(param) {
        return this._httpClient.post(
            "Master/MaritalStatusUpdate",
            param
        );
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
