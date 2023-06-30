import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentMasterService } from './department-master.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DepartmentMasterComponent implements OnInit {

  DepartmentMasterList: any;
    msg: any;

    displayedColumns: string[] = [
        "DepartmentId",
        "DepartmentName",
        "AddedByName",
        "IsDeleted",
        "action",
    ];

    DSDepartmentMasterList = new MatTableDataSource<DepartmentMaster>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public _departmentService: DepartmentMasterService) {}

    ngOnInit(): void {
        this.getDepartmentMasterList();
    }
    onSearch() {
        this.getDepartmentMasterList();
    }

    onSearchClear() {
        this._departmentService.myformSearch.reset({
            DepartmentNameSearch: "",
            IsDeletedSearch: "2",
        });
    }
    getDepartmentMasterList() {
        var Param ={
            "DepartmentName":this._departmentService.myformSearch.get('DepartmentNameSearch').value + '%' || '%'
        };
        
        this._departmentService.getDepartmentMasterList(Param).subscribe((Menu) => {
            this.DSDepartmentMasterList.data = Menu as DepartmentMaster[];
            console.log(Menu);
            this.DSDepartmentMasterList.sort = this.sort;
            this.DSDepartmentMasterList.paginator = this.paginator;
        });
    }

    onClear() {
        this._departmentService.myform.reset({ IsDeleted: "false" });
        this._departmentService.initializeFormGroup();
    }

    onSubmit() {
        if (this._departmentService.myform.valid) {
            if (!this._departmentService.myform.get("DepartmentId").value) {
                var m_data = {
                    departmentMasterInsert: {
                        departmentName: this._departmentService.myform
                            .get("DepartmentName")
                            .value.trim(),
                        CreatedBy: 1,
                       
                    },
                };

                this._departmentService
                    .departmentMasterInsert(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        this.getDepartmentMasterList();
                    });
            } else {
                var m_dataUpdate = {
                    departmentMasterUpdate: {
                        departmentId:
                            this._departmentService.myform.get("DepartmentId")
                                .value,
                        departmentName: this._departmentService.myform
                            .get("DepartmentName")
                            .value.trim(),
                       
                        updatedBy: 1,
                    },
                };

                this._departmentService
                    .departmentMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        this.getDepartmentMasterList();
                    });
            }
            this.onClear();
        }
    }

    onEdit(row) {
        var m_data = {
            DepartmentId: row.DepartmentId,
            DepartmentName: row.DepartmentName.trim(),
            IsDeleted: JSON.stringify(row.IsDeleted),
            UpdatedBy: row.UpdatedBy,
        };
        this._departmentService.populateForm(m_data);
    }
}

export class DepartmentMaster {
    DepartmentId: number;
    DepartmentName: string;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param DepartmentMaster
     */
    constructor(DepartmentMaster) {
        {
            this.DepartmentId = DepartmentMaster.DepartmentId || "";
            this.DepartmentName = DepartmentMaster.DepartmentName || "";
            this.IsDeleted = DepartmentMaster.IsDeleted || "false";
            this.AddedBy = DepartmentMaster.AddedBy || "";
            this.UpdatedBy = DepartmentMaster.UpdatedBy || "";
        }
    }
}
