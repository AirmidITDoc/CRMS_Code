import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RelationShipMasterService } from './relation-ship-master.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-relation-ship-master',
  templateUrl: './relation-ship-master.component.html',
  styleUrls: ['./relation-ship-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RelationShipMasterComponent implements OnInit {

    RelationshipMasterList: any;
    msg: any;

    displayedColumns: string[] = [
        "RelationshipId",
        "RelationshipName",
        "IsDeleted",
        "AddedByName",
        "action",
    ];

    DSRelationshipMasterList = new MatTableDataSource<RelationshipMaster>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public _relationshipService: RelationShipMasterService) {}
    onSearch() {
        this.getrelationshipMasterList();
    }

    onSearchClear() {
        this._relationshipService.myformSearch.reset({
            RelationshipNameSearch: "",
            IsDeletedSearch: "2",
        });
    }

    ngOnInit(): void {
        this.getrelationshipMasterList();
    }

    getrelationshipMasterList() {
        var m_data = {
            RelativeName: "%",
        };

        this._relationshipService
            .getrelationshipMasterList(m_data)
            .subscribe((Menu) => {
                this.DSRelationshipMasterList.data =
                    Menu as RelationshipMaster[];
                this.DSRelationshipMasterList.sort = this.sort;
                this.DSRelationshipMasterList.paginator = this.paginator;
            });
    }

    onClear() {
        this._relationshipService.myform.reset({ IsDeleted: "false" });
        this._relationshipService.initializeFormGroup();
    }

    onSubmit() {
        if (this._relationshipService.myform.valid) {
            if (!this._relationshipService.myform.get("RelationshipId").value) {
                var m_data = {
                    relationshipMasterInsert: {
                        relationshipName_1: this._relationshipService.myform
                            .get("RelationshipName")
                            .value.trim(),
                        addedBy: 10,
                        isDeleted_2: Boolean(
                            JSON.parse(
                                this._relationshipService.myform.get(
                                    "IsDeleted"
                                ).value
                            )
                        ),
                    },
                };
                console.log(m_data);
                this._relationshipService
                    .relationshipMasterInsert(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getrelationshipMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not saved",
                                "error"
                            );
                        }
                        this.getrelationshipMasterList();
                    });
            } else {
                var m_dataUpdate = {
                    relationshipMasterUpdate: {
                        relationshipId:
                            this._relationshipService.myform.get(
                                "RelationshipId"
                            ).value,
                        relationshipName: this._relationshipService.myform
                            .get("RelationshipName")
                            .value.trim(),
                        isDeleted: Boolean(
                            JSON.parse(
                                this._relationshipService.myform.get(
                                    "IsDeleted"
                                ).value
                            )
                        ),
                        updatedBy: 10,
                    },
                };
                console.log(m_dataUpdate);
                this._relationshipService
                    .relationshipMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getrelationshipMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                        this.getrelationshipMasterList();
                    });
            }
            this.onClear();
        }
    }

    onEdit(row) {
        console.log(row);
        var m_data = {
            RelationshipId: row.RelationshipId,
            RelationshipName: row.RelationshipName.trim(),
            IsDeleted: JSON.stringify(row.IsDeleted),
            UpdatedBy: row.UpdatedBy,
        };
        this._relationshipService.populateForm(m_data);
    }
}



export class RelationshipMaster {
    RelationshipId: number;
    RelationshipName: string;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param RelationshipMaster
     */
    constructor(RelationshipMaster) {
        {
            this.RelationshipId = RelationshipMaster.RelationshipId || "";
            this.RelationshipName = RelationshipMaster.RelationshipName || "";
            this.IsDeleted = RelationshipMaster.IsDeleted || "false";
            this.AddedBy = RelationshipMaster.AddedBy || "";
            this.UpdatedBy = RelationshipMaster.UpdatedBy || "";
        }
    }
}
