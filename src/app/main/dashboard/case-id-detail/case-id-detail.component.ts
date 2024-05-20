import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../../administration/administration.service';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from '../dashboard.service';
import { DashboardCaseDetails } from '../daily-dashboard/daily-dashboard.component';
import { StudywisedeptdetailComponent } from 'app/main/OpdCRMS/appointment/browse-invoice-list/studywisedeptdetail/studywisedeptdetail.component';

@Component({
  selector: 'app-case-id-detail',
  templateUrl: './case-id-detail.component.html',
  styleUrls: ['./case-id-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CaseIdDetailComponent implements OnInit {

  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  hasSelectedContacts: boolean;
  currentDate = new Date();
  subscriptions: Subscription[] = [];
  screenFromString = 'admission-form';
  printTemplate: any;
  subscriptionArr: Subscription[] = [];
  StudyId: 0;
  VisitID: any;
  selectedAdvanceObj: DashboardCaseDetails;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
    'InvoiceId',
    'InvoiceDate',
    'InvoiceAmount',
    'GSTAmount',
    'TotalAmount',
    'DistributionAmt',
    'PaymentStatus',
    'action',
  ];
  dcPatientInfo = [
    'SubjectName',
    'TotalVisits',
    'BilledVisits',
    'UnBilledVisits',
    'action',
  ];

  dataSource = new MatTableDataSource<StudyInvInformation>();
  dsStudySubjectCount = new MatTableDataSource<StudyInvInformation>();
  dsStudyPatientInfo = new MatTableDataSource<StudyPatientInformation>();
  menuActions: Array<string> = [];

  constructor(
    public _CasedetailService: DashboardService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
  ) {
  }
  vTitle: any;
  ngOnInit(): void {
    if (this.data) {
      // console.log(this.data);
      this.StudyId = this.data.element.StudyId;
      this.vTitle = this.data.element.Title;
      this.selectedAdvanceObj = this.data.element;
      console.log(this.selectedAdvanceObj);
      console.log(this.selectedAdvanceObj.Title);
    }
    this.getDash_StudyInvoiceInformation();
    this.getDash_StudySubjectCount();
    this.getDash_PatientVisitInfo();
  }

  getDash_StudyInvoiceInformation() {
    this.sIsLoading = 'loading';
    var D_data = {
      "StudyId": this.StudyId,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._CasedetailService.getDash_StudyInvoiceInformation(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as StudyInvInformation[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = this.dataSource.data.length == 0 ? 'no-data' : '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }
  onClose() {
    this._matDialog.closeAll();
  }

  getDash_StudySubjectCount() {
    this.sIsLoading = 'loading';
    var D_data = {
      "StudyId": this.StudyId,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._CasedetailService.getDash_StudySubjectCount(D_data).subscribe(Visit => {
        this.dsStudySubjectCount.data = Visit as StudyInvInformation[];
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }

  getDash_PatientVisitInfo() {
    this.sIsLoading = 'loading';
    var D_data = {
      "StudyId": this.StudyId,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._CasedetailService.getDash_PatientVisitInfo(D_data).subscribe(Visit => {
        this.dsStudyPatientInfo.data = Visit as StudyPatientInformation[];
        this.sIsLoading = this.dsStudyPatientInfo.data.length == 0 ? 'no-data' : '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }

  getStudyDistributionInformation(contact) {
    const dialogRef = this._matDialog.open(StudywisedeptdetailComponent,
      {
        maxWidth: "75vw",
        height: '600px',
        width: '100%',
        data: {
          registerObj: contact
        }
      });
  }
}

export class StudyInvInformation {
  StudyId: any;
  InvoiceId: any;
  InvoiceDate: any;
  InvoiceAmount: any;
  CGSTAmount: any;
  SGSTAmount: any;
  IGSTAmount: any;
  TotalTaxAmount: any;
  TotalAmount: any;
  DistributionAmt: any;
  PaymentStatus: any;
  TotalSubjects: any;
  ExpectedVisits: any;
  ActualVisits: any;
  BilledVisits: any;
  UnBilledVisits: any;


  /**
   * Constructor
   *
   * @param StudyInvInformation
   */

  constructor(StudyInvInformation) {
    {
      this.StudyId = StudyInvInformation.StudyId || '';
      this.InvoiceId = StudyInvInformation.InvoiceId || '';
      this.InvoiceDate = StudyInvInformation.InvoiceDate || '';
      this.InvoiceAmount = StudyInvInformation.InvoiceAmount || 0;
      this.CGSTAmount = StudyInvInformation.CGSTAmount || '';
      this.SGSTAmount = StudyInvInformation.SGSTAmount || '';
      this.IGSTAmount = StudyInvInformation.IGSTAmount;
      this.TotalTaxAmount = StudyInvInformation.TotalTaxAmount;
      this.TotalAmount = StudyInvInformation.TotalAmount || '';
      this.DistributionAmt = StudyInvInformation.DistributionAmt || '';
      this.PaymentStatus = StudyInvInformation.PaymentStatus || '';

      this.TotalSubjects = StudyInvInformation.TotalSubjects || '';
      this.ExpectedVisits = StudyInvInformation.ExpectedVisits || '';
      this.ActualVisits = StudyInvInformation.ActualVisits || '';
      this.BilledVisits = StudyInvInformation.BilledVisits || '';
      this.UnBilledVisits = StudyInvInformation.UnBilledVisits || '';

    }
  }

}

export class StudyPatientInformation {
  StudyId: any;
  RegId: any;
  SubjectName: any;
  TotalVisits: any;
  BilledVisits: any;
  UnBilledVisits: any;

  /**
   * Constructor
   *
   * @param StudyPatientInformation
   */

  constructor(StudyPatientInformation) {
    {
      this.StudyId = StudyPatientInformation.StudyId || '';
      this.RegId = StudyPatientInformation.RegId || '';
      this.SubjectName = StudyPatientInformation.SubjectName || '';
      this.TotalVisits = StudyPatientInformation.TotalAmount || 0;
      this.BilledVisits = StudyPatientInformation.BilledVisits || '';
      this.UnBilledVisits = StudyPatientInformation.UnBilledVisits || '';
    }
  }

}

