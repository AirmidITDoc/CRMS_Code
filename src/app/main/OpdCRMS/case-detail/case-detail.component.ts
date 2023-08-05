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
import { StudyServicesComponent } from './study-sevices/study-services/study-services.component';
import { FileUploadComponent } from '../appointment/file-upload/file-upload.component';

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
      this.menuActions.push('Update All Study Detail');
      this.menuActions.push('Update Study Detail');
      this.menuActions.push('Update Study Schdule');
      this.menuActions.push('Study Services');
      this.menuActions.push('Upload Document');
        }


    this.getCaseList();
    this.getCasecombo();

  }

  getCasecombo() {

    this._CasedetailService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

  }


  getCaseList() {
    this.sIsLoading = 'loading-data';
    var Params = {
      "StudyId": 0,//this._CasedetailService.myFilterform.get("CaseId").value || 0,
    }
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CasedetailService.getStudyInformationList(Params).subscribe(Visit => {
        this.dataSource.data = Visit as CaseDetail[];
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';
        console.log(this.dataSource.data)
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
    }else if (m == "Update Study Detail") {
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
    }else if (m == "Update Study Schdule") {
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
    }else if (m == "Study Services") {
      console.log(contact)
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
    }
 
   
  }


  newCaseDetail() {

    const dialogRef = this._matDialog.open(NewCaseDetailComponent,
      {
        maxWidth: "85vw",
        height: '590px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getCaseList();
    });
  }



  onExport(exprtType) {
    // debugger;
    // let columnList = [];
    // if (this.dataSource.data.length == 0) {
    //   // this.toastr.error("No Data Found");
    //   Swal.fire('Error !', 'No Data Found', 'error');
    // }
    // else {
    //   var excelData = [];
    //   var a = 1;
    //   for (var i = 0; i < this.dataSource.data.length; i++) {
    //     let singleEntry = {
    //       // "Sr No":a+i,
    //       "Reg No": this.dataSource.data[i]["RegNoWithPrefix"],
    //       "PatientOldNew": this.dataSource.data[i]["PatientOldNew"] ? this.dataSource.data[i]["PatientOldNew"] : "N/A",
    //       "Patient Name": this.dataSource.data[i]["PatientName"] ? this.dataSource.data[i]["PatientName"] : "N/A",
    //       "VisitDate": this.dataSource.data[i]["DVisitDate"] ? this.dataSource.data[i]["DVisitDate"] : "N/A",
    //       "Visit Time": this.dataSource.data[i]["VisitTime"] ? this.dataSource.data[i]["VisitTime"] : "N/A",
    //       "OPDNo": this.dataSource.data[i]["OPDNo"] ? this.dataSource.data[i]["OPDNo"] : "N/A",
    //       "Doctorname": this.dataSource.data[i]["Doctorname"] ? this.dataSource.data[i]["Doctorname"] : "N/A",
    //       "RefDocName": this.dataSource.data[i]["RefDocName"] ? this.dataSource.data[i]["RefDocName"] : "N/A",
    //       "PatientType": this.dataSource.data[i]["PatientType"] ? this.dataSource.data[i]["PatientType"] : "N/A",


    //     };
    //     excelData.push(singleEntry);
    //   }
    //   var fileName = "OutDoor-Appointment-Patient-List " + new Date() + ".xlsx";
    //   if (exprtType == "Excel") {
    //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    //     var wscols = [];
    //     if (excelData.length > 0) {
    //       var columnsIn = excelData[0];
    //       for (var key in columnsIn) {
    //         let headerLength = { wch: (key.length + 1) };
    //         let columnLength = headerLength;
    //         try {
    //           columnLength = { wch: Math.max(...excelData.map(o => o[key].length), 0) + 1 };
    //         }
    //         catch {
    //           columnLength = headerLength;
    //         }
    //         if (headerLength["wch"] <= columnLength["wch"]) {
    //           wscols.push(columnLength)
    //         }
    //         else {
    //           wscols.push(headerLength)
    //         }
    //       }
    //     }
    //     ws['!cols'] = wscols;
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     XLSX.writeFile(wb, fileName);
    //   } else {
    //     let doc = new jsPDF('p', 'pt', 'a4');
    //     doc.page = 0;
    //     var col = [];
    //     for (var k in excelData[0]) col.push(k);
    //     console.log(col.length)
    //     var rows = [];
    //     excelData.forEach(obj => {
    //       console.log(obj)
    //       let arr = [];
    //       col.forEach(col => {
    //         arr.push(obj[col]);
    //       });
    //       rows.push(arr);
    //     });

    //     doc.autoTable(col, rows, {
    //       margin: { left: 5, right: 5, top: 5 },
    //       theme: "grid",
    //       styles: {
    //         fontSize: 3
    //       }
    //     });
    //     doc.setFontSize(3);
    //     // doc.save("Indoor-Patient-List.pdf");
    //     window.open(URL.createObjectURL(doc.output("blob")))
    //   }
    // }
  }

  // field validation 
  get f() { return this._CasedetailService.myFilterform.controls; }
  selectRow(row) {
    this.selectRow = row;
  }



   
}