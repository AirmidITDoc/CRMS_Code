import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
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

type NewType = Observable<any[]>;


@Component({
  selector: 'app-invoice-bill-mapping',
  templateUrl: './invoice-bill-mapping.component.html',
  styleUrls: ['./invoice-bill-mapping.component.scss']
})
export class InvoiceBillMappingComponent implements OnInit {

 
  click: boolean = false;
  hasSelectedContacts: boolean;
  InvoiceId:any;
  CaseId: any;
  InvoiceDate:any;
  InvoiceTime:any;
  TaxableAmount:any;
  CGST:any;
  SGST:any;
  IGST:any; 
  TotalAmount:any; 
  ApprovalStatus:any;
  ApprovedBy:any;
  ApprovedDate: any;
  InvoiceStatus:any;
  CashCounterId:any;


  registerObj: InvoiceBillMap;
  subscriptionArr: Subscription[] = [];
  printTemplate: any;
  // reportPrintObjList: BrowseOPDBill[] = [];
  chargeslist: any = [];
  screenFromString = 'OP-billing';
  displayedColumns = [
    // 'checkbox',

    'ChargesDate',
    'ServiceName',
    'Price',
    'Qty',
    'TotalAmt',
    'DiscPer',
    'DiscAmt',
    'NetAmount',
    'ChargeDoctorName',
    'ClassName',
    'ChargesAddedName',
    'action'
  ];




  dataSource = new MatTableDataSource<ChargesList>();
  myControl = new FormControl();
  filteredOptions: any;
  billingServiceList = [];
  showAutocomplete = false;


  isLoading: String = '';
  selectedAdvanceObj: InvoiceBillMap;
  isFilteredDateDisabled: boolean = true;
  currentDate = new Date();

  registeredForm: FormGroup;
  
  netPaybleAmt: any;
  netPaybleAmt1: any;
  TotalnetPaybleAmt: any;

  // private lookups: ILookup[] = [];
  private nextPage$ = new Subject();
  
  private _onDestroy = new Subject<void>();

