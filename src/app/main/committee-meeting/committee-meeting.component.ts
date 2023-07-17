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
  reportPrintObj:CommmitteeDetail;
  printTemplate: any;
  reportPrintObjList: CommmitteeDetail[] = [];
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
  dscommitteeMeetingList = new MatTableDataSource<CommmitteeDetail>();
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
        this.dscommitteeMeetingList.data = Visit as CommmitteeDetail[];
        this.dscommitteeMeetingList.sort = this.sort;
        this.dscommitteeMeetingList.paginator = this.paginator;
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
    this._CasedetailService.myFilterform.reset(
      {
        start: [],
        end: []
      }
    );
  }


newMember() {
    const dialogRef = this._matDialog.open(AddMemberComponent,
      {
        maxWidth: "75vw",
        height: '300px',
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
        maxWidth: "50vw",
        height: '600px',
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
        maxWidth: "80vw",
        height: '660px',
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


   
  onEdit(row) {
    console.log(row);
    var m_data = {
      CommitteeMeetingId: row.CommitteeMeetingId,
      CommitteeMeetingDate: row.CommitteeMeetingDate,
      CommitteeMeetingName: row.CommiteeMeetingName,
      Location: row.CommitteeMeetingLocation,
      CreatedBy: row.CreatedBy,
    
    };

    console.log(m_data);
    this._CasedetailService.populateForm(m_data);

     const dialogRef = this._matDialog.open(NewCommitteeMeetingComponent,
        {
        maxWidth: "70vw",
        maxHeight: "80vh",
        width: "100%",
        height: "100%",
        // data : {
        //   registerObj : m_data,
        // }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed - Insert Action", result);
      this.getCommitteeList();
    });
  }


 getPrint() {
    debugger;
    var D_data = {
      "CommitteeMeetingId": 1,//this.selectedAdvanceObj.AdmissionID || 0,
     
    }
    // el.bgColor = 'red';
    console.log(D_data);
    let printContents;
    this.subscriptionArr.push(
      this._CasedetailService.getCommitteeMeetPrint(D_data).subscribe(res => {
        console.log(res);
        this.reportPrintObjList = res as CommmitteeDetail[];
        console.log(this.reportPrintObjList);
        this.reportPrintObj = res[0] as CommmitteeDetail;

        this.getTemplate();

        console.log(D_data);
      })
    );
  }


  
  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=33';
    this._CasedetailService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['CommitteeMeetingId', 'CommitteeMeetingDate', 'CommitteeMeetingTime', 'CommiteeMeetingName', 'CommitteeMeetingLocation', 'CommitteeMeetingAmount', 'MemberName', 'MemberAmount']; // resData[0].TempKeys;
      debugger;
      for (let i = 0; i < keysArray.length; i++) {
        let reString = "{{" + keysArray[i] + "}}";
        let re = new RegExp(reString, "g");
        this.printTemplate = this.printTemplate.replace(re, this.reportPrintObj[keysArray[i]]);
      }
      var strrowslist = "";
      for (let i = 1; i <= this.reportPrintObjList.length; i++) {
        console.log(this.reportPrintObjList);
        var objreportPrint = this.reportPrintObjList[i - 1];

      

        var strabc = `<hr style="border-color:white" >
        <div style="display:flex;margin:8px 0">
        <div style="display:flex;width:60px;margin-left:20px;">
            <div>`+ i + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:600px;margin-left:10px;text-align:left;">
            <div>`+ objreportPrint.MemberName + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:300px;margin-left:10px;text-align:left;">
        <div>`+ objreportPrint.MemberAmount + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
       
        </div>`;
        strrowslist += strabc;
      }
      var objPrintWordInfo = this.reportPrintObjList[0];
     

      // this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.PaidAmount));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
      this.printTemplate = this.printTemplate.replace('SetMultipleRowsDesign', strrowslist);
     
      
      this.printTemplate = this.printTemplate.replace(/{{.*}}/g, '');
      setTimeout(() => {
        this.print();
      }, 1000);
    });
  }

  transform1(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
    return value;
  }

  transform2(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform((new Date), 'dd/MM/yyyy h:mm a');
    return value;
  }




  // PRINT 
  print() {

    let popupWin, printContents;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=800px !important,width=auto,width=2200px !important');
    // popupWin.document.open();
    popupWin.document.write(` <html>
    <head><style type="text/css">`);
    popupWin.document.write(`
      </style>
          <title></title>
      </head>
    `);
    popupWin.document.write(`<body onload="window.print();window.close()">${this.printTemplate}</body>
    </html>`);
    popupWin.document.close();
  }


}


export class CommmitteeDetail {
  CommitteeMeetingId:any;
  CommitteeMeetingDate:any;
  CommitteeMeetingTime:any;
  CommiteeMeetingName:any;
  CreatedBy: any;
  CommitteeMeetingLocation: any;
  MemberName:any;
  MemberAmount:any;

  /**
   * Constructor
   *
   * @param CommmitteeDetail
   */

  constructor(CommmitteeDetail) {
    {
      this.CommitteeMeetingId = CommmitteeDetail.CommitteeMeetingId || '';
      this.CommitteeMeetingDate = CommmitteeDetail.CommitteeMeetingDate || '';
      this.CommitteeMeetingTime = CommmitteeDetail.CommitteeMeetingTime || '';
      this.CommiteeMeetingName = CommmitteeDetail.CommiteeMeetingName || '';
      this.CommitteeMeetingLocation = CommmitteeDetail.CommitteeMeetingLocation || '';
      this.MemberName = CommmitteeDetail.MemberName || '';
      this.MemberAmount = CommmitteeDetail.MemberAmount || '';
      this.CreatedBy = CommmitteeDetail.CreatedBy || 0;
  
    }
  }
}