import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BillSettlementService } from './bill-settlement.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdvanceDataStored } from '../advance';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailComponent } from '../appointment/payment-detail/payment-detail.component';
import { SearchInforObj } from '../appointment/bill-detail/bill-detail.component';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-bill-settlement',
  templateUrl: './bill-settlement.component.html',
  styleUrls: ['./bill-settlement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BillSettlementComponent implements OnInit {


  @Output() showClicked = new EventEmitter();
  click: boolean = false;
  MouseEvent = true;
  hasSelectedContacts: boolean;
  sIsLoading: string = '';
  dataArray = {};
  dataSource = new MatTableDataSource<BrowseOPDBill>();
  reportPrintObj: BrowseOPDBill;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  reportPrintObjList: BrowseOPDBill[] = [];
  currentDate = new Date();
  selectedcase:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator) PathTestpaginator: MatPaginator;

  selectedAdvanceObj: BrowseOPDBill;
  numberInWords!: string;
  // lang: SUPPORTED_LANGUAGE = 'en';
  value = 123;
  BrowseOPDBillsList: any;
  msg: any;
caseList:any=[];
  isLoading = true;

  displayedColumns = [
    'BillDate',
    // 'BillNo',
    'RegNo',
    'PatientName',
    'TotalAmt',
    'ConcessionAmt',
    'NetPayableAmt',
    'PaidAmount',
    'BalanceAmt',
    'chkBalanceAmt',
    'action'
  ];


  showSpinner = false;
  tablehide = false;
  tableshow = true;
  menuActions: Array<string> = [];



  constructor(private _fuseSidebarService: FuseSidebarService,
    public _BrowseOPDBillsService: BillSettlementService,
    public datePipe: DatePipe,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,
    // private ngxNumToWordsService: NgxNumToWordsService,

  ) { }

  ngOnInit(): void {
    this.getCasecombo();
     if (this._ActRoute.url == '/opd/payment') {
      this.menuActions.push('Payment');
    }

    
    var D_data = {
      "F_Name": "%",
      "L_Name": "%",
      "From_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("start").value, "MM-dd-yyyy"),
      "To_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("end").value, "MM-dd-yyyy"),
      "Reg_No": 0,
      "PBillNo": '%',
    }
    
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._BrowseOPDBillsService.getBrowseBillsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as BrowseOPDBill[];
        this.dataSource.sort = this.sort;
        
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';
        this.click = false;
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

    this.onClear();
  }


  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


  onShow(event: MouseEvent) {
    // this.click = false;// !this.click;
    this.click = !this.click;
    // this. showSpinner = true;

    setTimeout(() => {
      {
        this.sIsLoading = 'loading-data';
        this.getBrowseOPDBillsList();
      }

    }, 1000);
    this.MouseEvent = true;
    this.click = true;

  }
  getCasecombo() {

    this._BrowseOPDBillsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

  }


  onClear() {

    this._BrowseOPDBillsService.myFilterform.get('FirstName').reset('');
    this._BrowseOPDBillsService.myFilterform.get('LastName').reset('');
    this._BrowseOPDBillsService.myFilterform.get('RegNo').reset('');
    this._BrowseOPDBillsService.myFilterform.get('PBillNo').reset('');
  }



  getBrowseOPDBillsList() {
    this.sIsLoading = 'loading-data';

    var D_data = {
      "F_Name": (this._BrowseOPDBillsService.myFilterform.get("FirstName").value).trim() + '%' || "%",
      "L_Name": (this._BrowseOPDBillsService.myFilterform.get("LastName").value).trim() + '%' || "%",
      "From_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("start").value, "MM-dd-yyyy"),
      "To_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("end").value, "MM-dd-yyyy"),
      "Reg_No": this._BrowseOPDBillsService.myFilterform.get("RegNo").value || 0,
      "PBillNo": this._BrowseOPDBillsService.myFilterform.get("PBillNo").value || '%',
    }
    
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._BrowseOPDBillsService.getBrowseBillsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as BrowseOPDBill[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = this.dataSource.data.length == 0 ? 'no-data' : '';
        this.click = false;
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

    this.onClear();
  }


  ngOnChanges(changes: SimpleChanges) {
   
    this.dataSource.data = changes.dataArray.currentValue as BrowseOPDBill[];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }




  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=2';
    this._BrowseOPDBillsService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['HospitalName', 'HospitalAddress', 'Phone','EmailId', 'PhoneNo', 'RegNo', 'BillNo', 'AgeYear', 'AgeDay', 'AgeMonth', 'PBillNo', 'PatientName', 'BillDate', 'VisitDate', 'ConsultantDocName', 'DepartmentName', 'ServiceName', 'ChargesDoctorName', 'Price', 'Qty', 'ChargesTotalAmount', 'TotalBillAmount', 'NetPayableAmt', 'NetAmount', 'ConcessionAmt', 'PaidAmount', 'BalanceAmt', 'AddedByName','Address','MobileNo']; // resData[0].TempKeys;

      for (let i = 0; i < keysArray.length; i++) {
        let reString = "{{" + keysArray[i] + "}}";
        let re = new RegExp(reString, "g");
        this.printTemplate = this.printTemplate.replace(re, this.reportPrintObj[keysArray[i]]);
      }
      var strrowslist = "";
      for (let i = 1; i <= this.reportPrintObjList.length; i++) {
        var objreportPrint = this.reportPrintObjList[i - 1];

        console.log(objreportPrint);
        // Chargedocname
        let docname;
        if (objreportPrint.ChargesDoctorName)
          docname = objreportPrint.ChargesDoctorName;
        else
          docname = '';

          // <hr style="border-color:white" >
        var strabc = ` <div style="display:flex;margin:8px 0">
        <div style="display:flex;width:60px;margin-left:20px;">
            <div>`+ i + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:300px;margin-left:10px;text-align:left;">
            <div>`+ objreportPrint.ServiceName + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:300px;margin-left:10px;text-align:left;">
        <div>`+ docname + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:100px;text-align:left;justify-content: right;">
            <div>`+ '₹' + objreportPrint.Price.toFixed(2) + `</div> <!-- <div>450</div> -->
        </div>
        <div style="display:flex;width:60px;margin-left:40px;">
            <div>`+ objreportPrint.Qty + `</div> <!-- <div>1</div> -->
        </div>
        <div style="display:flex;width:80px;justify-content: right;">
            <div>`+ '₹' + objreportPrint.NetAmount.toFixed(2) + `</div> <!-- <div>450</div> -->
        </div>
        </div>`;
        strrowslist += strabc;
      }
      var objPrintWordInfo = this.reportPrintObjList[0];

      this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.PaidAmount));

      // this.printTemplate = this.printTemplate.replace('StrBalanceAmt', '₹' + (objPrintWordInfo.BalanceAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrTotalBillAmount', '₹' + (objPrintWordInfo.TotalBillAmount.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrConcessionAmt', '₹' + (objPrintWordInfo.ConcessionAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrNetPayableAmt', '₹' + (objPrintWordInfo.NetPayableAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrPaidAmount', '₹' + (objPrintWordInfo.PaidAmount.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(objPrintWordInfo.BillDate));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
      // this.printTemplate = this.printTemplate.replace('StrBillDate', this.transform1(objPrintWordInfo.BillDate));
      this.printTemplate = this.printTemplate.replace('SetMultipleRowsDesign', strrowslist);
      // this.printTemplate = this.printTemplate.replace('StrBillDate', this.transformBilld(this.reportPrintObj.BillDate));
      this.printTemplate = this.printTemplate.replace(/{{.*}}/g, '');
      setTimeout(() => {
        this.print();
      }, 1000);
    });
  }


  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy ');
    return value;
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
  transformBilld(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(this.reportPrintObj.BillDate, 'dd/MM/yyyy');
    return value;
  }
  convertToWord(e) {
    // this.numberInWords= converter.toWords(this.mynumber);
    // return converter.toWords(e);
  }
  // GET DATA FROM DATABASE 


  getPrint(el) {
    
    var D_data = {
      "BillNo": el.BillNo,
      
    }
   
    let printContents; 
    this.subscriptionArr.push(
      this._BrowseOPDBillsService.getBillPrint(D_data).subscribe(res => {

        this.reportPrintObjList = res as BrowseOPDBill[];
        
        this.reportPrintObj = res[0] as BrowseOPDBill;

        this.getTemplate();


      })
    );
  }

  // PRINT 
  print() {
    // HospitalName, HospitalAddress, AdvanceNo, PatientName
    let popupWin, printContents;
    // printContents =this.printTemplate; // document.getElementById('print-section').innerHTML;

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





  getViewbill(contact) {
    
    let xx = {

      RegNo: contact.RegId,
      AdmissionID: contact.VisitId,
      PatientName: contact.PatientName,
      Doctorname: contact.Doctorname,
      AdmDateTime: contact.AdmDateTime,
      AgeYear: contact.AgeYear,
      ClassId: contact.ClassId,
      TariffName: contact.TariffName,
      TariffId: contact.TariffId,
      HospitalAddress: contact.HospitalAddress,
      BDate: contact.BDate,
      BalanceAmt: contact.BalanceAmt,
      TotalAmt: contact.TotalAmt,
      BillDate: contact.BillDate,
      BillNo: contact.BillNo,
      ConcessionAmt: contact.ConcessionAmt,
      HospitalName: contact.HospitalName,
      NetPayableAmt: contact.NetPayableAmt,
      OPD_IPD_ID: contact.OPD_IPD_ID,
      OPD_IPD_Type: contact.OPD_IPD_Type,
      PBillNo: contact.PBillNo,
      PaidAmount: contact.PaidAmount,
      VisitDate: contact.VisitDate,
      TotalBillAmount: contact.TotalBillAmount,
      TransactionType: contact.TransactionType,
      ConsultantDocName: contact.ConsultantDocName,
      DepartmentName: contact.DepartmentName,
      AddedByName: contact.AddedByName,
      NetAmount: contact.NetAmount,
      ServiceName: contact.ServiceName,
      Price: contact.Price,
      Qty: contact.Qty,



    };
    this.advanceDataStored.storage = new BrowseOPDBill(xx);
    // const dialogRef = this._matDialog.open(ViewBillPaymentComponent,
    //   {
    //     maxWidth: "80vw",
    //     maxHeight: "100vh", width: '100%', height: "100%"
    //   });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed - Insert Action', result);
    // });
  }


  getRecord(contact, m): void {
   
    let AgeDay, AgeMonth, AgeYear, Age
    if (contact.Age != null || contact.AgeDay != null || contact.AgeMonth != null || contact.AgeYear != null) {
      Age = contact.Age.trim();
      AgeDay = contact.AgeDay.trim();
      AgeMonth = contact.AgeMonth.trim();
      AgeYear = contact.AgeYear.trim();
    }

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
          VisitDate: contact.VisitDate,
          BillNo:contact.BillNo
        };

        let PatientHeaderObj = {};

        PatientHeaderObj['Date'] = contact.VisitDate
        PatientHeaderObj['PatientName'] =contact.PatientName,
        PatientHeaderObj['OPD_IPD_Id'] =contact.RegId,
        PatientHeaderObj['NetPayAmount'] = contact.NetPayableAmt
        PatientHeaderObj['BillNo'] = contact.BillNo
        //  PatientHeaderObj['NetPayAmount'] = contact.NetPayableAmt
        // this._AppointmentSreviceService.populateFormpersonal(xx);
        this.advanceDataStored.storage = new SearchInforObj(xx);
        const dialogRef = this._matDialog.open(PaymentDetailComponent,
          {
            maxWidth: "70%",
            height: '600px',
            width: '100%',
            data: {
              advanceObj: PatientHeaderObj,
              FromName: "OP-Bill"
            }
          });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed - Insert Action', result);
          // this.getVisitList();
        });
      }
       
    }
 
    // /   this._ActRoute.navigate(['opd/appointment/op_bill'], {queryParams:{id:this.selectedID}})

  // }




export class ReportPrintObj {
  AdvanceNo: any;
  Address: any;
  HospitalName: any;
  RegNo: any;
  PatientName: any;
  IPDNo: any;
  Date: any;
  PatientType: any;
  AdvanceAmount: any;
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
  EmailId:any;
  ChargesDoctorName: string;
  TotalBillAmount: number;
  ConsultantDocName: string;
  DepartmentName: string;
  IsCancelled: boolean;
  OPD_IPD_Type: number;
  PBillNo: string;
  BDate: Date;
  VisitDate: Date;
  BalanceAmt: number;
  AddedByName: string;
Department:any;
Address:any;
MobileNo:any;
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
      this.PBillNo = BrowseOPDBill.PBillNo || '%';
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
      this.MobileNo=BrowseOPDBill.MobileNo || '';
    }
  }

}
