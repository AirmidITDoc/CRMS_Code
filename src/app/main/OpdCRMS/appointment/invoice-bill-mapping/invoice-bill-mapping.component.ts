import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowseOPDBill, ChargesList } from '../appointment.component';
import { Observable, ReplaySubject, Subject, Subscription, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawer } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AppointmentService } from '../appointment.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvanceDataStored } from '../../advance';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { CaseDetail } from '../../case-detail/new-case-detail/new-case-detail.component';
import { ViewFinancialSummarybudgetComponent } from './view-financial-summarybudget/view-financial-summarybudget.component';

type NewType = Observable<any[]>;


@Component({
  selector: 'app-invoice-bill-mapping',
  templateUrl: './invoice-bill-mapping.component.html',
  styleUrls: ['./invoice-bill-mapping.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class InvoiceBillMappingComponent implements OnInit {


  click: boolean = false;
  hasSelectedContacts: boolean;
  InvoiceId: any;
  CaseId: any;
  InvoiceDate: any;
  InvoiceTime: any;
  TaxableAmount: any;
  CGST: any;
  SGST: any;
  IGST: any;
  TotalAmount: any;
  caseList: any = [];
  StudyId: any;
  interimArray: any = [];
  totalTotalBillAmt: any;
  registerObj: InvoiceBillMap;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  // reportPrintObjList: BrowseOPDBill[] = [];
  chargeslist: any = [];
  screenFromString = 'OP-billing';
  displayedColumns = [
    'checkbox',
    'BillNo',
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
  dataSource1 = new MatTableDataSource<CaseDetail>();

  myControl = new FormControl();
  filteredOptions: any;
  billingServiceList = [];
  showAutocomplete = false;


  isLoading: String = '';
  selectedAdvanceObj: InvoiceBillMap;
  isFilteredDateDisabled: boolean = true;
  currentDate = new Date();
  reportPrintObjList: BrowseOPDBill[] = [];
  registeredForm: FormGroup;
  selectedcase: any;
  netPaybleAmt: any;
  netPaybleAmt1: any;
  TotalnetPaybleAmt: any;
  sIsLoading: any;
  reportPrintObj: BrowseOPDBill;
  // private lookups: ILookup[] = [];
  private nextPage$ = new Subject();

  private _onDestroy = new Subject<void>();

  resBillId: Post;
  sort: any;
  paginator: any;


  constructor(
    private _fuseSidebarService: FuseSidebarService,

    public _opappointmentService: AppointmentService,
    public element: ElementRef<HTMLElement>,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private advanceDataStored: AdvanceDataStored,
    private renderer: Renderer2,
    public datePipe: DatePipe,
    private accountService: AuthenticationService,
    private dialogRef: MatDialogRef<InvoiceBillMappingComponent>,
    public _httpClient: HttpClient,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {


    this.createForm();

    if (this.advanceDataStored.storage) {
      this.selectedAdvanceObj = this.advanceDataStored.storage;
      console.log(this.selectedAdvanceObj)
    }

    if (this.data) {

    }

    this.getCaseList();
    this.getCasecombo();

  }


  // Create registered form group
  createForm() {
    this.registeredForm = this.formBuilder.group({
      InvoiceId: [''],
      CaseId: [''],
      InvoiceDate: [''],
      InvoiceTime: [''],
      TaxableAmount: [''],
      CGST: [''],
      SGST: [''],
      IGST: [''],
      TotalAmount: [''],
      ApprovalStatus: [''],
      ApprovedBy: [''],
      // ApprovedDate:[{ value: this.registerObj.ApprovedDate }],
      InvoiceStatus: [''],
      CashCounterId: [''],
    });
  }



  //  ===================================================================================
  filterStates(name: string) {
    let tempArr = [];

    this.billingServiceList.forEach((element) => {
      if (element.ServiceName.toString().toLowerCase().search(name) !== -1) {
        tempArr.push(element);
      }
    });
    return tempArr;
  }

  onOptionSelected(selectedItem) {

  }

  updatedVal(e) {
    if (e && e.length >= 2) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }

  }




  getTotalAmount(element) {
    // debugger
    if (element.Price && element.Qty) {
      let totalAmt;
      totalAmt = parseInt(element.Price) * parseInt(element.Qty);
      element.TotalAmt = totalAmt;
      element.NetAmount = totalAmt;

      this.getDiscAmount(element);

    }
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  getDiscAmount(element) {
    let netAmt = parseInt(element.Price) * parseInt(element.Qty);
    if (element.ConcessionPercentage) {
      let discAmt = (netAmt * parseInt(element.ConcessionPercentage)) / 100;
      element.DiscAmt = discAmt;
      element.NetAmount = netAmt - discAmt;
    }
  }

  getDiscValue(element) {
    let netAmt = parseInt(element.Price) * parseInt(element.Qty);
    if (element.DiscAmt) {
      element.ConcessionPercentage = (parseInt(element.DiscAmt) * 100) / netAmt;
      element.NetAmount = netAmt - parseInt(element.DiscAmt);
    }
  }

  openBillInfo() {

  }




  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { TotalBillAmt }) => sum += +(TotalBillAmt || 0), 0);
    this.TaxableAmount = netAmt;

    console.log(this.TaxableAmount);

    return netAmt
  }


  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
    return value;
  }
  getTotalNetAmount() {

  }

  tableElementChecked(event, element) {

    if (event.checked) {
      this.interimArray.push(element);
      this.dataSource1.data = this.interimArray;

    } else if (this.interimArray.length > 0) {
      let index = this.interimArray.indexOf(element);
      if (index !== -1) {
        this.interimArray.splice(index, 1);
      }
    }

    console.log(this.dataSource1.data);
  }

  getInterimData() {
    // console.log('this.interimArray==', this.interimArray);
    // this._matDialog.open(InterimComponentComponent,
    //   { data: this.interimArray });
  }

  getCasecombo() {

    this._opappointmentService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

  }



  getCaseList() {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "StudyId": this.registeredForm.get('CaseId').value.CaseId || 0
    }
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._opappointmentService.getCaseIDList(D_data).subscribe(Visit => {
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

  onSaveOPBill() {

    debugger;
    let insertInvoiceDetail = {};


    insertInvoiceDetail['InvoiceId'] = 0;
    insertInvoiceDetail['CaseId'] = this.registeredForm.get('CaseId').value.CaseId || 0;
    insertInvoiceDetail['InvoiceDate'] = this.dateTimeObj.date;// this.registerObj.InvoiceDate;
    insertInvoiceDetail['InvoiceTime'] = this.dateTimeObj.time;
    insertInvoiceDetail['TaxableAmount'] = this.registeredForm.get('TaxableAmount').value || 0;
    insertInvoiceDetail['CGST'] = this.registeredForm.get('CGST').value || 0;
    insertInvoiceDetail['SGST'] = this.registeredForm.get('SGST').value || 0;
    insertInvoiceDetail['IGST'] = this.registeredForm.get('IGST').value || 0;
    insertInvoiceDetail['TotalAmount'] = this.registeredForm.get('TotalAmount').value || 0;
    insertInvoiceDetail['ApprovalStatus'] = 0,// this.registeredForm.get('ApprovalStatus').value || 0;
      insertInvoiceDetail['ApprovedBy'] = "",//this.registeredForm.get('ApprovedBy').value || '';
      insertInvoiceDetail['ApprovedDate'] = this.dateTimeObj.date;// this.dateTimeObj.date;//this.registerObj.ApprovedDate;
    insertInvoiceDetail['InvoiceStatus'] = "";//this.registeredForm.get('InvoiceStatus').value || '';
    insertInvoiceDetail['CashCounterId'] = 0;// this.registeredForm.get('CashCounterId').value || 0;
    insertInvoiceDetail['createdBy'] = this.accountService.currentUserValue.user.id;


    let insertInvoiceBillDetailarray = [];

    this.dataSource1.data.forEach((element) => {
      let InvoiceBillDetail = {};
      InvoiceBillDetail['InvoiceId'] = 0,
        InvoiceBillDetail['BillNo'] = element.BillNo || 0;
      InvoiceBillDetail['CreatedBy'] = this.accountService.currentUserValue.user.id;

      insertInvoiceBillDetailarray.push(InvoiceBillDetail);
      // console.log(InsertAdddetArr.length);
    })


    let submitData = {

      "insertInvoiceDetail": insertInvoiceDetail,
      "insertInvoiceBillDetail": insertInvoiceBillDetailarray

    };
    console.log(submitData);
    this._opappointmentService.InvoiceBillMappingInsert(submitData).subscribe(response => {
      if (response) {
        Swal.fire('Invoice Bill  !', 'Invoice Bill Mapping Generated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            let m = response;
            this.getPrint(m);
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', ' Invoice data not saved', 'error');
      }
      this.isLoading = '';
    });

  }



  getPrint(el) {
    debugger;
    var D_data = {
      "BillNo": 1,// el,
    }

    // let printContents; 
    // this.subscriptionArr.push(
    //   this._opappointmentService.getFinancialSummarybudgetPrint(D_data).subscribe(res => {

    //     this.reportPrintObjList = res as BrowseOPDBill[];
    //     console.log(this.reportPrintObjList);
    //     this.reportPrintObj = res[0] as BrowseOPDBill;

    //     this.getTemplate();

    //   })
    // );

    const dialogRef = this._matDialog.open(ViewFinancialSummarybudgetComponent,
      {
        maxWidth: "75vw",
        height: '1560px',
        width: '100%',
        // data : {
        //   registerObj : xx,
        // }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
      //  this.getCaseList();
    });


  }
  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=32';
    this._opappointmentService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['HospitalName', 'HospitalAddress', 'Phone', 'EmailId', 'PhoneNo', 'RegNo', 'BillNo', 'AgeYear', 'AgeDay', 'AgeMonth', 'PBillNo', 'PatientName', 'BillDate', 'VisitDate', 'ConsultantDocName', 'DepartmentName', 'ServiceName', 'ChargesDoctorName', 'Price', 'Qty', 'ChargesTotalAmount', 'TotalBillAmount', 'NetPayableAmt', 'NetAmount', 'ConcessionAmt', 'PaidAmount', 'BalanceAmt', 'AddedByName']; // resData[0].TempKeys;
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

        let docname;
        if (objreportPrint.ChargesDoctorName)
          docname = objreportPrint.ChargesDoctorName;
        else
          docname = '';

        //   var strabc = `<hr style="border-color:white" >
        //   <div style="display:flex;margin:8px 0">
        //   <div style="display:flex;width:60px;margin-left:20px;">
        //       <div>`+ i + `</div> <!-- <div>BLOOD UREA</div> -->
        //   </div>
        //   <div style="display:flex;width:370px;margin-left:10px;text-align:left;">
        //       <div>`+ objreportPrint.ServiceName + `</div> <!-- <div>BLOOD UREA</div> -->
        //   </div>
        //   // <div style="display:flex;width:370px;margin-left:30px;text-align:left;">
        //   // <div>`+ docname + `</div> <!-- <div>BLOOD UREA</div> -->
        //   // </div>
        //   <div style="display:flex;width:90px;margin-left:40px;text-align:right;">
        //       <div>`+ '₹' + objreportPrint.Price.toFixed(2) + `</div> <!-- <div>450</div> -->
        //   </div>
        //   <div style="display:flex;width:60px;margin-left:40px;text-align:right;">
        //       <div>`+ objreportPrint.Qty + `</div> <!-- <div>1</div> -->
        //   </div>
        //   <div style="display:flex;width:140px;margin-left:40px;text-align:left;">
        //       <div>`+ '₹' + objreportPrint.NetAmount.toFixed(2) + `</div> <!-- <div>450</div> -->
        //   </div>
        //   </div>`;
        //   strrowslist += strabc;
        // }

        var strabc = `<hr style="border-color:white" >
        <div style="display:flex;margin:8px 0">
        <div style="display:flex;width:60px;margin-left:20px;">
            <div>`+ i + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:300px;margin-left:10px;text-align:left;">
            <div>`+ objreportPrint.ServiceName + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:300px;margin-left:10px;text-align:left;">
        <div>`+ docname + `</div> <!-- <div>BLOOD UREA</div> -->
        </div>
        <div style="display:flex;width:80px;margin-left:10px;text-align:left;">
            <div>`+ '₹' + objreportPrint.Price.toFixed(2) + `</div> <!-- <div>450</div> -->
        </div>
        <div style="display:flex;width:80px;margin-left:10px;text-align:left;">
            <div>`+ objreportPrint.Qty + `</div> <!-- <div>1</div> -->
        </div>
        <div style="display:flex;width:110px;margin-left:30px;text-align:center;">
            <div>`+ '₹' + objreportPrint.NetAmount.toFixed(2) + `</div> <!-- <div>450</div> -->
        </div>
        </div>`;
        strrowslist += strabc;
      }
      var objPrintWordInfo = this.reportPrintObjList[0];
      let concessinamt;
      // if (objPrintWordInfo.ConcessionAmt > 0) {
      //   this.printTemplate = this.printTemplate.replace('StrConcessionAmt', '₹' + (objPrintWordInfo.ConcessionAmt.toFixed(2)));
      // }
      // else {
      //   this.printTemplate = this.printTemplate.replace('StrConcessionAmt', '₹' + (objPrintWordInfo.ConcessionAmt.toFixed(2)));
      // }

      this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.PaidAmount));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
      this.printTemplate = this.printTemplate.replace('SetMultipleRowsDesign', strrowslist);
      // this.printTemplate = this.printTemplate.replace('StrBalanceAmt', '₹' + (objPrintWordInfo.BalanceAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrTotalBillAmount', '₹' + (objPrintWordInfo.TotalBillAmount.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrConcessionAmt', '₹' + (objPrintWordInfo.ConcessionAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrNetPayableAmt', '₹' + (objPrintWordInfo.NetPayableAmt.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrPaidAmount', '₹' + (objPrintWordInfo.PaidAmount.toFixed(2)));
      // this.printTemplate = this.printTemplate.replace('StrBillDate', this.transformBilld(this.reportPrintObj.BillDate));
      this.printTemplate = this.printTemplate.replace('SetMultipleRowsDesign', strrowslist);


      this.printTemplate = this.printTemplate.replace(/{{.*}}/g, '');
      setTimeout(() => {
        this.print();
      }, 1000);
    });
  }



  displayWith(lookup) {
    return lookup ? lookup.ItemName : null;
  }

  onScroll() {
    //Note: This is called multiple times after the scroll has reached the 80% threshold position.
    this.nextPage$.next();
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }


  calculateCGST() {
    let net;

    if (this.TaxableAmount && this.CGST) {
      net = Math.round(parseInt(this.TaxableAmount) * parseInt(this.CGST)).toString();
      this.TotalAmount = net;
    }

    }


    calculateSGST(){
      let net;

      if (this.TaxableAmount && this.SGST) {
        net = Math.round(parseInt(this.TotalAmount) + parseInt(this.SGST)).toString();
        this.TotalAmount = net;
      }
    }



    calculateIGST(){
      let net;

      if (this.TaxableAmount && this.IGST) {
        net = Math.round(parseInt(this.TotalAmount) + parseInt(this.IGST)).toString();
        this.TotalAmount = net;
      }
    }

    onKeydown(event) {
      if (event.key === "Enter") {
        // console.log(event);

      }
    }


    deleteTableRow(element) {

      // debugger;
      let index = this.chargeslist.indexOf(element);
      if (index >= 0) {
        this.chargeslist.splice(index, 1);
        this.dataSource.data = [];
        this.dataSource.data = this.chargeslist;
      }
      Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');
    }

    showAllFilter(event) {
      console.log(event.value);
      this.isFilteredDateDisabled = event.value;
    }

    backNavigate() {
      // this._location.back();
    }





    convertToWord(e) {

      // return converter.toWords(e);
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
      // var datePipe = new DatePipe("en-US");
      // value = datePipe.transform(this.reportPrintObj.BillDate, 'dd/MM/yyyy');
      // return value;
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

    onClose() {
      this.dialogRef.close();
    }

  }


