import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrowseOPDBill, VisitMaster } from '../appointment.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AppointmentService } from '../appointment.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-screen-bill-detail',
  templateUrl: './patient-screen-bill-detail.component.html',
  styleUrls: ['./patient-screen-bill-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PatientScreenBillDetailComponent implements OnInit {

  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  hasSelectedContacts: boolean;
  currentDate = new Date();
  subscriptions: Subscription[] = [];
  screenFromString = 'admission-form';
  printTemplate: any;
  registeredForm: FormGroup;
  subscriptionArr: Subscription[] = [];
  StudyId: 0;
  totalAmtOfNetAmt: any;
  VisitID: any;
  selectedAdvanceObj: VisitMaster;
  reportPrintObjList: BrowseOPDBill[] = [];
  reportPrintObj: BrowseOPDBill;
  Billbutton = false;
  RegId:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
    'VisitDate',
    'VisitTime',
    'ProtocolNo',
    'SubjectName',
    'PBillNo',
    'BillAmount',
    'BillId',
    'action',
  ];


  dataSource = new MatTableDataSource<VisitMaster>();

  displayedColumns1 = [
    'VisitDate',
    'VisitTime',
    'ProtocolNo',
    'SubjectName',
    'PBillNo',
    'BillAmount',
    'BillId',
    'action',
  ];
  dataSource1 = new MatTableDataSource<VisitMaster>();

  displayedColumns2 = [
    'VisitDate',
    'VisitTime',
    'ProtocolNo',
    'SubjectName',
    'PBillNo',
    'BillAmount',
    'BillId',
    'action',
  ];
  dataSource2 = new MatTableDataSource<VisitMaster>();



  displayedColumns3 = [
    'VisitDate',
    'VisitTime',
    'ProtocolNo',
    'SubjectName',
    'PBillNo',
    'BillAmount',
    'BillId',
    'action',
  ];
  dataSource3 = new MatTableDataSource<VisitMaster>();




  menuActions: Array<string> = [];
  //datePipe: any;

  constructor(
    public _AppointmentService: AppointmentService,
    private _ActRoute: Router,
    private _fuseSidebarService: FuseSidebarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,
    private formBuilder: FormBuilder
    // private advanceDataStored: AdvanceDataStored
  ) {
    this.getBillList();
  }

  ngOnInit(): void {


    if (this.data) {
      console.log(this.data);
      this.StudyId = this.data.element.Title;

      this.selectedAdvanceObj = this.data.element;
      console.log(this.selectedAdvanceObj)


    }
   
    this.getBillList();
    this.getVisitdetail();
    // this.dataSource.data.refresh();

  }

  
  getVisitdetail(){
    this.sIsLoading = 'loading-data';
    var D_data = {
        "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentService.getVisitdetailsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as VisitMaster[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }

  getApiBillList(){
    this.sIsLoading = 'loading-data';
    var D_data = {
        "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentService.getVisitdetailsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as VisitMaster[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }


  getApiBilldetail(){
    this.sIsLoading = 'loading-data';
    var D_data = {
        "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentService.getVisitdetailsList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as VisitMaster[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';

      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);
  }

  getBillList() {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "StudyId": this.data.StudyId,
      "RegId": this.data.element.RegId
    };
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._AppointmentService.getPatientScreeningBillingList(D_data).subscribe(Visit => {
        this.dataSource.data = Visit as VisitMaster[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sIsLoading = '';

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
    // this._AppointmentService.myFilterform.reset(
    //   {
    //     start: [],
    //     end: []
    //   }
    // );
  }


  getGeneratebill(contact) {
    debugger
    let BillId = contact.BillId
    if (BillId != 0) {
      Swal.fire("Bill Already Generated")
    } else {
      var m = {
        "VisitId": contact.VisitId,
        "StudyId": contact.StudyId,
        "StudyVisitId": contact.StudyVisitId
      };
      console.log(m);
      this._AppointmentService.getBillGeneration(m).subscribe(data => {
        this.sIsLoading = '';
        console.log(data)
      },
        error => {
          this.sIsLoading = '';
        });
    }
    this.getBillList();
  }




  getApicode(){

    
    this.sIsLoading = 'submit';


    let BillDetail = {};
    BillDetail['emergencyFlag'] = "0",
      BillDetail['billTotalAmount'] = "";
    BillDetail['advance'] = "0";
    BillDetail['billDate'] = "";
    BillDetail['paymentType'] = "CREDIT";
    BillDetail['referralName'] = " ";
    BillDetail['otherReferral'] = "";
    BillDetail['sampleId'] = "";
    BillDetail['orderNumber'] = " ";
    BillDetail['referralIdLH'] = "";
    BillDetail['organisationName'] = "";
    BillDetail['billConcession'] = "0",
      BillDetail['additionalAmount'] = "0",
      BillDetail['organizationIdLH'] = "440132",
      BillDetail['comments'] = "CGHS";

    let testList = [];
    this.dataSource1.data.forEach((element) => {
      let testListInsertObj = {};
      testListInsertObj['testCode'] = ''// element.ServiceName;
      testList.push(testListInsertObj);
    });
    BillDetail["testList"] = testList;



    let paymentListarr = [];
    let paymentList = {};
    paymentList['paymentType'] = "CREDIT",
      paymentList['paymentAmount'] = "";
    paymentList['chequeNo'] = "";
    paymentList['issueBank'] = "";
    paymentListarr.push(paymentList);


    BillDetail["paymentList"] = paymentListarr;

    let submitData = {
      "mobile": "",
      "email": "",
      "designation": "Mr.",
      "fullName": "AirmidTest",//this.dataSource.data[0].PatientName,
      "age": 81,
      "gender": "Female",
      "area": "",
      "city": "",
      "patientType": "IPD",
      "labPatientId": "HISPATIENTID",
      "pincode": " ",
      "patientId": "",
      "dob": "",
      "passportNo": "",
      "panNumber": "",
      "aadharNumber": "",
      "insuranceNo": "",
      "nationalityethnicity": "",
      "ethnicity": "",
      "nationalIdentityNumber": "",
      "workerCode": "w12",
      "doctorCode": "",
      "billDetails": BillDetail


    };
    console.log(submitData);
    this._AppointmentService.InsertLabDetail(submitData).subscribe(response => {
      if (response) {
        Swal.fire('Bill Detail Send Successfully !', 'success').then((result) => {
        });
      } else {
        Swal.fire('Error !', 'Bill Detail  not Send', 'error');
      }
      this.sIsLoading = '';
    });
  }

  // field validation 
  // get f() { return this._AppointmentService.myFilterform.controls; }
  selectRow(row) {
    this.selectRow = row;
  }





  getTemplate() {
    let query = 'select TempId,TempDesign,TempKeys as TempKeys from Tg_Htl_Tmp where TempId=2';
    this._AppointmentService.getTemplate(query).subscribe((resData: any) => {

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

      // this.printTemplate = this.printTemplate.replace('StrTotalPaidAmountInWords', this.convertToWord(objPrintWordInfo.PaidAmount));

      // this.printTemplate = this.printTemplate.replace('StrBillDate', this.transformBilld(this.reportPrintObj.BillDate));
      this.printTemplate = this.printTemplate.replace(/{{.*}}/g, '');
      setTimeout(() => {
        this.print();
      }, 1000);
    });
  }


  getPrint(el) {
    debugger;
    var D_data = {
      "BillNo": el.BillNo,
    }
    el.bgColor = 'red';
    //console.log(el);
    let printContents; //`<div style="padding:20px;height:550px"><div><div style="display:flex"><img src="http://localhost:4200/assets/images/logos/Airmid_NewLogo.jpeg" width="90"><div><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="color:#464343">6158, Siddheshwar peth, near zilla parishad, solapur-3 phone no.: (0217) 2323001 / 02</div><div style="color:#464343">www.yashodharahospital.org</div></div></div><div style="border:1px solid grey;border-radius:16px;text-align:center;padding:8px;margin-top:5px"><span style="font-weight:700">IP ADVANCE RECEIPT</span></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex;justify-content:space-between"><div style="display:flex"><div style="width:100px;font-weight:700">Advance No</div><div style="width:10px;font-weight:700">:</div><div>6817</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Reg. No</div><div style="width:10px;font-weight:700">:</div><div>117399</div></div><div style="display:flex"><div style="width:60px;font-weight:700">Date</div><div style="width:10px;font-weight:700">:</div><div>26/06/2019&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3:15:49PM</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex;width:477px"><div style="width:100px;font-weight:700">Patient Name</div><div style="width:10px;font-weight:700">:</div><div>Mrs. Suglabai Dhulappa Waghmare</div></div><div style="display:flex"><div style="width:60px;font-weight:700">IPD No</div><div style="width:10px;font-weight:700">:</div><div>IP/53757/2019</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:100px;font-weight:700">DOA</div><div style="width:10px;font-weight:700">:</div><div>30/10/2019</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:100px;font-weight:700">Patient Type</div><div style="width:10px;font-weight:700">:</div><div>Self</div></div></div></div><hr style="border-color:#a0a0a0"><div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Advacne Amount</div><div style="width:10px;font-weight:700">:</div><div>4,000.00</div></div></div><div style="display:flex;margin:8px 0"><div style="display:flex"><div style="width:150px;font-weight:700">Amount in Words</div><div style="width:10px;font-weight:700">:</div><div>FOUR THOUSANDS RUPPEE ONLY</div></div></div><div style="display:flex"><div style="display:flex"><div style="width:150px;font-weight:700">Reason of Advance</div><div style="width:10px;font-weight:700">:</div><div></div></div></div></div><div style="position:relative;top:100px;text-align:right"><div style="font-weight:700;font-size:16px">YASHODHARA SUPER SPECIALITY HOSPITAL PVT. LTD.</div><div style="font-weight:700;font-size:16px">Cashier</div><div>Paresh Manlor</div></div></div>`;
    this.subscriptionArr.push(
      this._AppointmentService.getBillPrint(D_data).subscribe(res => {

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


  onClose() {
    this._matDialog.closeAll();
  }

}
