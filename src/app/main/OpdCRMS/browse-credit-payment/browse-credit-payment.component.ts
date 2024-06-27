import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreditPaymentService } from './credit-payment.service';
import { AdvanceDataStored } from '../advance';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SearchInforObj } from '../appointment/bill-detail/bill-detail.component';
import { PaymentDetailComponent } from '../appointment/payment-detail/payment-detail.component';
import { fuseAnimations } from '@fuse/animations';
import { ViewBillPaymentComponent } from './view-bill-payment/view-bill-payment.component';
import { InvoiceBillMappingComponent } from '../appointment/invoice-bill-mapping/invoice-bill-mapping.component';

import * as converter from 'number-to-words';
import { ServicePaymentupdateComponent } from './service-paymentupdate/service-paymentupdate.component';
import { ConcessionReasonMasterModule } from 'app/main/setup/billing/concession-reason-master/concession-reason-master.module';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-browse-credit-payment',
  templateUrl: './browse-credit-payment.component.html',
  styleUrls: ['./browse-credit-payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BrowseCreditPaymentComponent implements OnInit {

  @Output() showClicked = new EventEmitter();
  click: boolean = false;
  MouseEvent = true;
  hasSelectedContacts: boolean;
  sIsLoading: string = '';
  dataArray = {};
  dataSource = new MatTableDataSource<BrowseOPDBill>();
  dsBillDet = new MatTableDataSource<BillDetails>();

  reportPrintObj: BrowseOPDBill;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  reportPrintObjList: BrowseOPDBill[] = [];
  currentDate = new Date();
  interimArray: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  caseList: any = [];
  selectedcase: any;
  selectedAdvanceObj: BrowseOPDBill;
  numberInWords!: string;
  // lang: SUPPORTED_LANGUAGE = 'en';
  value = 123;
  BrowseOPDBillsList: any;
  msg: any;

  isLoading = true;

  displayedColumns = [
    'InterExtBill',
    'Payment',
    'BillDate',
    'BillNo',
    'ProtocolNo',
    'SubjectName',
    'TotalAmt',
    'DiscAmount',
    'NetPayableAmt',
    'action'
  ];
  displayedColumnsBillDetails = [
    'ServiceName',
    'Price',
    'Qty',
    'TotalAmt',
    'indBillNo',
    'IndServiceName',
    'IndServiceAmount',
    'PaymentDate',
    'UTINo',
    'comments',
    'IsIncludeOrExclude',
    'action'
  ];

  showSpinner = false;
  tablehide = false;
  tableshow = true;
  menuActions: Array<string> = [];



  constructor(private _fuseSidebarService: FuseSidebarService,
    public _BrowseOPDBillsService: CreditPaymentService,
    public datePipe: DatePipe,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    // public toastr: ToastrService,
    private advanceDataStored: AdvanceDataStored,
    // private ngxNumToWordsService: NgxNumToWordsService,

  ) { }

  ngOnInit(): void {

    this.getCasecombo();
    if (this._ActRoute.url == '/opd/payment') {
      this.menuActions.push('Approval');
    }
    this.getBrowseOPDBillsList();
    this.onClear();
  }


  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  getCasecombo() {

    this._BrowseOPDBillsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].StudyId;

    });
  }

  onShow(event: MouseEvent) {
    // this.click = false;// !this.click;
    this.click = !this.click;
    // this. showSpinner = true;

    setTimeout(() => {
      {
        this.sIsLoading = 'loading';
        this.getBrowseOPDBillsList();
      }

    }, 1000);
    this.MouseEvent = true;
    this.click = true;

  }


  tableElementChecked(event, element) {
    if (event.checked) {
      this.interimArray.push(element);
    } else if (this.interimArray.length > 0) {
      let index = this.interimArray.indexOf(element);
      if (index !== -1) {
        this.interimArray.splice(index, 1);
      }
    }
  }


  onClear() {

    this._BrowseOPDBillsService.myFilterform.get('FirstName').reset('');
    this._BrowseOPDBillsService.myFilterform.get('LastName').reset('');
    this._BrowseOPDBillsService.myFilterform.get('RegNo').reset('');
    this._BrowseOPDBillsService.myFilterform.get('PBillNo').reset('');
  }



  getBrowseOPDBillsList() {
    this.sIsLoading = 'loading';
    var D_data = {
      "StudyId": this._BrowseOPDBillsService.myFilterform.get("StudyId").value.StudyId || 0,
      "F_Name": (this._BrowseOPDBillsService.myFilterform.get("FirstName").value).trim() + '%' || "%",
      "L_Name": (this._BrowseOPDBillsService.myFilterform.get("LastName").value).trim() + '%' || "%",
      "From_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("start").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      "To_Dt": this.datePipe.transform(this._BrowseOPDBillsService.myFilterform.get("end").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
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

  getBillDet(Param) {
    this.sIsLoading = 'loading';
    var D_data = {
      "BillNo":Param.BillNo
    }
    setTimeout(() => {
      this.sIsLoading = 'loading';
      this._BrowseOPDBillsService.getBillDet(D_data).subscribe(Visit => {
        this.dsBillDet.data = Visit as BillDetails[];
        console.log( this.dsBillDet.data)
        this.sIsLoading = this.dsBillDet.data.length == 0 ? 'no-data' : '';
        this.click = false;
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

    this.onClear();
  }


  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    // console.log(changes.dataArray.currentValue, 'new arrrrrrr');
    this.dataSource.data = changes.dataArray.currentValue as BrowseOPDBill[];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  NewBillpayment(contact) {
    console.log(contact)
    let PatientHeaderObj = {};
    PatientHeaderObj['Date'] = this.datePipe.transform(contact.BillDate, 'MM/dd/yyyy') || '01/01/1900',
    PatientHeaderObj['PatientName'] = contact.PatientName;
    PatientHeaderObj['OPD_IPD_Id'] = contact.vOPIPId;
    PatientHeaderObj['NetPayAmount'] = contact.NetPayableAmt;
    PatientHeaderObj['BillId'] = contact.BillNo;

  
    const dialogRef = this._matDialog.open(PaymentDetailComponent,
      {
        maxWidth: "100vw",
        height: '600px',
        width: '100%',
        data: {
          advanceObj: PatientHeaderObj,
          FromName: "OP-Bill"
        }
      });



  }


  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=2';
    this._BrowseOPDBillsService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['HospitalName', 'HospitalAddress', 'Phone', 'EmailId', 'PhoneNo', 'RegNo', 'BillNo', 'AgeYear', 'AgeDay', 'AgeMonth', 'PBillNo', 'PatientName', 'BillDate', 'VisitDate', 'ConsultantDocName', 'DepartmentName', 'ServiceName', 'ChargesDoctorName', 'Price', 'Qty', 'ChargesTotalAmount', 'TotalBillAmount', 'NetPayableAmt', 'NetAmount', 'ConcessionAmt', 'PaidAmount', 'BalanceAmt', 'AddedByName', 'Address', 'MobileNo']; // resData[0].TempKeys;

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

      this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.TotalBillAmount));

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
    return converter.toWords(e);
  }
  // GET DATA FROM DATABASE 


  getPrint(el) {
    debugger;
    var D_data = {
      "BillNo": el.BillNo,
      // "BillNo":111,
    }
    el.bgColor = 'red';
    //console.log(el);
    let printContents; //`<div style="padding:20px;height:550px"><div><div style="display:flex"><img src="http://localhost:4200/assets/images/logos/Airmid_NewLogo.jpeg" width="90"><div><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="color:#464343">6158, Siddheshwar peth, near zilla parishad, solapur-3 phone no.: (0217) 2323001 / 02</div><div style="color:#464343">www.yashodharahospital.org</div></div></div><div style="border:1px solid grey;border-radius:16px;text-align:center;padding:8px;margin-top:5px"><span style="font-weight:700">IP ADVANCE RECEIPT</span></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex;justify-content:space-between"><div style="display:flex"><div style="width:100px;font-weight:700">Advance No</div><div style="width:10px;font-weight:700">:</div><div>6817</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Reg. No</div><div style="width:10px;font-weight:700">:</div><div>117399</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Date</div><div style="width:10px;font-weight:700">:</div><div>26/06/2019&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3:15:49PM</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex;width:477px"><div style="width:100px;font-weight:700">Patient Name</div><div style="width:10px;font-weight:700">:</div><div>Mrs. Suglabai Dhulappa Waghmare</div></div><div style="display:flex"><div style="width:60px;font-weight:700">IPD No</div><div style="width:10px;font-weight:700">:</div><div>IP/53757/2019</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:100px;font-weight:700">DOA</div><div style="width:10px;font-weight:700">:</div><div>30/10/2019</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:100px;font-weight:700">Patient Type</div><div style="width:10px;font-weight:700">:</div><div>Self</div></div></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Advacne Amount</div><div style="width:10px;font-weight:700">:</div><div>4,000.00</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:150px;font-weight:700">Amount in Words</div><div style="width:10px;font-weight:700">:</div><div>FOUR THOUSANDS RUPPEE ONLY</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Reason of Advance</div><div style="width:10px;font-weight:700">:</div><div></div></div></div></div><div style="position:relative;top:100px;text-align:right"><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="font-weight:700;font-size:16px">Cashier</div><div>Paresh Manlor</div></div></div>`;
    this.subscriptionArr.push(
      this._BrowseOPDBillsService.getBillPrint(D_data).subscribe(res => {

        this.reportPrintObjList = res as BrowseOPDBill[];
        console.log(this.reportPrintObjList);
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
    console.log(contact);
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
    const dialogRef = this._matDialog.open(ViewBillPaymentComponent,
      {
        maxWidth: "80vw",
        maxHeight: "100vh", width: '100%', height: "100%"
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
    });
  }

  ServicePaymentupdate(contact){
    console.log(contact)
    this.advanceDataStored.storage = new BrowseOPDBill(contact);
    const dialogRef = this._matDialog.open(ServicePaymentupdateComponent,
      {
        maxWidth: "60vw",
        maxHeight: "30vh", width: '100%', height: "100%",
        data:{
          registerObj:contact
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
    });
  }


   getRecord(contact, m): void {
    console.log(contact);
    // this.VisitID = contact.VisitId;
    let AgeDay, AgeMonth, AgeYear, Age
    if (contact.Age != null || contact.AgeDay != null || contact.AgeMonth != null || contact.AgeYear != null) {
      Age = contact.Age.trim();
      AgeDay = contact.AgeDay.trim();
      AgeMonth = contact.AgeMonth.trim();
      AgeYear = contact.AgeYear.trim();
    }
  }

  
  SetExcludeflag(element){
    debugger
    
    let Query = "Update AddCharges set IsIncludeOrExclude=1  where  ChargesId=" + element.ChargesId;
    console.log(Query)
    this._BrowseOPDBillsService.getSetexcludeservice(Query).subscribe(data => {
      let Status = data[0];
      if(Status){
       Swal.fire("Service Exclued From List")
      }else{
        Swal.fire("Service Not Exclued From List")
        return;
      }
    });
  }
  


}




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
  EmailId: any;
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
  Department: any;
  Address: any;
  MobileNo: any;
  StudyId: number;
  ProtocolNo: any;
  SubjectName: any;


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
      this.MobileNo = BrowseOPDBill.MobileNo || '';

      this.StudyId = BrowseOPDBill.StudyId || 0;
      this.ProtocolNo = BrowseOPDBill.ProtocolNo || '';
      this.SubjectName = BrowseOPDBill.SubjectName || '';
    }
  }

}
export class BillDetails {
  BillNo: Number;
  PBillNo: any;
  ServiceName:string;
  Price:any;
  Qty: string;
  TotalAmt: string;
  IndBillId: string;
  IndChargeId: string;
  IndServiceId: number;
  IndServiceName: number;
  IndServiceAmount: any;
  ChargesId: any;
  UTINo:any;
  Comments:any;
  IsIncludeOrExclude:any;
  /**
   * Constructor
   *
   * @param BillDetails
   */
  constructor(BillDetails) {
    {
      this.BillNo = BillDetails.BillNo || '';
      this.PBillNo = BillDetails.PBillNo || '';
      this.ServiceName = BillDetails.ServiceName || '';
      this.Price = BillDetails.Price || '';
      this.Qty = BillDetails.Qty || '';
      this.TotalAmt = BillDetails.TotalAmt || '';
      this.IndBillId = BillDetails.IndBillId || '';
      this.IndChargeId = BillDetails.IndChargeId || '';
      this.IndServiceId = BillDetails.IndServiceId || '';
      this.IndServiceName = BillDetails.IndServiceName || '';
      this.IndServiceAmount = BillDetails.IndServiceAmount || '';
      this.ChargesId = BillDetails.ChargesId || '';
      this.UTINo = BillDetails.UTINo || '';
      this.Comments = BillDetails.Comments || '';
      this.IsIncludeOrExclude=BillDetails.IsIncludeOrExclude || 0
    }
  }

}