export class Bill {
  BillNo: number;
  OPD_IPD_ID: number;
  TotalAmt: number;
  ConcessionAmt: number;
  NetPayableAmt: number;
  PaidAmt: number;
  BalanceAmt: number;
  BillDate: any;
  OPD_IPD_Type: number;
  AddedBy: number;
  TotalAdvanceAmount: number;
  BillTime: Date;
  ConcessionReasonId: number;
  IsSettled: boolean;
  IsPrinted: boolean;
  IsFree: boolean;
  CompanyId: number;
  TariffId: number;
  UnitId: number;
  InterimOrFinal: number;
  CompanyRefNo: any;
  ConcessionAuthorizationName: number;
  TaxPer: any;
  TaxAmount: any;
  DiscComments: String;
  CashCounterId: any;

  constructor(InsertBillUpdateBillNoObj) {
    {
      this.BillNo = InsertBillUpdateBillNoObj.BillNo || 0;
      this.OPD_IPD_ID = InsertBillUpdateBillNoObj.OPD_IPD_ID || 0;
      this.TotalAmt = InsertBillUpdateBillNoObj.TotalAmt || 0;
      this.ConcessionAmt = InsertBillUpdateBillNoObj.ConcessionAmt || 0;
      this.NetPayableAmt = InsertBillUpdateBillNoObj.NetPayableAmt || 0;
      this.PaidAmt = InsertBillUpdateBillNoObj.PaidAmt || 0;
      this.BalanceAmt = InsertBillUpdateBillNoObj.BalanceAmt || 0;
      this.BillDate = InsertBillUpdateBillNoObj.BillDate || '';
      this.OPD_IPD_Type = InsertBillUpdateBillNoObj.OPD_IPD_Type || 0;
      this.AddedBy = InsertBillUpdateBillNoObj.AddedBy || 0;
      this.TotalAdvanceAmount = InsertBillUpdateBillNoObj.TotalAdvanceAmount || 0;
      this.BillTime = InsertBillUpdateBillNoObj.BillTime || '';
      this.ConcessionReasonId = InsertBillUpdateBillNoObj.ConcessionReasonId || 0;
      this.IsSettled = InsertBillUpdateBillNoObj.IsSettled || 0;
      this.IsPrinted = InsertBillUpdateBillNoObj.IsPrinted || 0;
      this.IsFree = InsertBillUpdateBillNoObj.IsFree || 0;
      this.CompanyId = InsertBillUpdateBillNoObj.CompanyId || 0;
      this.TariffId = InsertBillUpdateBillNoObj.TariffId || 0;
      this.UnitId = InsertBillUpdateBillNoObj.UnitId || 0;
      this.InterimOrFinal = InsertBillUpdateBillNoObj.InterimOrFinal || 0;
      this.CompanyRefNo = InsertBillUpdateBillNoObj.CompanyRefNo || 0;
      this.ConcessionAuthorizationName = InsertBillUpdateBillNoObj.ConcessionAuthorizationName || 0;
      this.TaxPer = InsertBillUpdateBillNoObj.TaxPer || 0;
      this.TaxAmount = InsertBillUpdateBillNoObj.TaxAmount || 0;
      this.DiscComments = InsertBillUpdateBillNoObj.DiscComments || 0;
      this.CashCounterId = InsertBillUpdateBillNoObj.CashCounterId || 0;
    }
  }
}

