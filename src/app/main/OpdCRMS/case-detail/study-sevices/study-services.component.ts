import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { StudyServicesService } from './study-services.service';

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
  ProtocolNo="";
  ProtocolTitle="";
  VisitList: any = []
  ServiceList:any =[];
  vStudyServicesId:any=0;
  vStudyId:any=0;
  vServiceId:any=0;
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

  constructor(public _StudyServicesService: StudyServicesService,
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

    if (this.data) {
      this.registerObj = this.data.registerObj;
      this.vStudyId=this.registerObj.StudyId
      this.Study = true;
    var m = {
      StudyId: this.registerObj.StudyId
    };
    this._StudyServicesService.getStudyservicebyStuIdList(m).subscribe(Visit => {
      this.dataSource1.data = Visit as StudyServicesDetail[];
      this.dataSource1.sort = this.sort;
      this.chargeslist1= this.dataSource1.data;
      this.chargeslist= this.dataSource1.data;
      this.dataSource1.paginator = this.paginator;
    },
      error => {
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
    
    //  this.dialogRef.close();
    // this._StudyServicesService.personalFormGroup.reset();
  }


  getVisitNameCombobox() {
    var m={
      StudyId:this.registerObj.StudyId            
    };
    this._StudyServicesService.getVistNameList(m).subscribe((data) => {
        this.VisitList = data;
        this.filteredVisitname.next(this.VisitList.slice());
    });
  }


  getServiceNameCombobox() {
    this._StudyServicesService.getServviceNameList().subscribe((data) => {
        this.ServiceList = data;
        this.filteredServicename.next(this.ServiceList.slice());
    });
  }

  getNetAmtSum(element) {
    let netAmt;
    netAmt = element.reduce((sum, { Amount }) => sum += +(Amount || 0), 0);
     this.TotalAmount = netAmt;
    return netAmt
  }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }

  onClose() {
    this.dialogRef.close();
  }


  onAddStudyService() {
    this.chargeslist=[];
    this.VisitList.data = [];
    this.chargeslist=this.chargeslist1;
    this.chargeslist.push(
      {
        StudyVisitId:this._StudyServicesService.studyServicesFormGroup.get('VisitName').value.StudyVisitId,
        VisitName: this._StudyServicesService.studyServicesFormGroup.get('VisitName').value.VisitName,
        ServiceId:this._StudyServicesService.studyServicesFormGroup.get('ServiceName').value.ServiceId,
        ServiceName: this._StudyServicesService.studyServicesFormGroup.get('ServiceName').value.ServiceName,
        Amount: this.Price
      });
    this.isLoading = '';
    this.dataSource1.data = this.chargeslist;
    this._StudyServicesService.studyServicesFormGroup.get('VisitName').reset('')
    this._StudyServicesService.studyServicesFormGroup.get('ServiceName').reset('')
    this._StudyServicesService.studyServicesFormGroup.get('Price').reset(0)
  }

  onStudyServiceSave(){
    let insertStudyServicearr = [];
    this.dataSource1.data.forEach((element) => {
      let insertStudyService = {};
      insertStudyService['studyId'] = this.registerObj.StudyId;
      insertStudyService['StudyVisitId'] = this.vStudyServicesId
      insertStudyService['ServiceId'] = element.ServiceId;
      insertStudyService['Amount'] = element.Amount;
      insertStudyService['isActive'] =1,//element.serviceId;
      insertStudyService['createdBy'] = this.accountService.currentUserValue.user.id;
      insertStudyServicearr.push(insertStudyService);
    });

    let submitData = {
      "insertStudyservice": insertStudyServicearr
    };
    this._StudyServicesService.StudyServiceInsert(submitData).subscribe(response => {
      if (response) {
        Swal.fire('New StudyService  !', ' StudyService Save Successfully !', 'success').then((result) => {
          if (result) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudyService not saved', 'error');
      }
    });
  }

  onUpdateService(){
      let UpdateStudyService = {};
      UpdateStudyService['operation'] ='UPDATE_ID';
      UpdateStudyService['studyServicesId'] =this.vStudyServicesId;
      UpdateStudyService['studyId'] = this.vStudyId;
      UpdateStudyService['StudyVisitId'] = this._StudyServicesService.myStudyServiceform.get('VisitName').value.StudyVisitId;
      UpdateStudyService['ServiceId'] =this._StudyServicesService.myStudyServiceform.get('ServiceName').value.ServiceId || 0;
      UpdateStudyService['amount'] = parseFloat(this._StudyServicesService.myStudyServiceform.get('Amount').value) || 0;
      UpdateStudyService['isActive'] =1,//element.serviceId;
      UpdateStudyService['updatedBy'] = this.accountService.currentUserValue.user.id;
    let submitData = {
      "updateStudyserviceId": UpdateStudyService
    };
    console.log(submitData)
    this._StudyServicesService.StudyServiceUpdate(submitData).subscribe(response => {
      if (response) {
        Swal.fire('update StudyService  !', ' StudyService Updated Successfully !', 'success').then((result) => {
          if (result) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudyService not saved', 'error');
      }
    });
  }
 
  onEdit(row){
    console.log(row)
    var m_data = {
      StudyServicesId:row.StudyServicesId,
      StudyVisitId: row.StudyVisitId,
      ServiceId: row.ServiceId,
      Amount: row.Amount,
    };
    this._StudyServicesService.populateStudyServiceUpdateForm(m_data);

    const toStudyVisit = this.VisitList.find(c => c.StudyVisitId == row.StudyVisitId);
    this._StudyServicesService.myStudyServiceform.get('VisitName').setValue(toStudyVisit);

    const toStudyService = this.ServiceList.find(c => c.ServiceId == row.ServiceId);
    this._StudyServicesService.myStudyServiceform.get('ServiceName').setValue(toStudyService);
    this.vStudyServicesId=row.StudyServicesId
    this.vServiceId= row.ServiceId
    
  }

  deleteTableRow(element) {
  let index = this.chargeslist.indexOf(element);
  if (index >= 0) {
    this.chargeslist.splice(index, 1);
    this.dataSource1.data = [];
    this.dataSource1.data = this.chargeslist;
  }
  Swal.fire('Success !', 'List Row Deleted Successfully', 'success');
}

  onStudyUpdate() {
    let updateStudyservicearr = [];
    this.dataSource1.data.forEach((element) => {
      let updateStudyService = {};
      updateStudyService['Operation'] = 'UPDATE';
      updateStudyService['StudyServicesId'] =0;// this.data.registerObj.StudyServicesId;
      updateStudyService['StudyVisitId'] = element.StudyVisitId;
      updateStudyService['StudyId'] = this.registerObj.StudyId;
      updateStudyService['ServiceId'] = element.ServiceId;
      updateStudyService['Amount'] = element.Amount;
      updateStudyService['isActive'] = 1,//element.Amount;
      updateStudyService['UpdatedBy'] = this.accountService.currentUserValue.user.id;
      updateStudyservicearr.push(updateStudyService);
    });
    let deleteStudyService = {};
    deleteStudyService['studyId'] = this.registerObj.StudyId
  
    let submitData = {
      "deleteStudyService":deleteStudyService,
      "updateStudyservice": updateStudyservicearr     
    };

    console.log(submitData);
    this._StudyServicesService.StudyServiceUpdate(submitData).subscribe(response => {
      if (response) {
        Swal.fire('StudyService Save !', ' StudyService Save Successfully !', 'success').then((result) => {
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
 ProtocolNo:any;
 ProtocolTitle:any;
 StudyProduct:any;

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

      this.ProtocolNo = StudyServicesDetail.ProtocolNo || '';
      this.ProtocolTitle = StudyServicesDetail.ProtocolTitle || 0;
      this.StudyProduct = StudyServicesDetail.StudyProduct || '';

    }
  }
}


