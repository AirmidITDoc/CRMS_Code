import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RelationShipMasterService {
  myform: FormGroup;
    myformSearch: FormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createRelationshipForm();
        this.myformSearch = this.createSearchForm();
    }

    createRelationshipForm(): FormGroup {
        return this._formBuilder.group({
            RelationshipId: [""],
            RelationshipName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            RelationshipNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createRelationshipForm();
    }

    public getrelationshipMasterList(e) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_RelativeNameList_by_Name",
            e
        );
    }

    public relationshipMasterInsert(param) {
        return this._httpClient.post("Master/RelationshipSave", param);
    }

    public relationshipMasterUpdate(param) {
        return this._httpClient.post(
            "Master/RelationshipUpdate",
            param
        );
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