export class BillDetails {
  BillNo: number;
  ChargesId: number;

  constructor(BillDetailsInsertObj) {
    {
      this.BillNo = BillDetailsInsertObj.BillNo || 0;
      this.ChargesId = BillDetailsInsertObj.ChargesId || 0;
      //this.BillDetailId=BillDetailsInsertObj.BillDetailId || 0;
    }
  }
}


export class AddChargesInsert {


  ChargeID: number;
  ChargesDate: Date;
  OPD_IPD_Type: number;
  OPD_IPD_Id: number;
  ServiceId: any;
  Price: number;
  Qty: number;
  TotalAmt: String;
  ConcessionPercentage: String;
  ConcessionAmount: any;
  NetAmount: number;
  DoctorId: String;
  DocPercentage: String;
  DocAmt: any;
  HospitalAmt: number;
  IsGenerated: boolean;
  AddedBy: number;
  IsCancelled: boolean;
  IsCancelledBy: String;
  IsCancelledDate: number;
  CashCounterId: number;
  IsPathology: boolean;
  IsRadiology: boolean;
  IsPackage: boolean;
  PackageMainChargeID: any;
  IsSelfOrCompanyService: boolean;
  PackageId: String;
  ChargeTime: any;
  ClassId: number;

  /**
  * Constructor
  *
  * @param AddChargesInsert
  */
  constructor(AddChargesInsertObj) {
    {
      this.ChargeID = AddChargesInsertObj.ChargeID || 0;
      this.ChargesDate = AddChargesInsertObj.ChargesDate || 0;
      this.OPD_IPD_Type = AddChargesInsertObj.OPD_IPD_Type || 0;
      this.OPD_IPD_Id = AddChargesInsertObj.OPD_IPD_Id || '';
      this.ServiceId = AddChargesInsertObj.ServiceId || '';
      this.Price = AddChargesInsertObj.Price || 0;
      this.Qty = AddChargesInsertObj.Qty || 0;
      this.TotalAmt = AddChargesInsertObj.TotalAmt || '';
      this.ConcessionPercentage = AddChargesInsertObj.ConcessionPercentage || '';
      this.ConcessionAmount = AddChargesInsertObj.ConcessionAmount || '';
      this.NetAmount = AddChargesInsertObj.NetAmount || 0;
      this.DoctorId = AddChargesInsertObj.DoctorId || 0;
      this.DocPercentage = AddChargesInsertObj.DocPercentage || '';
      this.DocAmt = AddChargesInsertObj.DocAmt || '';
      this.HospitalAmt = AddChargesInsertObj.HospitalAmt || 0;
      this.IsGenerated = AddChargesInsertObj.IsGenerated || 0;
      this.AddedBy = AddChargesInsertObj.AddedBy || 0;
      this.IsCancelled = AddChargesInsertObj.IsCancelled || 0;
      this.IsCancelledBy = AddChargesInsertObj.IsCancelledBy || '';
      this.IsCancelledDate = AddChargesInsertObj.IsCancelledDate || 0;
      this.IsPathology = AddChargesInsertObj.IsPathology || false;
      this.IsRadiology = AddChargesInsertObj.IsRadiology || 0;
      this.IsPackage = AddChargesInsertObj.IsPackage || '';
      this.PackageMainChargeID = AddChargesInsertObj.PackageMainChargeID || '';
      this.IsSelfOrCompanyService = AddChargesInsertObj.IsSelfOrCompanyService || 0;
      this.PackageId = AddChargesInsertObj.PackageId || 0;
      this.ChargeTime = AddChargesInsertObj.ChargeTime || 0;
      this.ClassId = AddChargesInsertObj.ClassId || 0;

    }
  }
}

