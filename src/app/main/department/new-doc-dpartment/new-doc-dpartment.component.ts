import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { DoctortypeMaster } from '../department.component';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-doc-dpartment',
  templateUrl: './new-doc-dpartment.component.html',
  styleUrls: ['./new-doc-dpartment.component.scss']
})
export class NewDocDpartmentComponent implements OnInit {

 
  isLoading = true;
  msg:any;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  displayedColumns: string[] = [
    'Id',
    'DoctorType',
    'IsDeleted',
    'action'
  ];

  dataSource = new MatTableDataSource<DoctortypeMaster>();
  
  constructor(public _doctortypeService: DepartmentService,
    private accountService: AuthenticationService,
    
    ) { }

  ngOnInit(): void {
    this.getDoctortypeMasterList();
    
  }

  getDoctortypeMasterList() {
    this._doctortypeService.getDoctortypeMasterList().subscribe(Menu => {
      this.dataSource.data = Menu as DoctortypeMaster[];
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  onClear(){
    this._doctortypeService.myform.reset({IsDeleted:'false'});
    this._doctortypeService.initializeFormGroup();
  }
 
  onSubmit(){
    if (this._doctortypeService.myform.valid) {
      if (!this._doctortypeService.myform.get("Id").value) {
        var m_data = {
          doctortTypeMasterInsert: {
            "DocDeptId": (this._doctortypeService.myform.get("DocDeptId").value).trim() || 0,
            "DoctorId": (this._doctortypeService.myform.get("DoctorId").value).trim() || 0,
            "DepartmentId": (this._doctortypeService.myform.get("DepartmentId").value).trim() || 0,
           
           
            // "IsDeleted": Boolean(JSON.parse(this._doctortypeService.myform.get("IsDeleted").value)),
             }
        }
        // console.log(m_data);
        this._doctortypeService.doctortTypeMasterInsert(m_data).subscribe(data =>{ this.msg=data;
          this.getDoctortypeMasterList();
        });
        Swal.fire('Record added successfully')
      }
      else {
        var m_dataUpdate = {
          doctorTypeMasterUpdate: {
            "DocDeptId": (this._doctortypeService.myform.get("DocDeptId").value).trim() || 0,
            "DoctorId": (this._doctortypeService.myform.get("DoctorId").value).trim() || 0,
            "DepartmentId": (this._doctortypeService.myform.get("DepartmentId").value).trim() || 0,
           
          }
        }
        this._doctortypeService.doctorTypeMasterUpdate(m_dataUpdate).subscribe(data =>{ this.msg=data;
          this.getDoctortypeMasterList();
        });
        Swal.fire('Record updated successfully')
      }
      this.onClear();
    }
  }
  onEdit(row) {
    var m_data ={"Id":row.Id,"DoctorType":row.DoctorType.trim(),"IsDeleted":JSON.stringify(row.IsDeleted)}
    this._doctortypeService.populateForm(m_data);
  } 


}

