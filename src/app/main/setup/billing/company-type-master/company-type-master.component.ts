import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { CompanyTypeMasterService } from "./company-type-master.service";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";

@Component({
    selector: "app-company-type-master",
    templateUrl: "./company-type-master.component.html",
    styleUrls: ["./company-type-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CompanyTypeMasterComponent implements OnInit {
    PrefixMasterList: any;
    GendercmbList: any = [];
    msg: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        "CompanyTypeId",
        "TypeName",
        "AddedByName",
        "IsDeleted",
        "action",
    ];

    DSCompanyTypeMasterList = new MatTableDataSource<CompanyTypeMaster>();

    constructor(public _companytypeService: CompanyTypeMasterService) {}

    ngOnInit(): void {
        this.getCompanytypeMasterList();
    }
    onSearch() {
        this.getCompanytypeMasterList();
    }

    onSearchClear() {
        this._companytypeService.myformSearch.reset({
            TypeNameSearch: "",
            IsDeletedSearch: "2",
        });
    }
    getCompanytypeMasterList() {
        var param = { TypeName: "%" };
        this._companytypeService
            .getCompanytypeMasterList(param)
            .subscribe((Menu) => {
                this.DSCompanyTypeMasterList.data = Menu as CompanyTypeMaster[];
                this.DSCompanyTypeMasterList.sort = this.sort;
                this.DSCompanyTypeMasterList.paginator = this.paginator;
            });
    }

    onClear() {
        this._companytypeService.myform.reset({ IsDeleted: "false" });
        this._companytypeService.initializeFormGroup();
    }

    onSubmit() {
        if (this._companytypeService.myform.valid) {
            if (!this._companytypeService.myform.get("CompanyTypeId").value) {
                var m_data = {
                    companyTypeMasterInsert: {
                        typeName: this._companytypeService.myform
                            .get("TypeName")
                            .value.trim(),
                        addedBy: 10,
                        isDeleted: Boolean(
                            JSON.parse(
                                this._companytypeService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                    },
                };

                this._companytypeService
                    .companyTypeMasterInsert(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getCompanytypeMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not saved",
                                "error"
                            );
                        }
                        this.getCompanytypeMasterList();
                    });
            } else {
                var m_dataUpdate = {
                    companyTypeMasterUpdate: {
                        companyTypeId:
                            this._companytypeService.myform.get("CompanyTypeId")
                                .value,
                        typeName:
                            this._companytypeService.myform.get("TypeName")
                                .value,
                        isDeleted: Boolean(
                            JSON.parse(
                                this._companytypeService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                        updatedBy: 20,
                    },
                };

                this._companytypeService
                    .companyTypeMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getCompanytypeMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                        this.getCompanytypeMasterList();
                    });
            }
            this.onClear();
        }
    }
    onEdit(row) {
        var m_data = {
            CompanyTypeId: row.CompanyTypeId,
            TypeName: row.TypeName.trim(),
            IsDeleted: JSON.stringify(row.IsDeleted),
            UpdatedBy: row.UpdatedBy,
        };
        this._companytypeService.populateForm(m_data);
    }
}

export class CompanyTypeMaster {
    CompanyTypeId: number;
    TypeName: string;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param CompanyTypeMaster
     */
    constructor(CompanyTypeMaster) {
        {
            this.CompanyTypeId = CompanyTypeMaster.CompanyTypeId || "";
            this.TypeName = CompanyTypeMaster.TypeName || "";
            this.IsDeleted = CompanyTypeMaster.IsDeleted || "false";
            this.AddedBy = CompanyTypeMaster.AddedBy || "";
            this.UpdatedBy = CompanyTypeMaster.UpdatedBy || "";
            this.AddedByName = CompanyTypeMaster.AddedByName || "";
        }
    }
}
