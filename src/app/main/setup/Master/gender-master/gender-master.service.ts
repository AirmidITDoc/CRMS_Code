import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class GenderMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createGenderForm();
        this.myformSearch = this.createSearchForm();
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            GenderNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createGenderForm(): FormGroup {
        return this._formBuilder.group({
            GenderId: [""],
            GenderName: [""],
            IsDeleted: ["false"],
        });
    }

    initializeFormGroup() {
        this.createGenderForm();
    }

    public getGenderMasterList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_GenderMaster_by_Name",
            {}
        );
    }

    public genderMasterInsert(Param) {
        return this._httpClient.post("Master/GenderSave", Param);
    }

    public genderMasterUpdate(Param) {
        return this._httpClient.post("Master/GenderUpdate", Param);
    }

    populateForm(Param) {
        this.myform.patchValue(Param);
    }
}
