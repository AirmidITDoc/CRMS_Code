import { Component, Inject, OnInit } from '@angular/core';
import { BrowseOPDBill } from '../browse-credit-payment.component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AdvanceDataStored } from '../../advance';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { CreditPaymentService } from '../credit-payment.service';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Component({
  selector: 'app-view-bill-payment',
  templateUrl: './view-bill-payment.component.html',
  styleUrls: ['./view-bill-payment.component.scss']
})
export class ViewBillPaymentComponent implements OnInit {

  selectedAdvanceObj: BrowseOPDBill;
  // selectedAdvanceObj: IpBillBrowseList;
  subscriptionArr: Subscription[] = [];
  reportPrintObj: BrowseOPDBill;
   SummaryData:any=[];  
   printTemplate: any;
   reportPrintObjList: BrowseOPDBill[] = [];
   dataSource = new MatTableDataSource<BrowseOPDBill>();
   rptData: any;
   Today:any
 mynumber:number=0;
 outputWords='';
 
 
   // type Employee = Array<{ ServiceName: String; Qty: number;Price:number; }>;
 
 
   constructor(  private advanceDataStored: AdvanceDataStored,
     public datePipe: DatePipe,
     public _matDialog: MatDialog,
     public _BrowseOPDBillsService:CreditPaymentService,
       @Inject(MAT_DIALOG_DATA) public data: any,
     private accountService: AuthenticationService,) { 
       this.rptData = data;
     }
 
   ngOnInit(): void {
     this.Today = [(new Date()).toISOString()];
 
     if (this.advanceDataStored.storage) {
       this.selectedAdvanceObj = this.advanceDataStored.storage;
       
     }
       
      this.getPrint(this.selectedAdvanceObj.BillNo);
      this.convertToWord(this.selectedAdvanceObj.PaidAmount);
      
   }
   
   convertToWord(e){
     // this.outputWords= converter.toWords(this.mynumber);
    //  this.outputWords= converter.toWords(e);
 
     }
 
   
     
 
     getPrint(el) {
       debugger;
          var D_data = {
            "BillNo": el,
          }
          // el.bgColor = 'red';
          //console.log(el);
          let printContents; //`<div style="padding:20px;height:550px"><div><div style="display:flex"><img src="http://localhost:4200/assets/images/logos/Airmid_NewLogo.jpeg" width="90"><div><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="color:#464343">6158, Siddheshwar peth, near zilla parishad, solapur-3 phone no.: (0217) 2323001 / 02</div><div style="color:#464343">www.yashodharahospital.org</div></div></div><div style="border:1px solid grey;border-radius:16px;text-align:center;padding:8px;margin-top:5px"><span style="font-weight:700">IP ADVANCE RECEIPT</span></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex;justify-content:space-between"><div style="display:flex"><div style="width:100px;font-weight:700">Advance No</div><div style="width:10px;font-weight:700">:</div><div>6817</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Reg. No</div><div style="width:10px;font-weight:700">:</div><div>117399</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Date</div><div style="width:10px;font-weight:700">:</div><div>26/06/2019&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3:15:49PM</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex;width:477px"><div style="width:100px;font-weight:700">Patient Name</div><div style="width:10px;font-weight:700">:</div><div>Mrs. Suglabai Dhulappa Waghmare</div></div><div style="display:flex"><div style="width:60px;font-weight:700">IPD No</div><div style="width:10px;font-weight:700">:</div><div>IP/53757/2019</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:100px;font-weight:700">DOA</div><div style="width:10px;font-weight:700">:</div><div>30/10/2019</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:100px;font-weight:700">Patient Type</div><div style="width:10px;font-weight:700">:</div><div>Self</div></div></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Advacne Amount</div><div style="width:10px;font-weight:700">:</div><div>4,000.00</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:150px;font-weight:700">Amount in Words</div><div style="width:10px;font-weight:700">:</div><div>FOUR THOUSANDS RUPPEE ONLY</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Reason of Advance</div><div style="width:10px;font-weight:700">:</div><div></div></div></div></div><div style="position:relative;top:100px;text-align:right"><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="font-weight:700;font-size:16px">Cashier</div><div>Paresh Manlor</div></div></div>`;
          this.subscriptionArr.push(
            this._BrowseOPDBillsService.getBillPrint(D_data).subscribe(res => {
      
              this.reportPrintObjList = res as BrowseOPDBill[];
              console.log(this.reportPrintObjList);
              this.reportPrintObj = res[0] as BrowseOPDBill;
              this.convertToWord(this.reportPrintObj.PaidAmount);
           
            })
          );
        }
     
 
 
 
 
 
   
   onClose() {
     
     this._matDialog.closeAll();
   }
 
 }
 
