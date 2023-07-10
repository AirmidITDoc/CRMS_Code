import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CaseDetail } from '../OpdCRMS/case-detail/edit-casedetail/edit-casedetail.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommitteMeetingService } from './committe-meeting.service';
import { DatePipe } from '@angular/common';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { CommitteeMasterMemberComponent } from './committee-master-member/committee-master-member.component';
import { NewCommitteeMeetingComponent } from './new-committee-meeting/new-committee-meeting.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-committee-meeting',
  templateUrl: './committee-meeting.component.html',
  styleUrls: ['./committee-meeting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CommitteeMeetingComponent implements OnInit {

  
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
  screenFromString = 'admission-form';

  displayedColumns = [
    'CommitteeMeetingId',
    'CommitteeMeetingDate',
    'CommiteeMeetingName',
    'CommitteeMeetingLocation',
    'CommitteeMeetingAmount',
    'CreatedBy',
    
    'action'

  ];
  dataSource = new MatTableDataSource<CommmitteeDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _CasedetailService: CommitteMeetingService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    // private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    // this.getCommitteeList();
  }

  ngOnInit(): void {


    this.getCommitteeList();
    

  }

  

  getCommitteeList() {
    this.sIsLoading = 'loading-data';
   
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CasedetailService.getCommitteeList().subscribe(Visit => {
        this.dataSource.data = Visit as CommmitteeDetail[];
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

 
//   onEdit(contact){
//     console.log(contact)

//     console.log(" This is for Update Case Detail pop : " + contact);
//     let xx = {
    
//       CaseId:contact.CaseId,
//       CaseTitle:contact.CaseTitle,
//       CaseDescription: contact.CaseDescription,
//       TotalSubjects:contact.TotalSubjects,
//       TotalVisits:contact.TotalVisits,
//       VisitFrequency:contact.VisitFrequency,
//       CaseStartDate: contact.CaseStartDate,
//       CaseEndDate:contact.CaseEndDate,
//       CaseStatus: contact.CaseStatus,
//       CompanyName:contact.CompanyName,
//       CaseRepresentative: contact.CaseRepresentative,
//       HospitalRepresentative: contact.HospitalRepresentative,
//       AgreementFileName: contact.AgreementFileName,

//     };
//     // this.advanceDataStored.storage = new CaseDetail(xx);
//     // this._CasedetailService.populateFormpersonal(xx);
  
// console.log(xx);
//     // this._ActRoute.navigate(['/opd/registration']);
//     const dialogRef = this._matDialog.open(EditCasedetailComponent,
//       {
//         maxWidth: "75vw",
//         height: '580px',
//         width: '100%',
//         data : {
//           registerObj : xx,
//         }
//       });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed - Insert Action', result);
//        this.getCaseList();
//     });
//   }


newMember() {

    const dialogRef = this._matDialog.open(AddMemberComponent,
      {
        maxWidth: "75vw",
        height: '400px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      // this.getCommitteeList();
    });
  }

  newCommitteeMember() {

    const dialogRef = this._matDialog.open(CommitteeMasterMemberComponent,
      {
        maxWidth: "75vw",
        height: '560px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getCommitteeList();
    });
  }


  newcommitteemeeting() {

    const dialogRef = this._matDialog.open(NewCommitteeMeetingComponent,
      {
        maxWidth: "75vw",
        height: '560px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getCommitteeList();
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


export class CommmitteeDetail {
  CommitteeMeetingId:any;
  CommitteeMeetingDate:any;
  CommiteeMeetingName:any;
  CreatedBy: any;
  CommitteeMeetingLocation: any;
 
  /**
   * Constructor
   *
   * @param CommmitteeDetail
   */

  constructor(CommmitteeDetail) {
    {
      this.CommitteeMeetingId = CommmitteeDetail.CommitteeMeetingId || '';
      this.CommitteeMeetingDate = CommmitteeDetail.CommitteeMeetingDate || '';
      this.CommiteeMeetingName = CommmitteeDetail.CommiteeMeetingName || '';
      this.CommitteeMeetingLocation = CommmitteeDetail.CommitteeMeetingLocation || '';
      this.CreatedBy = CommmitteeDetail.CreatedBy || 0;
  
    }
  }
}