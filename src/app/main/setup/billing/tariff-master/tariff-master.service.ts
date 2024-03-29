import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class TariffMasterService {
    myform: FormGroup;
    myformSearch: FormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createTariffForm();
        this.myformSearch = this.createSearchForm();
    }

    createTariffForm(): FormGroup {
        return this._formBuilder.group({
            TariffId: [""],
            TariffName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            TariffNameSearch: [""],
            IsDeletedSearch: ["0"],
        });
    }
    initializeFormGroup() {
        this.createTariffForm();
    }

    public getTariffMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_tariffNameList_by_Name",
            param
        );
    }

    public tariffMasterInsert(param) {
        return this._httpClient.post("Master/TariffSave", param);
    }

    public tariffMasterUpdate(param) {
        return this._httpClient.post("Master/TariffUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
    
public getdeletemember(data){
    return this._httpClient.post("Generic/GetBySelectQuery?query="+data, {})
  }
}
