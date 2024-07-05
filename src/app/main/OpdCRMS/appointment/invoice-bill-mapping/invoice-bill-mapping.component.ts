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
  CGST = 0;
  SGST = 0;
  IGST = 0;

  CGSTAmount = 0;
  SGSTAmount = 0;
  IGSTAmount = 0;
  TotalAmount = 0;
  FinalTotalAmount = 0;
  caseList: any = [];
  visisttitlelist: any = [];
  StudyId: any;
  interimArray: any = [];
  totalTotalBillAmt: any;
  registerObj: InvoiceBillMap;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  FianlamtSGST: any = 0;
  FianlamtCGST: any = 0;
  FianlamtIGST: any = 0;
  Fianlamt: any = 0;
  Tabamt = 0;
  // reportPrintObjList: BrowseOPDBill[] = [];
  chargeslist: any = [];
    chargeslist1: any = [];

  screenFromString = 'OP-billing';
  displayedColumns = [
    'BillNo',
    'BillDate',
    'RegNo',
    'VisitTitle',
    'SubjectName',
    'TotalBillAmt',
    'action',
  ];
  displayedColumns1 = [
    'BillNo',
    'BillDate',
    'RegNo',
    'VisitTitle',
    'SubjectName',
    'TotalBillAmt',
    'action',
  ];



  dataSource = new MatTableDataSource<CaseDetail>();
  dataSourceSelected = new MatTableDataSource<CaseDetail>();
  
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

    this.getCaseList();
    
    this.getCasecombo();
    this.getVisistList();
  }


  // Create registered form group
  createForm() {
    this.registeredForm = this.formBuilder.group({
      InvoiceId: [''],
      CaseId: [''],
      VisitId:[''],
      InvoiceDate: [''],
      InvoiceTime: [''],
      TaxableAmount: [''],
      CGST: [''],
      SGST: [''],
      IGST: [''],
      CGSTAmount: [''],
      SGSTAmount: [''],
      IGSTAmount: [''],
      TotalAmount: [0],
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
  onAdd(row){
    // this.dataSourceSelected.data.push(row);
    this.chargeslist1.push(row);
    console.log(this.chargeslist1)

       
    // this.chargeslist.push(
    //   {
    //     // ItemID: row.ItemID,
    //     ItemName: row.ItemName,
    //     Price: row.price || 0,
    //     Qty:0,
    //     Amount : 0
    //   });
    // this.sIsLoading = '';
   //  console.log(this.chargeslist);
    this.dataSourceSelected.data = this.chargeslist1;
    console.log( this.dataSourceSelected.data)
  }

  



  getTotalAmount(element) {

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

  
  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { TotalBillAmt }) => sum += +(TotalBillAmt || 0), 0);
    this.TaxableAmount = netAmt;
    this.Tabamt = netAmt;
    this.FinalTotalAmount = this.Tabamt;
    return netAmt
  }


  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
    return value;
  }
  getTotalNetAmount() {

  }

  // tableElementChecked(event, element) {
  //   debugger;
  //   if (event.checked) {
  //     this.interimArray.push(element);
  //     this.dataSource1.data = this.interimArray;


  //     let netAmt = this.Fianlamt + this.dataSource1.data[0].TotalBillAmt;
  //     this.TaxableAmount = netAmt;
  //     this.Fianlamt = netAmt;
  //     // let total = Math.round(parseInt(this.TaxableAmount) * parseInt(this.CGST)).toString();


  //   } else if (this.interimArray.length > 0) {
  //     let index = this.interimArray.indexOf(element);
  //     if (index !== -1) {
  //       this.interimArray.splice(index, 1);
  //     }
  //   }

  //   console.log(this.dataSource1.data);
  // }


  getCasecombo() {

    this._opappointmentService.getCaseIDCombo().subscribe(data => {
      this.caseList = data;
      this.selectedcase = this.caseList[0].CaseId;

    });

  }

  getVisistList(){
    this._opappointmentService.getVisitTitleList().subscribe(data => {
      this.visisttitlelist = data;
    
    });
  }


  getCaseList() {
    this.registeredForm.reset;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "StudyId": this.registeredForm.get('CaseId').value.StudyId || 0,
      "VisitTitle": this.registeredForm.get('VisitId').value.VisitTitle|| '%'
    }
    console.log(D_data);
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._opappointmentService.getCaseIDList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as CaseDetail[];
        console.log(this.dataSource.data);
        this.chargeslist = this.dataSource.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }

  onSaveInvoice() {

    let insertInvoiceDetail = {};
    insertInvoiceDetail['InvoiceId'] = 0;
    insertInvoiceDetail['CaseId'] = this.registeredForm.get('CaseId').value.StudyId || 0;
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
    insertInvoiceDetail['InvoiceStatus'] = "Final";//this.registeredForm.get('InvoiceStatus').value || '';
    insertInvoiceDetail['CashCounterId'] = 0;// this.registeredForm.get('CashCounterId').value || 0;
    insertInvoiceDetail['createdBy'] = this.accountService.currentUserValue.user.id;


    let insertInvoiceBillDetailarray = [];

    this.dataSourceSelected.data.forEach((element) => {
      let InvoiceBillDetail = {};
      InvoiceBillDetail['InvoiceId'] = 0,
      InvoiceBillDetail['BillNo'] = element.BillNo || 0;
      InvoiceBillDetail['CreatedBy'] = this.accountService.currentUserValue.user.id;

      insertInvoiceBillDetailarray.push(InvoiceBillDetail);

    })

    let UpdateInvoiceBillarray = [];

    this.dataSourceSelected.data.forEach((element) => {
      let UpdateInvoiceBill = {};
      UpdateInvoiceBill['BillNo'] = element.BillNo;
      UpdateInvoiceBill['IsInvoiceGenerated'] = 1;
      UpdateInvoiceBill['InvoiceId'] = 0,

      UpdateInvoiceBillarray.push(UpdateInvoiceBill);

    })


    let submitData = {

      "insertInvoiceDetail": insertInvoiceDetail,
      "insertInvoiceBillDetail": insertInvoiceBillDetailarray,
      "updatebillInvoice":UpdateInvoiceBillarray
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

    var D_data = {
      "BillNo": 1,// el,
    }

    let printContents;
    this.subscriptionArr.push(
      this._opappointmentService.getFinancialSummarybudgetPrint(D_data).subscribe(res => {

        this.reportPrintObjList = res as BrowseOPDBill[];
        // console.log(this.reportPrintObjList);
        this.reportPrintObj = res[0] as BrowseOPDBill;

        this.getTemplate();

      })
    );


  }
  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=32';
    this._opappointmentService.getTemplate(query).subscribe((resData: any) => {

      this.printTemplate = resData[0].TempDesign;
      let keysArray = ['HospitalName', 'HospitalAddress', 'Phone', 'EmailId', 'PhoneNo', 'RegNo', 'BillNo', 'AgeYear', 'AgeDay', 'AgeMonth', 'PBillNo', 'PatientName', 'BillDate', 'VisitDate', 'ConsultantDocName', 'DepartmentName', 'ServiceName', 'ChargesDoctorName', 'Price', 'Qty', 'ChargesTotalAmount', 'TotalBillAmount', 'NetPayableAmt', 'NetAmount', 'ConcessionAmt', 'PaidAmount', 'BalanceAmt', 'AddedByName']; // resData[0].TempKeys;

      for (let i = 0; i < keysArray.length; i++) {
        let reString = "{{" + keysArray[i] + "}}";
        let re = new RegExp(reString, "g");
        this.printTemplate = this.printTemplate.replace(re, this.reportPrintObj[keysArray[i]]);
      }
      var strrowslist = "";
      for (let i = 1; i <= this.reportPrintObjList.length; i++) {

        var objreportPrint = this.reportPrintObjList[i - 1];

        let docname;
        if (objreportPrint.ChargesDoctorName)
          docname = objreportPrint.ChargesDoctorName;
        else
          docname = '';


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


      this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.PaidAmount));
      this.printTemplate = this.printTemplate.replace('StrPrintDate', this.transform2(this.currentDate.toString()));
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


  calculateGST() {
    debugger;
    this.TaxableAmount = parseInt(this.registeredForm.get('TaxableAmount').value);

      this.CGSTAmount = (Math.round((parseInt(this.TaxableAmount) * this.CGST) / 100));

      this.SGSTAmount = (Math.round((parseInt(this.TaxableAmount) * this.SGST) / 100));

      this.IGSTAmount = (Math.round((parseInt(this.TaxableAmount) * this.IGST) / 100));

      this.registeredForm.get('CGSTAmount').setValue(this.CGSTAmount);
      this.registeredForm.get('SGSTAmount').setValue(this.SGSTAmount); 
      this.registeredForm.get('IGSTAmount').setValue(this.IGSTAmount);

      this.FinalTotalAmount = parseInt(this.registeredForm.get('TaxableAmount').value) + 
      parseInt(this.registeredForm.get('CGSTAmount').value) +
      parseInt(this.registeredForm.get('SGSTAmount').value) +
      parseInt(this.registeredForm.get('IGSTAmount').value) ;

      this.registeredForm.get('TotalAmount').setValue(this.FinalTotalAmount);
    }

  



  onKeydown(event) {
    if (event.key === "Enter") {
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

  deleteTableRow1(element) {

    let index = this.chargeslist1.indexOf(element);
    if (index >= 0) {
      this.chargeslist1.splice(index, 1);
      this.dataSourceSelected.data = [];
      this.dataSourceSelected.data = this.chargeslist1;
    }
    Swal.fire('Success !', 'Selected Row Deleted Successfully', 'success');
  }
  convertToWord(e) {

    // return converter.toWords(e);
  }



  transform2(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform((new Date), 'dd/MM/yyyy h:mm a');
    return value;
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