  resBillId: Post;


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


    }

  VisitListCombo() {
   
  }


  focusNextPrice() {
    this.renderer.selectRootElement('#Price').focus();
  }

  focusNextQty() {
    this.renderer.selectRootElement('#qty').focus();
  }

  focusNextbtnAdd() {
    this.renderer.selectRootElement('#DoctorId').focus();

  }
  

  // Create registered form group
  createForm() {
    this.registeredForm = this.formBuilder.group({
      InvoiceId: [''],
      CaseId: [''],
      InvoiceDate: [''],
      InvoiceTime:  [''],
      TaxableAmount:  [''],
      CGST:  [''],
      SGST:  [''], 
      IGST: [''], 
      TotalAmount: [''], 
      ApprovalStatus: [''],
      ApprovedBy: [''],
      ApprovedDate:  [''],
      InvoiceStatus:  [''],
      CashCounterId:  [''],
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

 

  getOptionText(option) {
    // debugger;
    if (!option)
      return '';
    return option.ServiceName;  // + ' ' + option.Price ; //+ ' (' + option.TariffId + ')';

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

  }
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
    return value;
  }
  getTotalNetAmount() {
    
  }

  tableElementChecked(event, element) {

    // if (event.checked) {
    //   this.interimArray.push(element);
    // } else if (this.interimArray.length > 0) {
    //   let index = this.interimArray.indexOf(element);
    //   if (index !== -1) {
    //     this.interimArray.splice(index, 1);
    //   }
    // }
  }

  getInterimData() {
    // console.log('this.interimArray==', this.interimArray);
    // this._matDialog.open(InterimComponentComponent,
    //   { data: this.interimArray });
  }

  
  onSaveOPBill() {
   

    let insertInvoiceDetail = {};
    
   
    insertInvoiceDetail['InvoiceId'] = 0;
    insertInvoiceDetail['CaseId'] = this.registeredForm.get('CaseId ').value || '';
    insertInvoiceDetail['InvoiceDate'] =  this.registerObj.InvoiceDate;
    insertInvoiceDetail['InvoiceTime'] = this.registerObj.InvoiceTime;
    insertInvoiceDetail['TaxableAmount'] = this.registeredForm.get('TaxableAmount').value || '';
    insertInvoiceDetail['CGST'] =  this.registeredForm.get('CGST').value || 0;
    insertInvoiceDetail['SGST'] =this.registeredForm.get('SGST').value || '';
    insertInvoiceDetail['IGST'] = this.registeredForm.get('IGST ').value || '';
    insertInvoiceDetail['TotalAmount'] =this.registeredForm.get('TotalAmount').value || '';
    insertInvoiceDetail['ApprovalStatus'] =  this.registeredForm.get('ApprovalStatus').value || 0;
      insertInvoiceDetail['ApprovedBy'] =this.registeredForm.get('ApprovedBy').value || '';
      insertInvoiceDetail['ApprovedDate'] =this.registerObj.ApprovedDate;
    insertInvoiceDetail['InvoiceStatus'] =this.registeredForm.get('InvoiceStatus ').value || '';
    insertInvoiceDetail['CashCounterId'] = this.registeredForm.get('CashCounterId ').value || 0;
    insertInvoiceDetail['createdBy'] = this.accountService.currentUserValue.user.id;
 

    let insertInvoiceBillDetailarray = [];
    let chargesDetailInsert = {};

    this.dataSource.data.forEach((element) => {
      let InvoiceBillDetail = {};
      InvoiceBillDetail['InvoiceId'] = 0,
      // InvoiceBillDetail['BillNo'] = this.registeredForm.get('CashCounterId ').value || 0;
      InvoiceBillDetail['CreatedBy'] =this.accountService.currentUserValue.user.id;
 
    

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
        Swal.fire('Credit Bill With !', 'Invoice Bill Mapping Generated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            let m = response;
            // this.getPrint(m);
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', ' Billing data not saved', 'error');
      }
      this.isLoading = '';
    });

  }



  onSaveEntry() {
    debugger;
   
    this.isLoading = 'save';

    // if (this.SrvcName && (parseInt(this.b_price) != 0) && this.b_qty) {
    this.isLoading = 'save';
    this.dataSource.data = [];
    this.chargeslist.push(
      {
      
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource.data = this.chargeslist;
    console.log(this.dataSource.data);
    

    // }
    
    this.getTotalNetAmount();
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

  

  calculateTotalAmt() {
   
  }

  calculatePersc() {
  
  }



  calculatePersc1() {
  
  }

  calculatechargesDiscamt() {
  
  }

  calculateDiscamtfinal() {
    
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
  InvoiceId:any;
   CaseId:any;
   InvoiceDate :any;
   InvoiceTime:any;
   TaxableAmount:any;
   CGST:any;  
   SGST:any;  
   IGST:any;  
   TotalAmount:any;  
   ApprovalStatus:any;
   ApprovedBy:any;
   ApprovedDate:any;
   InvoiceStatus:any;
   currentDate=new Date();
   CashCounterId:any;
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
       this.InvoiceDate = InvoiceBillMap.InvoiceDate ||  this.currentDate;
       this.InvoiceTime = InvoiceBillMap.InvoiceTime || this.currentDate;
       this.TaxableAmount = InvoiceBillMap.TaxableAmount || '';
       this.CGST = InvoiceBillMap.CGST || 0;
       this.SGST = InvoiceBillMap.SGST || '';
       this.IGST = InvoiceBillMap.IGST || '';
    
       this.TotalAmount = InvoiceBillMap.TotalAmount || '';
       this.ApprovalStatus = InvoiceBillMap.ApprovalStatus || '';
       this.ApprovedBy = InvoiceBillMap.ApprovedBy || '';
       this.ApprovedDate = InvoiceBillMap.ApprovedDate ||  this.currentDate;
 
       this.InvoiceStatus = InvoiceBillMap.InvoiceStatus || '';
       this.CashCounterId = InvoiceBillMap.CashCounterId || '';
      
     }
   }
 }
 
 




function takeWhileInclusive(arg0: (p: any) => boolean): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}