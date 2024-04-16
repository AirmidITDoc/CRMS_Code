import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { InvoiceBillService } from '../invoice-bill.service';
import { Router } from '@angular/router';
import { AdvanceDataStored } from 'app/main/OpdCRMS/advance';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { DatePipe } from '@angular/common';
import { InvoiceBilll } from '../browse-invoice-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-studywisedeptdetail',
  templateUrl: './studywisedeptdetail.component.html',
  styleUrls: ['./studywisedeptdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudywisedeptdetailComponent implements OnInit {
  click: boolean = false;
  caseList:any=[];
  hasSelectedContacts: boolean;


  
  displayedColumns = [

    'InvoiceNumber',
    'InvoiceDate',
    'TaxableAmount',
    'TotalAmount',
    'ServiceName',
    // 'Patient Reimbursement',
    // 'Principle Investigator (DOC)',
    // 'Principle Investigator (SMO)',
    'FinalAmt',
   
    'action'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource=new MatTableDataSource<InvoiceBilll>();
  sIsLoading: string = '';
  showSpinner = false;


  constructor(private _fuseSidebarService: FuseSidebarService,
    public _InvoiceBilllsService: InvoiceBillService,
    private accountService: AuthenticationService,
    public datePipe: DatePipe,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,) { }

  ngOnInit(): void {
    this.getCasecombo();
    this.getStudytdeptdetail();

  }
  

  getCasecombo() {

    this._InvoiceBilllsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      // this.selectedcase = this.caseList[0].CaseId;

    });

  }

  getStudytdeptdetail(){
    // this.sIsLoading = 'loading';
    var D_data = {
      "StudyId ":1,// this._InvoiceBilllsService.myFilterform.get("StudyId").value.StudyId || 0,
      "InvoiceId":1//this._InvoiceBilllsService.myFilterform.get("InvoiceId").value.StudyId || 0,
    }
    setTimeout(() => {
      // this.sIsLoading = 'loading';
      this._InvoiceBilllsService.getBrowsestudydeptdetailList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as InvoiceBilll[];
        console.log(this.dataSource.data )
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.sIsLoading = this.dataSource.data.length == 0 ? 'no-data' : '';
        
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
    // this.onClear();
  }

  onShow(event: MouseEvent) {
   
  this.click = !this.click;
  setTimeout(() => {
    {
      this.sIsLoading = 'loading-data';
      this.getStudytdeptdetail();
    }
  }, 1000);
  
  this.click = true;
  
  }
  getPrint(row){

  }

  onClear(){}
}


