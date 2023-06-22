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

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CaseDetailComponent implements OnInit {

  
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
    'CaseId',
    'CaseTitle',
    'CaseDescription',
    'TotalSubjects',
    'TotalVisits',
    'VisitFrequency',
    'CaseStartDate',
    'CaseStatus',
    'CompanyName',
    'CaseRepresentative',
    'HospitalRepresentative',
    'AgreementFileName',
    'action',

  ];
  dataSource = new MatTableDataSource<CaseDetail>();
  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _AppointmentSreviceService: CasedetailService,
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
      // this.menuActions.push('One');
      // this.menuActions.push('New Case Detail');
      this.menuActions.push('Update Case Detail');
      this.menuActions.push('View Case Detail');
        }


    this.getCaseList();
    // this.dataSource.data.refresh();

  }

  

  getCaseList() {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Doctor_Id": this._AppointmentSreviceService.myFilterform.get("DoctorId").value || 0,
      "From_Dt": this.datePipe.transform(this._AppointmentSreviceService.myFilterform.get("start").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      "To_Dt": this.datePipe.transform(this._AppointmentSreviceService.myFilterform.get("end").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      
    }
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentSreviceService.getCaseIDCombo().subscribe(Visit => {
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
    this._AppointmentSreviceService.myFilterform.reset(
      {
        start: [],
        end: []
      }
    );
  }

  getRecord(contact,m): void {
    ;
console.log(contact);
console.log(m);
    if (m == "Bill") {
      console.log(contact);
      let xx = {
        RegNo: contact.RegId,
        // RegId: contact.RegId,
        AdmissionID: contact.VisitId,
        PatientName: contact.PatientName,
        Doctorname: contact.Doctorname,
        AdmDateTime: contact.AdmDateTime,
        AgeYear: contact.AgeYear,
        ClassId: contact.ClassId,
        ClassName: contact.ClassName,
        TariffName: contact.TariffName,
        TariffId: contact.TariffId
      };
      // this.advanceDataStored.storage = new AdvanceDetailObj(xx);

      // this._ActRoute.navigate(['opd/new-OpdBilling']);
      //   const dialogRef = this._matDialog.open(OPBillingComponent, 
      //    {  maxWidth: "90%",
      //   //  height: '495px !important',

      //   height: '695px !important',
      //   // width: '100%',
      //  });
      //  dialogRef.afterClosed().subscribe(result => {
      //    console.log('The dialog was closed - Insert Action', result);
      //   //  this.getRadiologytemplateMasterList();
      // });
    }
    
    else if(m == "View Case Detail") {
        console.log(" This is for View Case Detail pop : " + m);
        let xx = {
        
          CaseId:contact.CaseId,
          CaseTitle:contact.CaseTitle,
          CaseDescription: contact.CaseDescription,
          TotalSubjects:contact.TotalSubjects,
          TotalVisits:contact.TotalVisits,
          VisitFrequency:contact.VisitFrequency,
          CaseStartDate: contact.CaseStartDate,
          CaseEndDate:contact.CaseEndDate,
          CaseStatus: contact.CaseStatus,
          CompanyName:contact.CompanyName,
          CaseRepresentative: contact.CaseRepresentative,
          HospitalRepresentative: contact.HospitalRepresentative,
          AgreementFileName: contact.AgreementFileName,
        };
        // this.advanceDataStored.storage = new CaseDetail(xx);
        // console.log( this.advanceDataStored.storage);
         console.log(xx);
        debugger;
        const dialogRef = this._matDialog.open(ViewCasedetailComponent,
          {
            maxWidth: "95%",
            height: '95%',
            width: '100%',
            //width: '100%', height: "100%"
          });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed - Insert Action', result);
          //  this.getRadiologytemplateMasterList();
        });
      }
    

    if (m == "Update Case Detail") {

      console.log(" This is for Update Case Detail pop : " + m);
      let xx = {
      
        CaseId:contact.CaseId,
        CaseTitle:contact.CaseTitle,
        CaseDescription: contact.CaseDescription,
        TotalSubjects:contact.TotalSubjects,
        TotalVisits:contact.TotalVisits,
        VisitFrequency:contact.VisitFrequency,
        CaseStartDate: contact.CaseStartDate,
        CaseEndDate:contact.CaseEndDate,
        CaseStatus: contact.CaseStatus,
        CompanyName:contact.CompanyName,
        CaseRepresentative: contact.CaseRepresentative,
        HospitalRepresentative: contact.HospitalRepresentative,
        AgreementFileName: contact.AgreementFileName,

      };
      // this.advanceDataStored.storage = new CaseDetail(xx);
      // this._AppointmentSreviceService.populateFormpersonal(xx);
    
console.log(xx);
      this._ActRoute.navigate(['/opd/registration']);
      const dialogRef = this._matDialog.open(NewCaseDetailComponent,
        {
          maxWidth: "85%",
          height: '560px',
          width: '100%',
          data : {
            registerObj : xx,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        //  this.getRadiologytemplateMasterList();
      });
    }

   
    
  
  }

  onEdit(contact){
    
    console.log(" This is for Update Case Detail pop : " + contact);
    let xx = {
    
      CaseId:contact.CaseId,
      CaseTitle:contact.CaseTitle,
      CaseDescription: contact.CaseDescription,
      TotalSubjects:contact.TotalSubjects,
      TotalVisits:contact.TotalVisits,
      VisitFrequency:contact.VisitFrequency,
      CaseStartDate: contact.CaseStartDate,
      CaseEndDate:contact.CaseEndDate,
      CaseStatus: contact.CaseStatus,
      CompanyName:contact.CompanyName,
      CaseRepresentative: contact.CaseRepresentative,
      HospitalRepresentative: contact.HospitalRepresentative,
      AgreementFileName: contact.AgreementFileName,

    };
    // this.advanceDataStored.storage = new CaseDetail(xx);
    // this._AppointmentSreviceService.populateFormpersonal(xx);
  
console.log(xx);
    // this._ActRoute.navigate(['/opd/registration']);
    const dialogRef = this._matDialog.open(EditCasedetailComponent,
      {
        maxWidth: "75vw",
        height: '560px',
        width: '100%',
        data : {
          registerObj : xx,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
      //  this.getRadiologytemplateMasterList();
    });
  }


  newCaseDetail() {

    const dialogRef = this._matDialog.open(NewCaseDetailComponent,
      {
        maxWidth: "75vw",
        height: '560px',
        width: '100%',
        
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      // this.getVisitList();
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
  get f() { return this._AppointmentSreviceService.myFilterform.controls; }
  selectRow(row) {
    this.selectRow = row;
  }



   
}