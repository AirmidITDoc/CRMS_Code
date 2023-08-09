import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommitteeMemberService } from './committee-member.service';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {  NewCommitteeMemberComponent } from './new-committee-member/new-committee-member.component';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-committee-member',
  templateUrl: './committee-member.component.html',
  styleUrls: ['./committee-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CommitteeMemberComponent implements OnInit {

    
  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  currentDate=new Date();
  subscriptions: Subscription[] = [];
  chargeslist: any = [];
  printTemplate: any;
  hasSelectedContacts: boolean;
  subscriptionArr: Subscription[] = [];

  VisitID:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;
  screenFromString = 'admission-form';
  
  displayedColumns = [
    'CommitteeId',
    'CommiteeName',
    'MemberId',
    'MemberName',
    'Member_Address',
    'CityId',
    'MobileNo',
    'EmailId',
    'StudyAmount',
    'MeetingStatus',
    // 'IsActive',
    // 'CreatedBy',
    'action'
  ];
   dataSource = new MatTableDataSource<CommitteeMemberDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _CasedetailService: CommitteeMemberService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    public _matDialog: MatDialog,
    // public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    // this.getCommitteeList();
  }

  ngOnInit(): void {
    this.getCommitteeMemberList();
  }

  getCommitteeMemberList() {
    
    setTimeout(() => {
      this.sIsLoading = 'loading-data';

      var m = {
        CommitteeId: this._CasedetailService.myFilterform.get('CommitteeId').value || 0
      };

      this._CasedetailService.getCommitteeMemberMeetingList(m).subscribe(Visit => {
        this. dataSource.data = Visit as CommitteeMemberDetail[];
        this. chargeslist = Visit as CommitteeMemberDetail[];
        this. dataSource.sort = this.sort;
        this. dataSource.paginator = this.paginator;
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
    // this._CasedetailService.myFilterform.reset(
    //   {
    //     start: [],
    //     end: []
    //   }
    // );
  }


// newMember() {
//     const dialogRef = this._matDialog.open(AddMemberComponent,
//       {
//         maxWidth: "75vw",
//         height: '300px',
//         width: '100%',
//       });
//     dialogRef.afterClosed().subscribe(result => {
//       // console.log('The dialog was closed - Insert Action', result);
//       // this.getCommitteeList();
//     });
//   }

  newCommitteeMember() {
    const dialogRef = this._matDialog.open(NewCommitteeMemberComponent,
      {
        maxWidth: "50vw",
        height: '720px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getCommitteeMemberList();
    });
  }


  // newcommitteemeeting() {
  //   const dialogRef = this._matDialog.open(NewCommitteeMeetingComponent,
  //     {
  //       maxWidth: "80vw",
  //       height: '660px',
  //       width: '100%',
        
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed - Insert Action', result);
  //     this.getCommitteeList();
  //   });
  // }



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


  deleteTableRow(element) {
    let Query = "Update  M_CompanyDetails set IsActive=0 where  CommitteeId=" + element.CommitteeId + " ";
    console.log(Query)
      this._CasedetailService.getdeletemember(Query).subscribe(data => {
       if(data)
       Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');

      });
  }

   
  onEdit(row) {
   
    var m_data = {
      CommitteeId: row.CommitteeId,
      CommiteeName: row.CommiteeName
         
    };
    console.log(m_data);
  
    this._CasedetailService.populateForm(m_data);

     const dialogRef = this._matDialog.open(NewCommitteeMemberComponent,
        {
          maxWidth: "50vw",
          height: '730px',
          width: '100%',
           data : {
          registerObj : m_data,
        }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed - Insert Action", result);
      this.getCommitteeMemberList();
    });
  }
}


export class CommitteeMemberDetail {
  CommitteeId:any;
  CommiteeName:any;
  
  StudyId:any;
  MemberId:any;
  MemberName:any;
  Member_Address: any;
  CityId: any;
  PinCode: any;
  MobileNo: any;
  EmailId: any;
  StudyAmount: any;
  MemberMeetingStatus:any;
  /**
   * Constructor
   *
   * @param CommitteeMemberDetail
   */

  constructor(CommitteeMemberDetail) {
    {

      this.CommitteeId = CommitteeMemberDetail.CommitteeId || 0;
      this.CommiteeName = CommitteeMemberDetail.CommiteeName || '';
   
      this.StudyId = CommitteeMemberDetail.StudyId || 0;
      this.MemberId = CommitteeMemberDetail.MemberId || '';
      this.MemberName = CommitteeMemberDetail.MemberName || '';
      this.Member_Address = CommitteeMemberDetail.Member_Address || '';
      this.CityId = CommitteeMemberDetail.CityId || '';
      this.PinCode = CommitteeMemberDetail.PinCode || '';
      this.MobileNo = CommitteeMemberDetail.MobileNo || '';
      this.EmailId = CommitteeMemberDetail.EmailId || '';
      this.StudyAmount = CommitteeMemberDetail.StudyAmount || '';
      this.MemberMeetingStatus = CommitteeMemberDetail.MemberMeetingStatus || '';
      // this.LastName = MemberDetail.LastName || 0;
    }
  }

}