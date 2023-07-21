import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StudyServicesComponent, StudyServicesDetail } from './study-services/study-services.component';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudyServicesService } from './study-services.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-study-sevices',
  templateUrl: './study-sevices.component.html',
  styleUrls: ['./study-sevices.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudySevicesComponent implements OnInit {

 
  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  hasSelectedContacts: boolean;
  currentDate=new Date();
  subscriptions: Subscription[] = [];
  
  printTemplate: any;
  
  subscriptionArr: Subscription[] = [];

  VisitID:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
    'StudyId',
    'ProtocolNo',
    'ProtocolTitle',
    'StudyProduct',
    'ServiceId',
    'ServiceName',
    'Price',
    'CreatedBy',
  
    'action',
  ];


  dataSource = new MatTableDataSource<StudyServicesDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _StudyServicesService: StudyServicesService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    // private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    this.getStudyserviceList();
  }

  ngOnInit(): void {

  
    // this.getStudyserviceList();
    }

 
  getStudyserviceList() {
    this.sIsLoading = 'loading-data';
    var Params = {
      "StudyId": 1//this._StudyServicesService.myFilterform.get("StudyId").value || 0,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._StudyServicesService.getStudyserviceList(Params).subscribe(Visit => {
        this.dataSource.data = Visit as StudyServicesDetail[];
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';
        
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
    this._StudyServicesService.myFilterform.reset(
      {
        start: [],
        end: []
      }
    );
  }

 
  
  getRecord(contact): void {
    debugger;
    console.log(contact);

   
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
      "operation":"UPDATE"
      }
      this._StudyServicesService.populateFormpersonal(m_data);

      const dialogRef = this._matDialog.open(StudyServicesComponent,
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
        this.getStudyserviceList();
      });

      error => {
        this.sIsLoading = '';

      }
    
       
  }


  newStudyService() {

    const dialogRef = this._matDialog.open(StudyServicesComponent,
      {
        maxWidth: "85vw",
          height: '590px',
          width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getStudyserviceList();
    });
  }
}