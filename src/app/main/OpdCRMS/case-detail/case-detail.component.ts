import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CaseDetail, NewCaseDetailComponent } from './new-case-detail/new-case-detail.component';
import { ViewCasedetailComponent } from './view-casedetail/view-casedetail.component';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CasedetailService } from './casedetail.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { EditCasedetailComponent } from './edit-casedetail/edit-casedetail.component';
import { CaseIdDetailComponent } from 'app/main/dashboard/case-id-detail/case-id-detail.component';
import { StudyDetailComponent } from './study-detail/study-detail.component';
import { StudySchduleComponent } from './study-schdule/study-schdule.component';
import { UploadDocumentComponent } from '../appointment/upload-document/upload-document.component';
import { FileUploadComponent } from '../appointment/file-upload/file-upload.component';
import { StudyServicesComponent } from './study-sevices/study-services.component';
import { StudyDistributionComponent } from './study-distribution/study-distribution.component';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CaseDetailComponent implements OnInit {

  selectedcase: any;
  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  hasSelectedContacts: boolean;
  currentDate=new Date();
  subscriptions: Subscription[] = [];
  caseList: any = [];
  printTemplate: any;
  
  subscriptionArr: Subscription[] = [];

  VisitID:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
    // 'StudyId',
    'ProtocolNo',
    'ProtocolTitle',
    'StudyProduct',
    'TotalSubjects',
    'TotalVisits',
    'VisitFrequency',
    'Sponser',
    'Investigator',
    'Institution',
    'StudyStartDate',
    'StudyEndDate',
    'StudyPrefix',
    'StudyNumber',
    'buttons',
  ];


  dataSource = new MatTableDataSource<CaseDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _CasedetailService: CasedetailService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    // private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    this.getCaseList();
  }

  ngOnInit(): void {

    if (this._ActRoute.url == '/opd/registration') {
      // this.menuActions.push('Update All Study Detail');
      this.menuActions.push('Update Study Information');
      this.menuActions.push('Add / Update Study Schedule');
      this.menuActions.push('Add / Update Study Services');
      this.menuActions.push('Upload Document');
      this.menuActions.push('Study Distribution');
     
        }
    // this.getCaseList();
    this.getCasecombo();
  }

  getCasecombo() {

    this._CasedetailService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

  }


  getCaseList() {
    this.sIsLoading = 'loading';
    var Params = {
      "StudyId": this._CasedetailService.myFilterform.get("CaseId").value.StudyId || 0,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._CasedetailService.getStudyInformationList(Params).subscribe(Visit => {
        this.dataSource.data = Visit as CaseDetail[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = this.dataSource.data.length == 0 ? 'no-data' : '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }

  // toggle sidebar
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  onClear() {
    this._CasedetailService.myFilterform.reset(
      {
        start: [],
        end: []
      }
    );
  }

 
  
  getRecord(contact, m): void {
    if (m == "Update All Study Detail") {
      var m_data = {
      StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);

      const dialogRef = this._matDialog.open(NewCaseDetailComponent,
        {
          maxWidth: "85vw",
          height: '590px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getCaseList();
      });

      error => {
        this.sIsLoading = '';

      }
    }else if (m == "Update Study Information") {
      var m_data = {
      StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);

      const dialogRef = this._matDialog.open(StudyDetailComponent,
        {
          maxWidth: "85vw",
          height: '590px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getCaseList();
      });

      error => {
        this.sIsLoading = '';

      }
    }else if (m == "Add / Update Study Schedule") {
      var m_data = {
        StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);

      const dialogRef = this._matDialog.open(StudySchduleComponent,
        {
          maxWidth: "90%",
          height: '700px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getCaseList();
      });

      error => {
        this.sIsLoading = '';

      }
    }else if (m == "Upload Document") {
      var m_data = {
        StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);

      // const dialogRef = this._matDialog.open(FileUploadComponent,
      //   {
      //     maxWidth: "25vw",
      //     height: '240px',
      //     width: '100%',
      //     data: {
      //       registerObj: m_data,
      //     }
      //   });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed - Insert Action', result);
      //   this.getCaseList();
      // });

      error => {
        this.sIsLoading = '';

      }
    }else if (m == "Add / Update Study Services") {
      var m_data = {
      StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);
      const dialogRef = this._matDialog.open(StudyServicesComponent,
        {
          maxWidth: "90%",
          height: '700px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getCaseList();
      });

      error => {
        this.sIsLoading = '';

      }
    }else if (m == "Study Distribution") {
      var m_data = {
      StudyId:contact.StudyId,
      ProtocolNo:contact.ProtocolNo,
      ProtocolTitle:contact.ProtocolTitle,
      StudyProduct: contact.StudyProduct,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      StudyStartDate: contact.StudyStartDate,
      StudyEndDate:contact.StudyEndDate,
      Sponser: contact.Sponser,
      Investigator:contact.Investigator,
      Institution: contact.Institution,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,
      StudyPrefix:contact.StudyPrefix,
      StudyNumber:contact.StudyNumber,
      "operation":"UPDATE"
      }
      this._CasedetailService.populateFormpersonal(m_data);
      const dialogRef = this._matDialog.open(StudyDistributionComponent,
        {
          maxWidth: "60%",
          height: '500px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getCaseList();
      });

      error => {
        this.sIsLoading = '';

      }
    }
  }


  newCaseDetail() {
    const dialogRef = this._matDialog.open(NewCaseDetailComponent,
      {
        maxWidth: "85vw",
        height: '530px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getCaseList();
    });
  }


  // field validation 
  get f() { return this._CasedetailService.myFilterform.controls; }
  selectRow(row) {
    this.selectRow = row;
  }



   
}