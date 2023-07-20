import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-study-services',
  templateUrl: './study-services.component.html',
  styleUrls: ['./study-services.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudyServicesComponent implements OnInit {

 
 
  
  chargeslist: any = [];
  chargeslist1: any = [];

  currentDate = new Date();
  submitted = false;
  now = Date.now();
  isLoading: any;
  CaseIdList: any = [];
  snackmessage: any;
  screenFromString = 'admission-form';
  
  registerObj = new StudyServicesDetail({});
  VisitFrequencyList: any = [];
  VisitName: any;
  ServiceName: any;
  Price: any;
  TotalAmount1: any;
  TotalAmount=0;
 
  StudyAmount: any;
  StudyId: any;
  VisitList: any = []
  ServiceList:any =[];
 
  Study: boolean = false;

  
  public visitnameFilterCtrl: FormControl = new FormControl();
  public filteredVisitname: ReplaySubject<any> = new ReplaySubject<any>(1);

   
  public servicenameFilterCtrl: FormControl = new FormControl();
  public filteredServicename: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();
  



  displayedColumns = [

    'VisitName',
    'ServiceName',
    'Amount',
    'action'
  ];

  dataSource1 = new MatTableDataSource<StudyServicesDetail>();
  paginator: any;
  sort: any;

  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudyServicesComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    console.log(this.data)

      

    if (this.data) {
      this.registerObj = this.data.registerObj;
      // this.StudyId=this.data.registerObj.StudyId;
      console.log(this.registerObj.StudyId);
      this.Study = true;

    
    var m = {
      StudyId:1// this.registerObj.StudyId
    };

    this._CasedetailService.getStudyservicebyStuIdList(m).subscribe(Visit => {
      this.dataSource1.data = Visit as StudyServicesDetail[];
      console.log(this.dataSource1.data)
      this.dataSource1.sort = this.sort;
      this.chargeslist1= this.dataSource1.data;
      this.dataSource1.paginator = this.paginator;
      // this.sIsLoading = '';
    },
      error => {
        // this.sIsLoading = '';
      });
    }
    this.getVisitNameCombobox();

    this.getServiceNameCombobox();

    this.visitnameFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filteredVisit();
    });


    this.servicenameFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterService();
    });



    
  }

  
  // Visitname filter code  
  private filteredVisit() {

    if (!this.VisitList) {
      return;
    }
    // get the search keyword
    let search = this.visitnameFilterCtrl.value;
    if (!search) {
      this.filteredVisitname.next(this.VisitList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredVisitname.next(
      this.VisitList.filter(bank => bank.VisitName.toLowerCase().indexOf(search) > -1)
    );

  }


  
  // Service filter code  
  private filterService() {

    if (!this.ServiceList) {
      return;
    }
    // get the search keyword
    let search = this.servicenameFilterCtrl.value;
    if (!search) {
      this.filteredServicename.next(this.ServiceList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredServicename.next(
      this.ServiceList.filter(bank => bank.SevicName.toLowerCase().indexOf(search) > -1)
    );

  }


  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._CasedetailService.personalFormGroup.reset();
  }


  getVisitNameCombobox() {
    var m={
      StudyId:1             
    
    };
    this._CasedetailService.getVistNameList(m).subscribe((data) => {
        this.VisitList = data;
        console.log(data);
        this.filteredVisitname.next(this.VisitList.slice());
    });
  }


  getServiceNameCombobox() {
  
    this._CasedetailService.getServviceNameList().subscribe((data) => {
        this.ServiceList = data;
        console.log(data);
        this.filteredServicename.next(this.ServiceList.slice());
    });
  }

  getNetAmtSum(element) {
debugger;
    let netAmt;
    netAmt = element.reduce((sum, { Amount }) => sum += +(Amount || 0), 0);
     this.TotalAmount = netAmt;
      // this._CasedetailService.studySchFormGroup.get('TotalAmount').setValue(this.TotalAmount);
    return netAmt
  }




  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }
 

  onClose() {
    this.dialogRef.close();
  }


  myFunction(s) {
    this.snackmessage = s;
    console.log(s);
    console.log(this.snackmessage);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 15000);
  }



  onAddStudyService() {

    debugger;
    this.VisitList.data = [];
    this.chargeslist=this.chargeslist1;
    this.chargeslist.push(
      {
        StudyVisitId:this._CasedetailService.studyServicesFormGroup.get('VisitName').value.StudyVisitId,
        VisitName: this._CasedetailService.studyServicesFormGroup.get('VisitName').value.VisitName,
        ServiceId:this._CasedetailService.studyServicesFormGroup.get('ServiceName').value.ServiceId,
        ServiceName: this._CasedetailService.studyServicesFormGroup.get('ServiceName').value.ServiceName,
        Amount: this.Price
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource1.data = this.chargeslist;
    
    this._CasedetailService.studyServicesFormGroup.get('VisitName').reset('')

    this._CasedetailService.studyServicesFormGroup.get('ServiceName').reset('')

    this._CasedetailService.studyServicesFormGroup.get('Price').reset(0)

  }
  onStudyServiceSave(){
 
    debugger;
    let insertStudyServicearr = [];
    this.dataSource1.data.forEach((element) => {
      let insertStudyService = {};
      insertStudyService['studyId'] = this.registerObj.StudyId;
      insertStudyService['StudyVisitId'] = element.StudyVisitId;
      insertStudyService['ServiceId'] = element.ServiceId;
      insertStudyService['Amount'] = element.Amount;
      insertStudyService['isActive'] =1,//element.serviceId;

      insertStudyService['createdBy'] = this.accountService.currentUserValue.user.id;
      insertStudyServicearr.push(insertStudyService);
    });

    let submitData = {
      "insertStudyservice": insertStudyServicearr
    };

    console.log(submitData);
    this._CasedetailService.StudyServiceInsert(submitData).subscribe(response => {
      console.log(response)
      if (response) {
        Swal.fire('New StudyService  !', ' StudyService Save Successfully !', 'success').then((result) => {

          console.log(result)
          if (result) {

            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudyService not saved', 'error');
      }
    });

  }

  onStudyUpdate() {
    let updateStudyservicearr = [];
    this.dataSource1.data.forEach((element) => {
      let updateStudyService = {};
      updateStudyService['Opration'] = 'UPDATE';
      updateStudyService['StudyVisitId'] = element.StudyVisitId;
      updateStudyService['StudyId'] =  this.registerObj.StudyId;
      updateStudyService['ServiceId'] = element.ServiceId;
      updateStudyService['Amount'] = element.Amount;
      updateStudyService['isActive'] = 1,//element.Amount;
      updateStudyService['UpdatedBy'] = this.accountService.currentUserValue.user.id;
      updateStudyservicearr.push(updateStudyService);
    });
    let deleteStudySchedule = {};
    deleteStudySchedule['studyId'] = this.registerObj.StudyId
  
    let submitData = {
      "updateStudyservice": updateStudyservicearr
      // "deleteStudySchedule":deleteStudySchedule
    };

    console.log(submitData);
    this._CasedetailService.StudyServiceUpdate(submitData).subscribe(response => {
      if (response) {
        Swal.fire('StudyService Update !', ' StudyService Update Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudyService not saved', 'error');
      }
    });

  }



}



export class StudyServicesDetail {
  VisitId:any;
  VisitName: any;
  ServiceId:any;
  ServiceName: any;
  Amount: any;
  StudyVisitId:any;
  StudyId:any;
  /**
   * Constructor
   *
   * @param StudyServicesDetail
   */

  constructor(StudyServicesDetail) {
    {
      this.VisitName = StudyServicesDetail.VisitName || '';
      this.ServiceId = StudyServicesDetail.ServiceId || '';
      this.ServiceName = StudyServicesDetail.ServiceName || '';
      this.Amount = StudyServicesDetail.Amount || '';
      this.StudyVisitId = StudyServicesDetail.StudyVisitId || 0;
      this.StudyId = StudyServicesDetail.StudyId || 0;


    }
  }
}


