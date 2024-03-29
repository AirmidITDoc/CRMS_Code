import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../../administration/administration.service';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { CaseDetail } from 'app/main/OpdCRMS/case-detail/new-case-detail/new-case-detail.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from '../dashboard.service';
import { DashboardCaseDetails } from '../daily-dashboard/daily-dashboard.component';

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
  currentDate=new Date();
  subscriptions: Subscription[] = [];
  screenFromString = 'admission-form';
  printTemplate: any;
  DashboardCaseDetails
  subscriptionArr: Subscription[] = [];
  StudyId:0;
  totalAmtOfNetAmt: any;
  VisitID:any;
  selectedAdvanceObj: DashboardCaseDetails;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
    'CaseId',
    'CaseTitle',
    'PatientName',
    'RegNo',
    'MobileNo',
    'AgeYear',
    'TotalBillAmt',
   'action',

  ];
  dataSource = new MatTableDataSource<CaseDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _CasedetailService: DashboardService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    this.getCaseList();
  }

  ngOnInit(): void {


    if(this.data)
    {
      console.log(this.data);
      this.StudyId=this.data.element.Title;

      this.selectedAdvanceObj = this.data.element;
      console.log(this.selectedAdvanceObj)
    }
   
    this.getCaseList();
    // this.dataSource.data.refresh();

  }

  

  getCaseList() {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "StudyId": this.StudyId            
    }
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CasedetailService.getCaseIDCombo(D_data).subscribe(Visit => {
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

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  onClear() {
    // this._CasedetailService.myFilterform.reset(
    //   {
    //     start: [],
    //     end: []
    //   }
    // );
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
//         height: '560px',
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


  // newCaseDetail() {

  //   const dialogRef = this._matDialog.open(NewCaseDetailComponent,
  //     {
  //       maxWidth: "75vw",
  //       height: '560px',
  //       width: '100%',
        
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed - Insert Action', result);
  //     this.getCaseList();
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
  // get f() { return this._CasedetailService.myFilterform.controls; }
  selectRow(row) {
    this.selectRow = row;
  }


  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { TotalBillAmt }) => sum += +(TotalBillAmt || 0), 0);
    this.totalAmtOfNetAmt = netAmt;
   console.log(netAmt);
    return netAmt
  }

  onClose() {
    this._matDialog.closeAll();
  }
   
}
