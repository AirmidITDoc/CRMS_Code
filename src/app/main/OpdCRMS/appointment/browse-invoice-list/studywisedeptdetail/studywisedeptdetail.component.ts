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
  caseList: any = [];
  hasSelectedContacts: boolean;
  displayedColumns = [
    // 'InvoiceNumber',
    // 'InvoiceDate',
    // 'TaxableAmount',
    'ServiceName',
    'TotalAmount',
    'HospCharges',
    'FinalAmt',
    'Percentage',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<InvoiceBilll>();
  sIsLoading: string = '';
  showSpinner = false;
  PatientHeaderObj: any;
  vInvoiceId: any;
  vStudyId: any;

  constructor(private _fuseSidebarService: FuseSidebarService,
    public _InvoiceBilllsService: InvoiceBillService,
    private accountService: AuthenticationService,
    public datePipe: DatePipe,
    // private reportDownloadService: ExcelDownloadService,
    private _ActRoute: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,) { }

  ngOnInit(): void {
    this.getCasecombo();
    if (this.data) {
      this.PatientHeaderObj = this.data.registerObj;
      this.vStudyId = this.PatientHeaderObj.StudyId;
      this.vInvoiceId = this.PatientHeaderObj.InvoiceId;
      console.log(this.PatientHeaderObj);
    }
    this.getStudytdeptdetail();
  }

  getCasecombo() {
    this._InvoiceBilllsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
    });
  }

  exportStusywisedeptdetailReportExcel() {
    // this.sIsLoading == 'loading-data'
    // let exportHeaders = ['InvoiceNumber', 'InvoiceDate', 'TaxableAmount', 'ServiceName', 'FinalAmt','Percentage'];
    // this.reportDownloadService.getExportJsonData(this.dataSource.data, exportHeaders, 'StudyDeptWise');
    // this.dataSource.data=[];
    // this.sIsLoading = '';
  }


  getStudytdeptdetail() {
    var D_data = {
      "StudyId ": this.vStudyId || 0,
      "InvoiceId": this.vInvoiceId || 0,
    }
    setTimeout(() => {
      // this.sIsLoading = 'loading';
      this._InvoiceBilllsService.getBrowsestudydeptdetailList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as InvoiceBilll[];
        console.log(this.dataSource.data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.sIsLoading = this.dataSource.data.length == 0 ? 'no-data' : '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }

  onClose() {
    this._matDialog.closeAll();
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
  getPrint(row) {

  }

  onClear() { }
}


