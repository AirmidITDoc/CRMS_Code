import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { DepartmentService } from './department.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  DepartmentMasterList: any;
  msg:any;

  displayedColumns: string[] = [
    'DepartmentId',
    'DepartmentName',
    'AddedByName',
    'IsDeleted',
    'action'
  ];

  dataSource = new MatTableDataSource<DepartmentMaster>();
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(public _departmentService: DepartmentService,
    private accountService: AuthenticationService,
    
    ) { }

  ngOnInit(): void {
    this.getDepartmentMasterList();
    
  }

  getDepartmentMasterList() {
    this._departmentService.getDepartmentMasterList().subscribe(Menu => {
      this.dataSource.data = Menu as DepartmentMaster[];
      this.dataSource.sort =this.sort;
      this.dataSource.paginator=this.paginator;
     })
  }

  onClear(){
    this._departmentService.myform.reset({IsDeleted:'false'});
    this._departmentService.initializeFormGroup();
  }

  onSubmit(){
    if (this._departmentService.myform.valid) {
      if (!this._departmentService.myform.get("DepartmentId").value) {
        var m_data = {
          departmentMasterInsert: {
            "DepartmentName": (this._departmentService.myform.get("DepartmentName").value).trim(),
            "AddedBy": this.accountService.currentUserValue.user.id ,
            "UpdatedBy": this.accountService.currentUserValue.user.id ,
            "IsDeleted": Boolean(JSON.parse(this._departmentService.myform.get("IsDeleted").value))
          }
        }
        console.log(m_data);
        this._departmentService.departmentMasterInsert(m_data).subscribe(data =>{ 
          this.msg=data;
          this.getDepartmentMasterList();
        });
       Swal.fire('Record added successfully');
      }
      else
      {
        var m_dataUpdate = {
          departmentMasterUpdate: {
            "DepartmentId": (this._departmentService.myform.get("DepartmentId").value),
            "DepartmentName": (this._departmentService.myform.get("DepartmentName").value).trim(),
            "IsDeleted": Boolean(JSON.parse(this._departmentService.myform.get("IsDeleted").value)),
            "UpdatedBy": this.accountService.currentUserValue.user.id ,
          }
        }
        console.log(m_dataUpdate);
        this._departmentService.departmentMasterUpdate(m_dataUpdate).subscribe(data =>{ 
          this.msg=data;
          this.getDepartmentMasterList();
        });
        Swal.fire('Record Updated successfully');
      }
      this.onClear();
    }
  }

  onEdit(row){
    console.log(row);
    var m_data ={"DepartmentId":row.DepartmentId,"DepartmentName":row.DepartmentName.trim(),"IsDeleted":JSON.stringify(row.IsDeleted),"UpdatedBy":row.UpdatedBy}
    this._departmentService.populateForm(m_data);
  }


}



export class DepartmentMaster {
  DepartmentId: number;
  DepartmentName: string;
  IsDeleted: boolean;
  AddedBy:number;
  UpdatedBy:number;
  AddedByName:string;

  /**
   * Constructor
   *
   * @param DepartmentMaster
   */
  constructor(DepartmentMaster) {
      {
          this.DepartmentId = DepartmentMaster.DepartmentId|| '';
          this.DepartmentName = DepartmentMaster.DepartmentName || '';
          this.IsDeleted = DepartmentMaster.IsDeleted || 'false';
          this.AddedBy = DepartmentMaster.AddedBy || '';
          this.UpdatedBy = DepartmentMaster.UpdatedBy || '';
          //this.AddedByName=DepartmentMaster.AddedByName || '';
      }
  }
}


export class DoctortypeMaster {
    
  Id:number;
  DoctorType:string;
IsDeleted:boolean;
  /**
   * Constructor
   *
   * @param DoctortypeMaster
   */
  constructor(DoctortypeMaster) {
      {
          this.Id = DoctortypeMaster.Id || '';
          this.DoctorType = DoctortypeMaster.DoctorType || '';
          this.IsDeleted = DoctortypeMaster.IsDeleted || 'false';
      }
  }
}
