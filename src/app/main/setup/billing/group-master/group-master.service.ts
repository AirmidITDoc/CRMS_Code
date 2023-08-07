import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class GroupMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createGroupForm();
        this.myformSearch = this.createSearchForm();
    }

    createGroupForm(): FormGroup {
        return this._formBuilder.group({
            GroupId: [""],
            GroupName: ["", Validators.required],
            PrintSeqNo: ["", Validators.pattern("[0-9]+")],
            IsConsolidated: ["1"],
            IsConsolidatedDR: ["0"],

            IsActive: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            GroupNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createGroupForm();
    }

    public getGroupMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_GroupList_by_Name",
            param
        );
    }

    public groupMasterInsert(param) {
        return this._httpClient.post("Master/GroupSave", param);
    }

    public groupMasterUpdate(param) {
        return this._httpClient.post("Master/GroupUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
