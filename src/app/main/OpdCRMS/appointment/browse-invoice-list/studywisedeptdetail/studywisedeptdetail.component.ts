import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { InvoiceBillService } from '../invoice-bill.service';
import { Router } from '@angular/router';
import { AdvanceDataStored } from 'app/main/OpdCRMS/advance';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  PatientHeaderObj:any;
  vInvoiceId:any;
  vStudyId:any;

  constructor(private _fuseSidebarService: FuseSidebarService,
    public _InvoiceBilllsService: InvoiceBillService,
    private accountService: AuthenticationService,
    public datePipe: DatePipe,
    private _ActRoute: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,) { }
 
  ngOnInit(): void {
    this.getCasecombo();
  
    if (this.data) {
      debugger
      this.PatientHeaderObj = this.data.registerObj;
      console.log(this.PatientHeaderObj);
      this.vStudyId= this.PatientHeaderObj.CaseId;
      this.vInvoiceId = this.PatientHeaderObj.InvoiceId;
    }
    this.getStudytdeptdetail();
  }
  

  getCasecombo() {

    this._InvoiceBilllsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      // this.selectedcase = this.caseList[0].CaseId;

    });

  }

  getStudytdeptdetail(){
   debugger
    var D_data = {
      "StudyId ":this.vStudyId || 0,
      "InvoiceId":this.vInvoiceId || 0,
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


