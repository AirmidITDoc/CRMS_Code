import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from '../../appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { VisitMaster } from '../../appointment.component';
import { GeturlService } from './geturl.service';
import { fuseAnimations } from '@fuse/animations';
import { ApiMaster } from '../patient-screen-bill-detail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-new-apiintergrate',
  templateUrl: './new-apiintergrate.component.html',
  styleUrls: ['./new-apiintergrate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewAPIIntergrateComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;
  sIsLoading:any;
  
  constructor(public _GeturlService: GeturlService,
    public _AppointmentService: AppointmentService,) { }

  
  

  displayedColumns1 = [
    'Date',
    'VisitId',
    'MRNo',
    'FirstName',
    // 'MiddleName',
    'LastName',
    'Address',
    'ContactNo',
    'DateofBirth',
    'AgeYear',
    'Gender',
    'action',
  ];
  dataSource1 = new MatTableDataSource<ApiMaster>();

  displayedColumns2 = [
    'date',
    'VisitId',
    'MRNo',
    'BillId',
    'BillNo',
    'TotalBillAmount',
    'action',
  ];
  dataSource2 = new MatTableDataSource<ApiMaster>();



  displayedColumns3 = [
    
    'VisitId',
    'MRNo',
    'BillId',
    'Servicename',
    'TotalAmount',
    
    'action',
  ];
  dataSource3 = new MatTableDataSource<ApiMaster>();


  ngOnInit(): void {
  }


   
  getApiVisitList(){

        var D_data = {
        "RegId": 111023

    };
    setTimeout(() => {
      
      this._GeturlService.getVisitData().subscribe(Visit => {
        this.dataSource1.data = Visit as ApiMaster[];
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      console.log(Visit)
      },
        error => {
          
        });
    }, 1000);
  }

  getApiBillList(){
    this.sIsLoading = 'loading-data';
    var D_data = {
        // "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._GeturlService.getBillData().subscribe(Visit => {
        this.dataSource2.data = Visit as ApiMaster[];
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
        this.sIsLoading = '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }


  getApiBilldetail(){
    this.sIsLoading = 'loading-data';
    var D_data = {
        // "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._GeturlService.getBillDetData().subscribe(Visit => {
        this.dataSource3.data = Visit as ApiMaster[];
        this.dataSource3.sort = this.sort;
        this.dataSource3.paginator = this.paginator;
        this.sIsLoading = '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }
}
