import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AppointmentService } from './appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { fuseAnimations } from '@fuse/animations';
import { BillDetailComponent, SearchInforObj } from './bill-detail/bill-detail.component';
import { AdvanceDataStored } from '../advance';
// import { EditVisitDateComponent } from './edit-visit-date/edit-visit-date.component';
import { NewVistDateComponent } from './new-vist-date/new-vist-date.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { InvoiceBillMappingComponent } from './invoice-bill-mapping/invoice-bill-mapping.component';
import { MatDrawer } from '@angular/material/sidenav';
import { PatientScreenBillDetailComponent } from './patient-screen-bill-detail/patient-screen-bill-detail.component';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AppointmentComponent implements OnInit {

  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  hasSelectedContacts: boolean;
  currentDate = new Date();
  subscriptions: Subscription[] = [];
  // reportPrintObj: CasepaperVisitDetails;
  printTemplate: any;
  // reportPrintObjList: CasepaperVisitDetails[] = [];
  subscriptionArr: Subscription[] = [];
  CaseIdList:any = [];

  VisitID: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('drawer') public drawer: MatDrawer;
  
  @Input() dataArray: any;

  displayedColumns = [
    'ProtocolNo',
    'VisitTitle',
    'SubjectName',
    'RegNoWithPrefix',
    'PatientName',
    // 'DVisitDate',
    // 'VisitTime',
    'OPDNo',
    'Doctorname',
    'RefDocName',
    'PatientType',
    // 'HospitalName',
    'buttons',

  ];
  dataSource = new MatTableDataSource<VisitMaster>();

 

  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _AppointmentSreviceService: AppointmentService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    // private advanceDataStored: AdvanceDataStored
  ) {
    this.getVisitList();
  }

  ngOnInit(): void {

    if (this._ActRoute.url == '/opd/appointment') {

      this.menuActions.push('Update Registration');
      this.menuActions.push('Add New Visit Date');
      this.menuActions.push('Bill');

      this.menuActions.push('Invoice Bill');
    } else if (this._ActRoute.url == '/opd/bill') {
      this.menuActions.push('New Bill');
    }

    this.CaseListCombo();
    // this.drawer.toggle();
    // this.getVisitList();
    // this.dataSource.data.refresh();

  }

  // VisitList 

  getVisitList() {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "F_Name": this._AppointmentSreviceService.myFilterform.get("FirstName").value|| '%',
      "L_Name": this._AppointmentSreviceService.myFilterform.get("LastName").value || '%',
      "Reg_No": this._AppointmentSreviceService.myFilterform.get("RegNo").value || 0,
      "From_Dt": this.datePipe.transform(this._AppointmentSreviceService.myFilterform.get("start").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      "To_Dt": this.datePipe.transform(this._AppointmentSreviceService.myFilterform.get("end").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      "StudyId":this._AppointmentSreviceService.myFilterform.get("StudyId").value.StudyId  || 0,
    }
    console.log(D_data);
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentSreviceService.getAppointmentList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as VisitMaster[];
        console.log( this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }



  
  getPatScrBillList(element) {
    console.log(element);
    const dialogRef = this._matDialog.open(PatientScreenBillDetailComponent,
      {
        maxWidth: '110vw',
        height: '700px',
        width: '100%',
        data : {
          element : element,
          StudyId:this._AppointmentSreviceService.myFilterform.get("StudyId").value.StudyId ,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      
    });
  }



  CaseListCombo(){
    this._AppointmentSreviceService.getCaseIDCombo().subscribe(data => { this.CaseIdList = data; })
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

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    // console.log(changes.dataArray.currentValue, 'new arrrrrrr');
    // this.isLoading = true;
    this.dataSource.data = changes.dataArray.currentValue as VisitMaster[];
    this.isLoading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.isLoading = false;
  }

  onClick(){


  }


  getRecord(contact, m): void {
    debugger;
    console.log(contact);

    this.VisitID = contact.VisitId;
    let AgeDay,AgeMonth,AgeYear,Age
    if (contact.Age != null || contact.AgeDay != null || contact.AgeMonth != null || contact.AgeYear != null) {
    
      AgeDay = contact.AgeDay.trim();
      AgeMonth = contact.AgeMonth.trim();
      AgeYear = contact.AgeYear.trim();
      // Age=contact.Age.trim();
    }

    if (m == "Update Registration") {
      var m_data = {
        // "RegNo": contact.RegNo,
        "RegId": contact.RegId,
        "PrefixID": contact.PrefixId,
        "PrefixName": contact.PrefixName,
        "FirstName": contact.FirstName,
        "MiddleName": contact.MiddleName,
        "LastName": contact.LastName,
        "PatientName": contact.PatientName,
        "DateofBirth": contact.DateofBirth,
        "MaritalStatusId": contact.MaritalStatusId,
        "AadharCardNo": contact.AadharCardNo || 0,
        "Age": Age,
        "AgeDay": AgeDay,
        "AgeMonth": AgeMonth,
        "AgeYear": AgeYear,
        "Address": contact.Address,
        "AreaId": contact.AreaId,
        "City": contact.City,
        "CityId": contact.CityId,
        "StateId": contact.StateId,
        "CountryId": contact.CountryId,
        "PhoneNo": contact.PhoneNo,
        "MobileNo": contact.MobileNo,
        "GenderId": contact.GenderId,
        "GenderName": contact.GenderName,
        "ReligionId": contact.ReligionId,
        "IsCharity": 0,
        "PinNo": contact.PinNo,
        "RegDate": contact.RegDate,
        "RegNoWithPrefix": contact.RegNoWithPrefix,
        "RegTime": contact.RegTime,
        "DoctorId":contact.DoctorId,
        "Opration":"UPDATE"
      }
      this._AppointmentSreviceService.populateFormpersonal(m_data);
      const dialogRef = this._matDialog.open(EditAppointmentComponent,
        {
          maxWidth: "85vw",
          height: '500px',
          width: '100%',
          data: {
            registerObj: m_data,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getVisitList();
      });

      error => {
        this.sIsLoading = '';

      }
    }
    else if (m == "Bill") {
      console.log(contact);
    
        let xx = {
          RegNo: contact.RegId,
          RegId: contact.RegId,
          AdmissionID: contact.VisitId,
          PatientName: contact.PatientName,
          Doctorname: contact.Doctorname,
          AdmDateTime: contact.AdmDateTime,
          AgeYear: contact.AgeYear,
          ClassId: contact.ClassId,
          ClassName: contact.ClassName,
          TariffName: contact.TariffName,
          TariffId: contact.TariffId,
          VisitId: contact.VisitId,
          VistDateTime: contact.VistDateTime
        };
        // this._AppointmentSreviceService.populateFormpersonal(xx);
        this.advanceDataStored.storage = new SearchInforObj(xx);
        const dialogRef = this._matDialog.open(BillDetailComponent,
          {
            maxWidth: "98%",
            height: '600px',
            width: '100%',
            data: {
              registerObj: xx,
            }
          });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed - Insert Action', result);
          this.getVisitList();
        });
     
        error => {
          this.sIsLoading = '';
        }
    }
    else if (m == "Invoice Bill") {
      console.log(contact);


      let xx = {
        RegNo: contact.RegId,
        RegId: contact.RegId,
        AdmissionID: contact.VisitId,
        PatientName: contact.PatientName,
        Doctorname: contact.Doctorname,
        AdmDateTime: contact.AdmDateTime,
        AgeYear: contact.AgeYear,
        ClassId: contact.ClassId,
        ClassName: contact.ClassName,
        TariffName: contact.TariffName,
        TariffId: contact.TariffId,
        VisitId: contact.VisitId,
        VistDateTime: contact.VistDateTime
      };
      // this._AppointmentSreviceService.populateFormpersonal(xx);
      this.advanceDataStored.storage = new SearchInforObj(xx);
      const dialogRef = this._matDialog.open(InvoiceBillMappingComponent,
        {
          maxWidth: "65%",
          height: '740px',
          width: '100%',
          data: {
            registerObj: xx,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getVisitList();
      });
    } else if (m == "New Bill") {
      console.log(contact);
    
        let xx = {
          RegNo: contact.RegId,
          RegId: contact.RegId,
          AdmissionID: contact.VisitId,
          PatientName: contact.PatientName,
          Doctorname: contact.Doctorname,
          AdmDateTime: contact.AdmDateTime,
          AgeYear: contact.AgeYear,
          ClassId: contact.ClassId,
          ClassName: contact.ClassName,
          TariffName: contact.TariffName,
          TariffId: contact.TariffId,
          VisitId: contact.VisitId,
          VistDateTime: contact.VistDateTime
        };
        // this._AppointmentSreviceService.populateFormpersonal(xx);
        this.advanceDataStored.storage = new SearchInforObj(xx);
        const dialogRef = this._matDialog.open(BillDetailComponent,
          {
            maxWidth: "99%",
            height: '700px',
            width: '100%',
            data: {
              registerObj: xx,
            }
          });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed - Insert Action', result);
          this.getVisitList();
        });
    
    }
    else if (m == "Payment") {
      console.log(contact);
      
        let xx = {
          RegNo: contact.RegId,
          RegId: contact.RegId,
          AdmissionID: contact.VisitId,
          PatientName: contact.PatientName,
          Doctorname: contact.Doctorname,
          AdmDateTime: contact.AdmDateTime,
          AgeYear: contact.AgeYear,
          ClassId: contact.ClassId,
          ClassName: contact.ClassName,
          TariffName: contact.TariffName,
          TariffId: contact.TariffId,
          VisitId: contact.VisitId,
          VisitDate: contact.VisitDate
        };

        let PatientHeaderObj = {};

        PatientHeaderObj['Date'] = contact.VisitDate
        PatientHeaderObj['PatientName'] = contact.PatientName,
          PatientHeaderObj['OPD_IPD_Id'] = contact.VisitId,
          PatientHeaderObj['NetPayAmount'] = contact.TotalAmt

        // this._AppointmentSreviceService.populateFormpersonal(xx);
        this.advanceDataStored.storage = new SearchInforObj(xx);
        const dialogRef = this._matDialog.open(PaymentDetailComponent,
          {
            maxWidth: "90%",
            height: '600px',
            width: '100%',
            data: {
              advanceObj: PatientHeaderObj,
              FromName: "OP-Bill"
            }
          });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed - Insert Action', result);
          this.getVisitList();
        });
     
    }
    else if (m == "Add New Visit Date") {
      console.log(contact);

      var m_data1 = {

        "VisitId": contact.VisitId,
        "RegNo": contact.RegId,
        "VisitDate": contact.VisitDate,
        "DVisitDate": contact.DVisitDate,
        "VisitTime": contact.VisitTime,
        "PatientTypeId": contact.PatientTypeId,
        "PatientType": contact.PatientType,
        "VistDateTime": contact.VistDateTime,
        "Expr1": contact.Expr1,
        "OPDNo": contact.OPDNo,
        "TariffId": contact.TariffId,
        "TariffName": contact.TariffName,
        "CompanyId": 0,
        "CompanyName": "",
        "ClassId": 1,
        "ClassName": "OPD",
        "DoctorId": contact.DoctorId,
        "Doctorname": contact.Doctorname,
        "RefDocId": contact.DoctorId,
        "RefDocName": contact.RefDocName,
        "RegNoWithPrefix": "GMH11587",
        "PatientName": contact.PatientName,
        "AgeYear": contact.AgeYear


      }
      
      const dialogRef = this._matDialog.open(NewVistDateComponent,
        {
          maxWidth: "75vw",
          height: '290px',
          width: '100%',
          data: {
            registerObj: m_data1,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getVisitList();
      });
    }
    error => {
      this.sIsLoading = '';

    }
    

  }

  newappointment() {

    debugger;
    const dialogRef = this._matDialog.open(NewAppointmentComponent,
      {
        maxWidth: "95vw",
        height: '700px',
        width: '100%',

      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getVisitList();
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



  getTemplate() {
    debugger;



    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=12';
    console.log(query);
    this._AppointmentSreviceService.getTemplate(query).subscribe((resData: any) => {
      console.log(resData);
      this.printTemplate = resData[0].TempDesign;
      console.log(this.printTemplate);
      let keysArray = ['RegNo', 'PrecriptionId', 'PatientName', 'OPDNo', 'Diagnosis', 'PatientName', 'Weight', 'Pluse', 'BP', 'BSL', 'DoseName', 'Days', 'GenderName', 'AgeYear', 'DrugName', 'ConsultantDocName', 'SecondRefDoctorName', 'MobileNo', 'Address', 'VisitDate']; // resData[0].TempKeys;

      for (let i = 0; i < keysArray.length; i++) {
        let reString = "{{" + keysArray[i] + "}}";
        let re = new RegExp(reString, "g");
        // this.printTemplate = this.printTemplate.replace(re, this.reportPrintObj[keysArray[i]]);
      }


      // this.printTemplate = this.printTemplate.replace('StrVisitDate', this.transform2(this.reportPrintObj.VisitDate));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
      // this.printTemplate = this.printTemplate.replace('StrConsultantDr', (this.reportPrintObj.ConsultantDocName));
      // this.printTemplate = this.printTemplate.replace('StrOPDDate', this.transform1(this.reportPrintObj.VisitDate));

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


  getPrint() {
    debugger;
    var D_data = {
      "VisitId": 82973,//this.selectedAdvanceObj.AdmissionID || 0,
      "PatientType": 0,//this.selectedAdvanceObj.PatientType || 0

    }
    // el.bgColor = 'red';
    console.log(D_data);
    let printContents;
    this.subscriptionArr.push(
      // this._AppointmentSreviceService.getOPDPrecriptionPrint(D_data).subscribe(res => {
      //   console.log(res);
      //   this.reportPrintObjList = res as CasepaperVisitDetails[];
      //   console.log(this.reportPrintObjList);
      //   this.reportPrintObj = res[0] as CasepaperVisitDetails;

      //   this.getTemplate();

      //   console.log(D_data);
      // })
    );
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



  newappointmentSchdule() {


    const dialogRef = this._matDialog.open(NewAppointmentComponent,
      {
        maxWidth: "95vw",
        height: '700px',
        width: '100%',
        // height: "100%"
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      this.getVisitList();
    });
  }
}

export class VisitMaster {
  VisitId: Number;
  VisitTitle:any;
  PrefixId: number;
  RegNoWithPrefix: number;
  PatientName: string;
  VisitDate: Date;
  VisitTime: Date;
  HospitalID: number;
  HospitalName: string;
  PatientTypeID: number;
  PatientTypeId: number;
  PatientType: string;
  CompanyId: number;
  OPDNo: string;
  TariffId: number;
  TariffName: string;
  ConsultantDocId: number;
  RefDocId: number;
  Doctorname: string;
  RefDocName: string;
  DepartmentId: number;
  appPurposeId: number;
  patientOldNew: Boolean;
  isMark: boolean;
  isXray: boolean;
  AddedBy: number;
  MPbillNo: number;
  RegNo: any;
  currentDate = new Date();
  IsMark: any;
  IsXray: any;
  Comments: any;
  Intime: any;
  OutTime: any;
  DoctorId: any;
  AgeYear: any;
  VistDateTime: any;
  SubjectName:any;
  RegId:any;
  BillId:any;
  PBillNo:any;
  /**
   * Constructor
   *
   * @param VisitMaster
   */
  constructor(VisitMaster) {
    {
      this.VisitId = VisitMaster.VisitId || 0;
      this.PrefixId = VisitMaster.PrefixId || 0,
        this.RegNoWithPrefix = VisitMaster.RegNoWithPrefix || '';
      this.PatientName = VisitMaster.PatientName || '';
      this.VisitDate = VisitMaster.VisitDate || this.currentDate;
      this.VisitTime = VisitMaster.VisitTime || this.currentDate;
      this.HospitalID = VisitMaster.HospitalID || '';
      this.HospitalName = VisitMaster.HospitalName || '';
      this.PatientTypeID = VisitMaster.PatientTypeID || '';
      this.PatientTypeId = VisitMaster.PatientTypeId || '';
      this.PatientType = VisitMaster.PatientType || '';
      this.CompanyId = VisitMaster.CompanyId || '';
      this.TariffId = VisitMaster.TariffId || '';
      this.OPDNo = VisitMaster.OPDNo || '';
      this.ConsultantDocId = VisitMaster.ConsultantDocId || '';
      this.Doctorname = VisitMaster.Doctorname || '';
      this.RefDocId = VisitMaster.VisitTime || '';
      this.RefDocName = VisitMaster.RefDocName || '';
      this.DepartmentId = VisitMaster.DepartmentId || '';
      this.patientOldNew = VisitMaster.patientOldNew || '';
      this.isXray = VisitMaster.isXray || '';
      this.AddedBy = VisitMaster.AddedBy || '';
      this.MPbillNo = VisitMaster.MPbillNo || '';
      this.RegNo = VisitMaster.RegNo || '';
      this.DoctorId = VisitMaster.DoctorId || 0;
      this.AgeYear = VisitMaster.AgeYear || '';
      this.VistDateTime = VisitMaster.VistDateTime || '';
      this.SubjectName = VisitMaster.SubjectName || '';
      this.RegId = VisitMaster.RegId || 0;
      this.VisitTitle = VisitMaster.VisitTitle || '';
      this.BillId = VisitMaster.BillId || '';
      this.PBillNo=VisitMaster.PBillNo|| '';
    }
    }
  
}

export class RegInsert {
  RegId: Number;
  RegDate: Date;
  RegTime: Date;
  PrefixId: number;
  PrefixID: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Address: string;
  City: string;
  PinNo: string;
  RegNo: string;
  DateofBirth: Date;
  Age: any;
  GenderId: Number;
  PhoneNo: string;
  MobileNo: string;
  AddedBy: number;
  AgeYear: any;
  AgeMonth: any;
  AgeDay: any;
  CountryId: number;
  StateId: number;
  CityId: number;
  MaritalStatusId: number;
  IsCharity: Boolean;
  ReligionId: number;
  AreaId: number;
  VillageId: number;
  TalukaId: number;
  PatientWeight: number;
  AreaName: string;
  AadharCardNo: string;
  PanCardNo: string;
  currentDate = new Date();
  RationCardNo: any;
  IsMember: any;
  VisitDate: any;
  VisitTime: any;
  Opration:any;
  /**
   * Constructor
   *
   * @param RegInsert
   */

  constructor(RegInsert) {
    {
      this.RegId = RegInsert.RegId || '';
      this.RegDate = RegInsert.RegDate || '';
      this.RegTime = RegInsert.RegTime || '';
      this.PrefixId = RegInsert.PrefixId || '';
      this.PrefixID = RegInsert.PrefixID || '';
      this.FirstName = RegInsert.FirstName || '';
      this.MiddleName = RegInsert.MiddleName || '';
      this.LastName = RegInsert.LastName || '';
      this.Address = RegInsert.Address || '';
      this.City = RegInsert.City || '';
      this.PinNo = RegInsert.PinNo || '';
      this.DateofBirth = RegInsert.DateofBirth || this.currentDate;
      this.Age = RegInsert.Age || '';
      this.GenderId = RegInsert.GenderId || '';
      this.PhoneNo = RegInsert.PhoneNo || '';
      this.MobileNo = RegInsert.MobileNo || '';
      this.AddedBy = RegInsert.AddedBy || '';
      this.AgeYear = RegInsert.AgeYear || '';
      this.AgeMonth = RegInsert.AgeMonth || '';
      this.AgeDay = RegInsert.AgeDay || '';
      this.CountryId = RegInsert.CountryId || '';
      this.StateId = RegInsert.StateId || '';
      this.CityId = RegInsert.CityId || '';
      this.MaritalStatusId = RegInsert.MaritalStatusId || '';
      this.IsCharity = RegInsert.IsCharity || '';
      this.ReligionId = RegInsert.ReligionId || '';
      this.AreaId = RegInsert.AreaId || '';
      this.VillageId = RegInsert.VillageId || '';
      this.TalukaId = RegInsert.TalukaId || '';
      this.PatientWeight = RegInsert.PatientWeight || '';
      this.AreaName = RegInsert.AreaName || '';
      this.AadharCardNo = RegInsert.AadharCardNo || '';
      this.PanCardNo = RegInsert.PanCardNo || '';
      this.RationCardNo = RegInsert.RationCardNo || '';
      this.IsMember = RegInsert.IsMember || 0;
      this.VisitDate = RegInsert.VisitDate || this.currentDate;
      this.VisitTime = RegInsert.VisitTime || this.currentDate;
      this.Opration = RegInsert.Opration || 0;
    }
  }
}

export class ChargesList {
  ChargesId: number;
  ServiceId: number;
  ServiceName: String;
  Price: number;
  Qty: number;
  TotalAmt: number;
  DiscPer: number;
  DiscAmt: number;
  NetAmount: number;
  DoctorId: number;
  ChargeDoctorName: String;
  ChargesDate: Date;
  IsPathology: boolean;
  IsRadiology: boolean;
  ClassId: number;
  ClassName: string;
  ChargesAddedName: string;

  constructor(ChargesList) {
    this.ChargesId = ChargesList.ChargesId || '';
    this.ServiceId = ChargesList.ServiceId || '';
    this.ServiceName = ChargesList.ServiceName || '';
    this.Price = ChargesList.Price || '';
    this.Qty = ChargesList.Qty || '';
    this.TotalAmt = ChargesList.TotalAmt || '';
    this.DiscPer = ChargesList.DiscPer || '';
    this.DiscAmt = ChargesList.DiscAmt || '';
    this.NetAmount = ChargesList.NetAmount || '';
    this.DoctorId = ChargesList.DoctorId || 0;
    this.ChargeDoctorName = ChargesList.ChargeDoctorName || '';
    this.ChargesDate = ChargesList.ChargesDate || '';
    this.IsPathology = ChargesList.IsPathology || '';
    this.IsRadiology = ChargesList.IsRadiology || '';
    this.ClassId = ChargesList.ClassId || 0;
    this.ClassName = ChargesList.ClassName || '';
    this.ChargesAddedName = ChargesList.ChargesAddedName || '';
  }
}



export class BrowseOPDBill {
  BillNo: Number;
  RegId: number;
  RegNo: number;
  PatientName: string;
  FirstName: string;
  Middlename: string;
  LastName: string;
  TotalAmt: number;
  ConcessionAmt: number;
  NetPayableAmt: number;
  BillDate: any;
  IPDNo: number;
  ServiceName: String;
  Price: number;
  Qty: number;
  ChargesTotalAmount: number;
  NetAmount: number;
  PaidAmount: number;
  HospitalName: string;
  HospitalAddress: string;
  Phone: number;
  EmailId: any;
  ChargesDoctorName: string;
  TotalBillAmount: number;
  ConsultantDocName: string;
  DepartmentName: string;
  IsCancelled: boolean;
  OPD_IPD_Type: number;
  PBillNo: string;
  BDate: Date;
  VisitId: any;
  VisitDate: Date;
  BalanceAmt: number;
  AddedByName: string;
  Department: any;
  Address: any;
  MobileNo: any;
  //PayTMAmount:number;
  //NEFTPayAmount:number;
  /**
   * Constructor
   *
   * @param BrowseOPDBill
   */
  constructor(BrowseOPDBill) {
    {
      this.BillNo = BrowseOPDBill.BillNo || '';
      this.RegId = BrowseOPDBill.RegId || '';
      this.RegNo = BrowseOPDBill.RegNo || '';
      this.VisitId = BrowseOPDBill.VisitId || 0;
      this.PatientName = BrowseOPDBill.PatientName || '';
      this.FirstName = BrowseOPDBill.FirstName || '';
      this.Middlename = BrowseOPDBill.MiddleName || '';
      this.LastName = BrowseOPDBill.LastName || '';
      this.TotalAmt = BrowseOPDBill.TotalAmt || '';
      this.ConcessionAmt = BrowseOPDBill.ConcessionAmt || '';
      this.NetPayableAmt = BrowseOPDBill.NetPayableAmt || '';
      this.BillDate = BrowseOPDBill.BillDate || '';
      this.IPDNo = BrowseOPDBill.IPDNo || '';
      this.IsCancelled = BrowseOPDBill.IsCancelled || '';
      this.OPD_IPD_Type = BrowseOPDBill.OPD_IPD_Type || '';
      this.PBillNo = BrowseOPDBill.PBillNo || '';
      this.BDate = BrowseOPDBill.BDate || '';
      this.PaidAmount = BrowseOPDBill.PaidAmount || '';
      this.BalanceAmt = BrowseOPDBill.BalanceAmt || '';
      this.ServiceName = BrowseOPDBill.ServiceName || '';
      this.Price = BrowseOPDBill.Price || '';
      this.Qty = BrowseOPDBill.Qty || '';
      this.ChargesTotalAmount = BrowseOPDBill.ChargesTotalAmount || '';
      this.NetAmount = BrowseOPDBill.NetAmount || '';
      this.HospitalName = BrowseOPDBill.HospitalName || '';
      this.HospitalAddress = BrowseOPDBill.HospitalAddress || '';
      this.ChargesTotalAmount = BrowseOPDBill.ChargesTotalAmount || '';
      this.Phone = BrowseOPDBill.Phone || '';
      this.EmailId = BrowseOPDBill.EmailId || '';
      this.ConsultantDocName = BrowseOPDBill.ConsultantDocName || '';
      this.DepartmentName = BrowseOPDBill.DepartmentName || '';
      this.TotalBillAmount = BrowseOPDBill.TotalBillAmount || '';
      this.ChargesDoctorName = BrowseOPDBill.ChargesDoctorName || '';
      this.VisitDate = BrowseOPDBill.VisitDate || '';
      this.AddedByName = BrowseOPDBill.AddedByName || '';
      this.TotalAmt = BrowseOPDBill.TotalAmt || '';

      this.Address = BrowseOPDBill.Address || '';
      this.Department = BrowseOPDBill.Department || '';
      this.MobileNo = BrowseOPDBill.MobileNo || '';
    }
  }

}
