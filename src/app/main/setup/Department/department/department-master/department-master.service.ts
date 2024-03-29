import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService {
  myform: FormGroup;
    myformSearch: FormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {
        this.myform = this.createDepartmentForm();
        this.myformSearch = this.createSearchForm();
    }

    createDepartmentForm(): FormGroup {
        return this._formBuilder.group({
            DepartmentId: [""],
            DepartmentName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): FormGroup {
        return this._formBuilder.group({
            DepartmentNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createDepartmentForm();
    }

    public getDepartmentMasterList(emp) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_DepartmentNameList_by_Name",
            emp
        );
    }

    public departmentMasterInsert(employee) {
        return this._httpClient.post(
            "OutPatient/DepartmentInsert",
            employee
        );
    }

    public departmentMasterUpdate(employee) {
        return this._httpClient.post(
            "OutPatient/DepartmentUpdate",
            employee
        );
    }

    populateForm(employee) {
        this.myform.patchValue(employee);
    }
}