export class Post {
  BillNo: any;

  constructor(Post) {
    {
      this.BillNo = Post.BillNo || 0;
    }
  }
}



// function takeWhileInclusive(arg0: (p: any) => boolean): import("rxjs").OperatorFunction<unknown, unknown> {
//   throw new Error('Function not implemented.');
// }
// select * from Bill order by 1 desc
// select * from BillDetails order by 1 desc
// select * from lvwBill order by 1 desc
// select * from AddCharges where ChargesId=21
// select * from ServiceMaster where ServiceId=21
// exec rptBillPrint 611755


export class InvoiceBillMap {
  InvoiceId: any;
  CaseId: any;
  InvoiceDate: Date;
  InvoiceTime: Date;
  TaxableAmount: any;
  CGST: any;
  SGST: any;
  IGST: any;
  TotalAmount: any;
  ApprovalStatus: any;
  ApprovedBy: any;
  ApprovedDate: any;
  InvoiceStatus: any;
  currentDate = new Date();
  CashCounterId: any;
  // CreatedBy    [b


  /**
   * Constructor
   *
   * @param InvoiceBillMap
   */

  constructor(InvoiceBillMap) {
    {
      this.InvoiceId = InvoiceBillMap.InvoiceId || '';
      this.CaseId = InvoiceBillMap.CaseId || '';
      this.InvoiceDate = InvoiceBillMap.InvoiceDate || this.currentDate;
      this.InvoiceTime = InvoiceBillMap.InvoiceTime || this.currentDate;
      this.TaxableAmount = InvoiceBillMap.TaxableAmount || '';
      this.CGST = InvoiceBillMap.CGST || 0;
      this.SGST = InvoiceBillMap.SGST || '';
      this.IGST = InvoiceBillMap.IGST || '';

      this.TotalAmount = InvoiceBillMap.TotalAmount || '';
      this.ApprovalStatus = InvoiceBillMap.ApprovalStatus || '';
      this.ApprovedBy = InvoiceBillMap.ApprovedBy || '';
      this.ApprovedDate = InvoiceBillMap.ApprovedDate || this.currentDate;

      this.InvoiceStatus = InvoiceBillMap.InvoiceStatus || '';
      this.CashCounterId = InvoiceBillMap.CashCounterId || '';

    }
  }
}






function takeWhileInclusive(arg0: (p: any) => boolean): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}