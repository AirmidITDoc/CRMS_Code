import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { NotificationServiceService } from "app/core/notification-service.service";
import { AuthenticationService } from "app/core/services/authentication.service";
import { MaritalstatusMasterService } from "./maritalstatus-master.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";

@Component({
    selector: "app-maritalstatus-master",
    templateUrl: "./maritalstatus-master.component.html",
    styleUrls: ["./maritalstatus-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class MaritalstatusMasterComponent implements OnInit {
    MaritalStatusList: any;
    msg: any;

    displayedColumns: string[] = [
        "MaritalStatusId",
        "MaritalStatusName",
        "AddedByName",
        "IsDeleted",
        "action",
    ];

    DSMaritalStatusMasterList = new MatTableDataSource<MaritalStatusMaster>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public _maritalService: MaritalstatusMasterService) {}

    ngOnInit(): void {
        this.getmaritalstatusMasterList();
    }

    onSearchClear() {
        this._maritalService.myformSearch.reset({
            MaritalStatusNameSearch: "",
            IsDeletedSearch: "2",
        });
    }
    onSearch() {
        this.getmaritalstatusMasterList();
    }

    getmaritalstatusMasterList() {
        var m_data = {
            MaritalStatusName: "%",
        };
        this._maritalService
            .getmaritalstatusMasterList(m_data)
            .subscribe((Menu) => {
                this.DSMaritalStatusMasterList.data =
                    Menu as MaritalStatusMaster[];
                this.DSMaritalStatusMasterList.sort = this.sort;
                this.DSMaritalStatusMasterList.paginator = this.paginator;
            });
    }

    onClear() {
        this._maritalService.myform.reset({ IsDeleted: "false" });
        this._maritalService.initializeFormGroup();
    }

    onSubmit() {
        if (this._maritalService.myform.valid) {
            if (!this._maritalService.myform.get("MaritalStatusId").value) {
                var m_data = {
                    maritalStatusMasterInsert: {
                        maritalStatusName: this._maritalService.myform
                            .get("MaritalStatusName")
                            .value.trim(),
                        addedBy: 1,
                        isDeleted: Boolean(
                            JSON.parse(
                                this._maritalService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                    },
                };

                this._maritalService
                    .insertMaritalStatusMaster(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getmaritalstatusMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not saved",
                                "error"
                            );
                        }
                        this.getmaritalstatusMasterList();
                    });
            } else {
                var m_dataUpdate = {
                    maritalStatusMasterUpdate: {
                        maritalStatusId:
                            this._maritalService.myform.get("MaritalStatusId")
                                .value,
                        maritalStatusName: this._maritalService.myform
                            .get("MaritalStatusName")
                            .value.trim(),
                        isDeleted: Boolean(
                            JSON.parse(
                                this._maritalService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                        updatedBy: 1,
                    },
                };

                this._maritalService
                    .updateMaritalStatusMaster(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getmaritalstatusMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                        this.getmaritalstatusMasterList();
                    });
            }
            this.onClear();
        }
    }

    onEdit(row) {
        var m_data = {
            MaritalStatusId: row.MaritalStatusId,
            MaritalStatusName: row.MaritalStatusName.trim(),
            IsDeleted: JSON.stringify(row.IsDeleted),
            UpdatedBy: row.UpdatedBy,
        };
        this._maritalService.populateForm(m_data);
    }
}
export class MaritalStatusMaster {
    MaritalStatusId: number;
    MaritalStatusName: string;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param MaritMaritalStatusMasteralMaster
     */
    constructor(MaritalStatusMaster) {
        {
            this.MaritalStatusId = MaritalStatusMaster.MaritalStatusId || "";
            this.MaritalStatusName = MaritalStatusMaster.PrefixName || "";
            this.IsDeleted = MaritalStatusMaster.IsDeleted || "false";
            this.AddedBy = MaritalStatusMaster.AddedBy || "";
            this.UpdatedBy = MaritalStatusMaster.UpdatedBy || "";
        }
    }
}
