import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subscription } from 'rxjs';
import { InvoiceBillService } from './invoice-bill.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdvanceDataStored } from '../../advance';
import { fuseAnimations } from '@fuse/animations';
import { InvoiceBillMappingComponent } from '../invoice-bill-mapping/invoice-bill-mapping.component';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Component({
  selector: 'app-browse-invoice-list',
  templateUrl: './browse-invoice-list.component.html',
  styleUrls: ['./browse-invoice-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BrowseInvoiceListComponent implements OnInit {


  @Output() showClicked = new EventEmitter();
  click: boolean = false;
  MouseEvent = true;
  hasSelectedContacts: boolean;
  sIsLoading: string = '';
  dataArray = {};
  dataSource = new MatTableDataSource<InvoiceBilll>();
  reportPrintObj: InvoiceBilll;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  reportPrintObjList: InvoiceBilll[] = [];
  currentDate = new Date();
  interimArray: any = [];
  caseList: any = [];
  selectedcase: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  selectedAdvanceObj: InvoiceBilll;
  numberInWords!: string;
  // lang: SUPPORTED_LANGUAGE = 'en';
  value = 123;
  InvoiceBilllsList: any;
  msg: any;

  isLoading = true;

  displayedColumns = [

    // 'InvoiceId',
    // 'InvoiceNumber',
    'CaseId',
    'ProtocolNo',
    'ProtocolTitle',
    'InvoiceDate',
    'TaxableAmount',
    'CGST',
    'SGST',
    'IGST',
    'TotalAmount',
    'ApprovalStatus',
    'ApprovedBy',
    'action'
  ];


  showSpinner = false;
  tablehide = false;
  tableshow = true;
  menuActions: Array<string> = [];



  constructor(private _fuseSidebarService: FuseSidebarService,
    public _InvoiceBilllsService: InvoiceBillService,
    private accountService: AuthenticationService,
    public datePipe: DatePipe,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,
    // private ngxNumToWordsService: NgxNumToWordsService,

  ) { }

  ngOnInit(): void {
    this.getCasecombo();

    if (this._ActRoute.url == '/opd/payment') {
      this.menuActions.push('Approval');

    }

    debugger;
    var D_data = {
      // '2023-07-06 00:00:00.000'
      "FromDate":this.datePipe.transform(this._InvoiceBilllsService.myFilterform.get("start").value, "yyyy-MM-dd 00:00:00.000") || '2023-07-28 00:00:00.000',
      "ToDate": this.datePipe.transform(this._InvoiceBilllsService.myFilterform.get("end").value, "yyyy-MM-dd 00:00:00.000") || '2023-07-28 00:00:00.000',
      "StudyId": this._InvoiceBilllsService.myFilterform.get("StudyId").value.StudyId || 0
    }
    console.log(D_data);

    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._InvoiceBilllsService.getBrowseInvoiceBillsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as InvoiceBilll[];
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
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

  


  getCasecombo() {

    this._InvoiceBilllsService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

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

        this.getInvoiceBilllsList();
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

    // this._InvoiceBilllsService.myFilterform.get('FirstName').reset('');
    // this._InvoiceBilllsService.myFilterform.get('LastName').reset('');
    // this._InvoiceBilllsService.myFilterform.get('RegNo').reset('');
    this._InvoiceBilllsService.myFilterform.get('StudyId').reset('');
  }



  getInvoiceBilllsList() {
    debugger
    this.sIsLoading = 'loading-data';

    var D_data = {
      "StudyId": this._InvoiceBilllsService.myFilterform.get("StudyId").value.StudyId || 0,
      "FromDate": this.datePipe.transform(this._InvoiceBilllsService.myFilterform.get("start").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900',
      "ToDate": this.datePipe.transform(this._InvoiceBilllsService.myFilterform.get("end").value, "yyyy-MM-dd 00:00:00.000") || '01/01/1900'
         
    }
    // console.log(D_data);

    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._InvoiceBilllsService.getBrowseInvoiceBillsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as InvoiceBilll[];
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
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


  InvoiceGenerate(){
    const dialogRef = this._matDialog.open(InvoiceBillMappingComponent,
      {
        maxWidth: "75%",
        height: '800px',
        width: '100%',
        data: {
          registerObj: this.dataSource
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
      // this.getVisitList();
    });
  }



  onExport(exprtType) {
    // let columnList=[];
    // if(this.dataSource.data.length == 0){
    //   // this.toastr.error("No Data Found");
    //   Swal.fire('Error !', 'No Data Found', 'error');
    // }
    // else{
    //   var excelData = [];
    //   var a=1;
    //   for(var i=0;i<this.dataSource.data.length;i++){
    //     let singleEntry = {
    //       // "Sr No":a+i,
    //       "Bill Date" :this.dataSource.data[i]["BillDate"],
    //       "PBill No" :this.dataSource.data[i]["PBillNo"] ? this.dataSource.data[i]["PBillNo"]:"N/A",
    //       "RegNo " :this.dataSource.data[i]["RegNo"] ? this.dataSource.data[i]["RegNo"] :"N/A",
    //       "Patient Name" :this.dataSource.data[i]["PatientName"] ? this.dataSource.data[i]["PatientName"] : "N/A",
    //       "Total Amt" :this.dataSource.data[i]["TotalAmt"] ? this.dataSource.data[i]["TotalAmt"]:"N/A",
    //       "Concession Amt" :this.dataSource.data[i]["ConcessionAmt"] ? this.dataSource.data[i]["ConcessionAmt"]:"N/A",
    //       "NetPayable Amt" :this.dataSource.data[i]["NetPayableAmt"] ? this.dataSource.data[i]["NetPayableAmt"]:"N/A",
    //       "PaidAmount" :this.dataSource.data[i]["PaidAmount"] ? this.dataSource.data[i]["PaidAmount"]:"N/A",
    //       "BalanceAmt" :this.dataSource.data[i]["BalanceAmt"]?this.dataSource.data[i]["BalanceAmt"]:"N/A",
    //       "chkBalanceAmt" :this.dataSource.data[i]["chkBalanceAmt"]?this.dataSource.data[i]["chkBalanceAmt"]:"N/A"
    //     };
    //     excelData.push(singleEntry);
    //   }
    //   var fileName = "OutDoor-Bill-List " + new Date() +".xlsx";
    //   if(exprtType =="Excel"){
    //     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(excelData);
    //     var wscols = [];
    //     if(excelData.length > 0){ 
    //       var columnsIn = excelData[0]; 
    //       console.log(columnsIn);
    //       for(var key in columnsIn){
    //         let headerLength = {wch:(key.length+1)};
    //         let columnLength = headerLength;
    //         try{
    //           columnLength = {wch: Math.max(...excelData.map(o => o[key].length), 0)+1}; 
    //         }
    //         catch{
    //           columnLength = headerLength;
    //         }
    //         if(headerLength["wch"] <= columnLength["wch"]){
    //           wscols.push(columnLength)
    //         }
    //         else{
    //           wscols.push(headerLength)
    //         }
    //       } 
    //     }
    //     ws['!cols'] = wscols;
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     XLSX.writeFile(wb, fileName);
    //   }else{
    //     let doc = new jsPDF('p','pt', 'a4');
    //     doc.page = 0;
    //     var col=[];
    //     for (var k in excelData[0]) col.push(k);
    //       console.log(col.length)
    //     var rows = [];
    //     excelData.forEach(obj => {
    //       console.log(obj)
    //       let arr = [];
    //       col.forEach(col => {
    //         arr.push(obj[col]);
    //       });
    //       rows.push(arr);
    //     });

    //     doc.autoTable(col, rows,{
    //       margin:{left:5,right:5,top:5},
    //       theme:"grid",
    //       styles: {
    //         fontSize: 3
    //       }});
    //     doc.setFontSize(3);
    //     // doc.save("Indoor-Patient-List.pdf");
    //     window.open(URL.createObjectURL(doc.output("blob")))
    //   }
    // }
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
    // value = datePipe.transform(this.reportPrintObj.BillDate, 'dd/MM/yyyy');
    return value;
  }
  convertToWord(e) {
    // this.numberInWords= converter.toWords(this.mynumber);
    // return converter.toWords(e);
  }
  // GET DATA FROM DATABASE 


  getPrint(el) {
    debugger;
    var D_data = {
      "InvoiceId": el.InvoiceId,

    }
    // el.bgColor = 'red';
    //console.log(el);
    let printContents; //`<div style="padding:20px;height:550px"><div><div style="display:flex"><img src="http://localhost:4200/assets/images/logos/Airmid_NewLogo.jpeg" width="90"><div><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="color:#464343">6158, Siddheshwar peth, near zilla parishad, solapur-3 phone no.: (0217) 2323001 / 02</div><div style="color:#464343">www.yashodharahospital.org</div></div></div><div style="border:1px solid grey;border-radius:16px;text-align:center;padding:8px;margin-top:5px"><span style="font-weight:700">IP ADVANCE RECEIPT</span></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex;justify-content:space-between"><div style="display:flex"><div style="width:100px;font-weight:700">Advance No</div><div style="width:10px;font-weight:700">:</div><div>6817</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Reg. No</div><div style="width:10px;font-weight:700">:</div><div>117399</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Date</div><div style="width:10px;font-weight:700">:</div><div>26/06/2019&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3:15:49PM</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex;width:477px"><div style="width:100px;font-weight:700">Patient Name</div><div style="width:10px;font-weight:700">:</div><div>Mrs. Suglabai Dhulappa Waghmare</div></div><div style="display:flex"><div style="width:60px;font-weight:700">IPD No</div><div style="width:10px;font-weight:700">:</div><div>IP/53757/2019</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:100px;font-weight:700">DOA</div><div style="width:10px;font-weight:700">:</div><div>30/10/2019</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:100px;font-weight:700">Patient Type</div><div style="width:10px;font-weight:700">:</div><div>Self</div></div></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Advacne Amount</div><div style="width:10px;font-weight:700">:</div><div>4,000.00</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:150px;font-weight:700">Amount in Words</div><div style="width:10px;font-weight:700">:</div><div>FOUR THOUSANDS RUPPEE ONLY</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Reason of Advance</div><div style="width:10px;font-weight:700">:</div><div></div></div></div></div><div style="position:relative;top:100px;text-align:right"><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="font-weight:700;font-size:16px">Cashier</div><div>Paresh Manlor</div></div></div>`;
    this.subscriptionArr.push(
      this._InvoiceBilllsService.getInvoiceBillPrint(D_data).subscribe(res => {

        this.reportPrintObjList = res as InvoiceBilll[];
        console.log(this.reportPrintObjList);
        this.reportPrintObj = res[0] as InvoiceBilll;

        this.getTemplate();


      })
    );
  }


  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=16';
    this._InvoiceBilllsService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['InvoiceId', 'BillNo', 'InvoiceNumber', 'CaseId', 'InvoiceDate', 'InvoiceTime', 'TaxableAmount', 'CGST', 'SGST', 'IGST', 'ApprovalStatus', 'TotalAmount', 'ApprovedBy', 'ApprovedDate', 'InvoiceStatus']; // resData[0].TempKeys;
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
        <div style="display:flex;width:80px;text-align:left;">
            <div>`+ objreportPrint.CaseId + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:80px;text-align:left;">
        <div>`+ objreportPrint.BillNo + `</div> <!-- <div>BLOOD UREA</div> -->
    </div>
        <div style="display:flex;width:80px;text-align:left;">
        <div>`+ objreportPrint.CGST + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:80px;text-align:left;">
            <div>`+ objreportPrint.SGST + `</div> <!-- <div>450</div> -->
        </div>
        <div style="display:flex;width:80px;text-align:left;">
            <div>`+ objreportPrint.IGST + `</div> <!-- <div>1</div> -->
        </div>
        <div style="display:flex;width:110px;text-align:center;">
            <div>`+ objreportPrint.ApprovalStatus + `</div> <!-- <div>450</div> -->
        </div>
        <div style="display:flex;width:110px;text-align:center;">
        <div>`+ '₹' + objreportPrint.TotalAmount.toFixed(2) + `</div> <!-- <div>450</div> -->
    </div>
    <div style="display:flex;width:110px;text-align:center;">
    <div>`+ objreportPrint.ApprovedBy + `</div> <!-- <div>450</div> -->
    </div>
    <div style="display:flex;width:110px;text-align:center;">
    <div>`+ objreportPrint.ApprovedDate + `</div> <!-- <div>450</div> -->
    </div>
    <div style="display:flex;width:110px;text-align:center;">
    <div>`+ objreportPrint.InvoiceStatus + `</div> <!-- <div>450</div> -->
    </div>
        </div>`;
        strrowslist += strabc;
      }
      var objPrintWordInfo = this.reportPrintObjList[0];


      this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.TotalAmount));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
      this.printTemplate = this.printTemplate.replace('SetMultipleRowsDesign', strrowslist);

      this.printTemplate = this.printTemplate.replace(/{{.*}}/g, '');
      setTimeout(() => {
        this.print();
      }, 1000);
    });
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
      ApprovedDate: contact.ApprovedDate


    };
    this.advanceDataStored.storage = new InvoiceBilll(xx);
    // const dialogRef = this._matDialog.open(ViewBillPaymentComponent,
    //   {
    //     maxWidth: "80vw",
    //     maxHeight: "100vh", width: '100%', height: "100%"
    //   });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed - Insert Action', result);
    // });
  }


  getRecord(contact): void {
    debugger
    if (contact.ApprovalStatus == 0) {
      Swal.fire({
        title: 'Do you want to Approve the Invoice ',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
let Appby= this.accountService.currentUserValue.user.id;

var datePipe = new DatePipe("en-US");
let date = datePipe.transform((new Date), "yyyy-MM-dd");

     
        if (result.isConfirmed) {
          let Query = "Update T_InvoiceDetails set ApprovalStatus = 'OK',ApprovedBy= " + Appby + " ,ApprovedDate = " + date + " where InvoiceId=" + contact.InvoiceId + " ";
          console.log(Query)
          this._InvoiceBilllsService.ApprovedInvoice(Query).subscribe(data => {
                console.log(data)
                Swal.fire("Invoice is Approved Successfully")
                this.InvoiceBilllsList();
          });
        }

      })

    }else{
      Swal.fire("Invoice is Already Approved Successfully")
    }

    //   if (m == "Approval") {
    //     console.log(contact);
    //    let xx = {
    //         RegNo: contact.RegId,
    //         RegId: contact.RegId,
    //         AdmissionID: contact.VisitId,
    //         PatientName: contact.PatientName,
    //         Doctorname: contact.Doctorname,
    //         AdmDateTime: contact.AdmDateTime,
    //         AgeYear: contact.AgeYear,
    //         ClassId: contact.ClassId,
    //         ClassName: contact.ClassName,
    //         TariffName: contact.TariffName,
    //         TariffId: contact.TariffId,
    //         VisitId: contact.VisitId,
    //         VisitDate: contact.VisitDate,
    //         BillNo:contact.BillNo
    //       };

    //       let PatientHeaderObj = {};

    //       PatientHeaderObj['Date'] = contact.VisitDate
    //       PatientHeaderObj['PatientName'] =contact.PatientName,
    //       PatientHeaderObj['OPD_IPD_Id'] =contact.RegId,
    //       PatientHeaderObj['NetPayAmount'] = contact.NetPayableAmt
    //       PatientHeaderObj['BillNo'] = contact.BillNo
    //       //  PatientHeaderObj['NetPayAmount'] = contact.NetPayableAmt
    //       // this._AppointmentSreviceService.populateFormpersonal(xx);
    //       this.advanceDataStored.storage = new SearchInforObj(xx);
    //       const dialogRef = this._matDialog.open(BillApproveComponent,
    //         {
    //           maxWidth: "90%",
    //           height: '600px',
    //           width: '100%',
    //           data: {
    //             advanceObj: PatientHeaderObj,
    //             FromName: "OP-Bill"
    //           }
    //         });
    //       dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed - Insert Action', result);
    //         // this.getVisitList();
    //       });
    //     }

  }

  // /   this._ActRoute.navigate(['opd/appointment/op_bill'], {queryParams:{id:this.selectedID}})

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



export class InvoiceBilll {
  InvoiceId: any;
  BillNo: any;
  InvoiceNumber: any;
  CaseId: any;
  ProtocolNo:any;
  ProtocolTitle:any;
  InvoiceDate: any;
  InvoiceTime: any;
  TaxableAmount: any;
  CGST: any;
  SGST: any;
  IGST: any;
  ApprovalStatus: any;
  TotalAmount: any;
  ApprovedBy: any;
  ApprovedDate: any;
  InvoiceStatus: any;
  /**
   * Constructor
   *
   * @param InvoiceBilll
   */
  constructor(InvoiceBilll) {
    {
      this.InvoiceId = InvoiceBilll.InvoiceId || '';
      this.BillNo = InvoiceBilll.BillNo || '';
      this.InvoiceNumber = InvoiceBilll.InvoiceNumber || '';
      this.CaseId = InvoiceBilll.CaseId || '';
      this.ProtocolNo = InvoiceBilll.ProtocolNo || '';
      this.ProtocolTitle = InvoiceBilll.ProtocolTitle || '';
    
      this.InvoiceDate = InvoiceBilll.InvoiceDate || '';
      this.InvoiceTime = InvoiceBilll.InvoiceTime || '';
      this.TaxableAmount = InvoiceBilll.TaxableAmount || '';
      this.CGST = InvoiceBilll.CGST || '';
      this.SGST = InvoiceBilll.SGST || '';
      this.IGST = InvoiceBilll.IGST || '';
      this.ApprovalStatus = InvoiceBilll.ApprovalStatus || '';
      this.TotalAmount = InvoiceBilll.TotalAmount || '';
      this.ApprovedBy = InvoiceBilll.ApprovedBy || '';
      this.ApprovedDate = InvoiceBilll.ApprovedDate || '';
      this.InvoiceStatus = InvoiceBilll.InvoiceStatus || '';

    }
  }

}
