import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { GroupMasterService } from "./group-master.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-group-master",
    templateUrl: "./group-master.component.html",
    styleUrls: ["./group-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GroupMasterComponent implements OnInit {
    GroupMasterList: any;
    submitted = false;
    msg: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        "GroupId",
        "GroupName",
        "IsConsolidated",
        "IsConsolidatedDR",
        // "PrintSeqNo",
        // "AddedByName",
        "IsActive",
        "action",
    ];

    DSGroupMasterList = new MatTableDataSource<GroupMaster>();

    constructor(public _groupService: GroupMasterService) { }

    ngOnInit(): void {
        this.getGroupMasterList();
    }
    onSearch() {
        this.getGroupMasterList();
    }

    onSearchClear() {
        this._groupService.myformSearch.reset({
            GroupNameSearch: "",
            IsDeletedSearch: "2",
        });
    }
    get f() {
        return this._groupService.myform.controls;
    }

    getGroupMasterList() {
        var param = {
            GroupName: this._groupService.myformSearch.get('GroupNameSearch').value + "%" || "%",
            IsActive: this._groupService.myformSearch.get('IsDeletedSearch').value || 0
        };
        this._groupService.getGroupMasterList(param).subscribe((Menu) => {
            this.DSGroupMasterList.data = Menu as GroupMaster[];
            this.DSGroupMasterList.sort = this.sort;
            this.DSGroupMasterList.paginator = this.paginator;
        });
    }

    onClear() {
        this._groupService.myform.reset({ IsActive: "false" });
        this._groupService.myform.reset({ Isconsolidated: "true" });
        this._groupService.myform.reset({ IsConsolidatedDR: "false" });
        this._groupService.initializeFormGroup();
    }

    deleteTableRow(element) {
        let Query = "Update  GroupMaster set IsActive=0 where  GroupId=" + element.GroupId + " ";
        console.log(Query)
          this._groupService.getdeletemember(Query).subscribe(data => {
           if(data)
           Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');
    
          });
      }
    
    onSubmit() {
        if (this._groupService.myform.valid) {
            if (!this._groupService.myform.get("GroupId").value) {
                var m_data = {
                    groupMasterInsert: {
                        groupName: this._groupService.myform
                            .get("GroupName")
                            .value.trim(),
                        isconsolidated: this._groupService.myform.get("IsConsolidated").value || true,
                        isConsolidatedDR: this._groupService.myform.get("IsConsolidatedDR").value || false,

                        IsActive: this._groupService.myform.get("IsActive").value || false
                           },
                };
                console.log(m_data)
                this._groupService
                    .groupMasterInsert(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getGroupMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not saved",
                                "error"
                            );
                        }
                        this.getGroupMasterList();
                    });
            } else {
                debugger
                var m_dataUpdate = {
                    groupMasterUpdate: {
                        groupId: this._groupService.myform.get("GroupId").value,
                        groupName: this._groupService.myform.get("GroupName").value.trim() || '',
                        isconsolidated: this._groupService.myform.get("IsConsolidated").value || 'true',
                        isConsolidatedDR: this._groupService.myform.get("IsConsolidatedDR").value || 'true',
                        IsActive: this._groupService.myform.get("IsActive").value || false
                           
                    },
                };
                console.log(m_dataUpdate)
                this._groupService
                    .groupMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getGroupMasterList();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                        this.getGroupMasterList();
                    });
            }
            this.onClear();
        }
    }
    onEdit(row) {
        var m_data = {
            GroupId: row.GroupId,
            GroupName: row.GroupName.trim(),
            IsConsolidated: JSON.stringify(row.IsConsolidated),
            IsConsolidatedDR: JSON.stringify(row.IsConsolidatedDR),
            PrintSeqNo: row.PrintSeqNo,
            IsActive: JSON.stringify(row.IsActive),
            UpdatedBy: row.UpdatedBy,
        };
        this._groupService.populateForm(m_data);
    }
}

export class GroupMaster {
    GroupId: number;
    GroupName: string;
    IsConsolidated: boolean;
    IsConsolidatedDR: boolean;
    PrintSeqNo: Number;
    IsActive: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param GroupMaster
     */
    constructor(GroupMaster) {
        {
            this.GroupId = GroupMaster.GroupId || "";
            this.GroupName = GroupMaster.GroupName || "";
            this.IsConsolidated = GroupMaster.IsConsolidated || "false";
            this.IsConsolidatedDR = GroupMaster.IsConsolidatedDR || "false";
            this.PrintSeqNo = GroupMaster.PrintSeqNo || "";
            this.IsActive = GroupMaster.IsActive || "false";
            this.AddedBy = GroupMaster.AddedBy || "";
            this.UpdatedBy = GroupMaster.UpdatedBy || "";
            this.AddedByName = GroupMaster.AddedByName || "";
        }
    }
}
