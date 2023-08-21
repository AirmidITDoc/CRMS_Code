import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CaseDetail } from '../edit-casedetail/edit-casedetail.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-study-schdule',
  templateUrl: './study-schdule.component.html',
  styleUrls: ['./study-schdule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudySchduleComponent implements OnInit {



  chargeslist: any = [];
  chargeslist1: any = [];
  studySchFormGroup: FormGroup;
  ProtocolNo="";
  ProtocolTitle="";
  currentDate = new Date();
  submitted = false;
  now = Date.now();
  isLoading: any;
  CaseIdList: any = [];
  snackmessage: any;
  screenFromString = 'admission-form';

  registerObj = new CaseDetail({});
  VisitFrequencyList: any = [];
  VisitName: any;
  VisitDescription: any;
  Amount: any;
  b_VisitFrequency: any=0;
  TotalAmount1: any;
  TotalAmount = 0;

  StudyAmount: any;
  StudyId ="";
  VisitList: any = []

  Study: boolean = false;

  displayedColumns = [
    'VisitName',
    'VisitDescription',
    'Amount',
    'VisitFrequency',
    'action'
  ];

  dataSource1 = new MatTableDataSource<VisitDetail>();
  paginator: any;
  sort: any;

  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudySchduleComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    
  ) { }


  ngOnInit(): void {

  if (this.data) {
      this.registerObj = this.data.registerObj;
      this.Study = true;
    var m = {
      StudyId: this.registerObj.StudyId
    };
    this._CasedetailService.getStudyschdulebyStuIdList(m).subscribe(Visit => {
      this.dataSource1.data = Visit as VisitDetail[];
      this.dataSource1.sort = this.sort;
      this.chargeslist= this.dataSource1.data;
      this.chargeslist1= this.dataSource1.data;
      this.dataSource1.paginator = this.paginator;
    },
      error => {
        
      });
    }
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
  

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._CasedetailService.personalFormGroup.reset();
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
 
  onAddVisitDetail() {
    this.chargeslist=[];
    this.VisitList.data = [];
    this.chargeslist=this.chargeslist1;
    this.chargeslist.push(
      {
        VisitName: this.VisitName,
        VisitDescription: this.VisitName,
        Amount: this.Amount,
        VisitFrequency: this.b_VisitFrequency
      });
    this.isLoading = '';
    
    this.dataSource1.data = this.chargeslist;
    this._CasedetailService.studySchFormGroup.get('VisitName').reset('');
    this._CasedetailService.studySchFormGroup.get('VisitDescription').reset('');
    this._CasedetailService.studySchFormGroup.get('Amount').reset(0);
    this._CasedetailService.studySchFormGroup.get('VisitFrequency').reset(0);
  }
 
  onStudyUpdate() {
    let updateStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let updateStudySchedule = {};
      updateStudySchedule['Operation'] = 'UPDATE';
      updateStudySchedule['studyVisitId'] = element.StudyVisitId;
      updateStudySchedule['studyId'] = this.registerObj.StudyId
      updateStudySchedule['visitName'] = element.VisitName;
      updateStudySchedule['visitDescription'] = element.VisitDescription;
      updateStudySchedule['visitAmount'] = element.Amount;
      updateStudySchedule['VisitFrequency'] = element.VisitFrequency;
      updateStudySchedule['UpdatedBy'] = this.accountService.currentUserValue.user.id;
      updateStudySchedulearr.push(updateStudySchedule);
    });
    let deleteStudySchedule = {};
    deleteStudySchedule['studyId'] = this.registerObj.StudyId

    let submitData = {
      "deleteStudySchedule": deleteStudySchedule,
      "updateStudySchedule": updateStudySchedulearr

    };

    console.log(submitData);
    this._CasedetailService.StudySchduleUpdate(submitData).subscribe(response => {
      if (response) {
        Swal.fire('StudySchedule Update !', ' StudySchedule Update Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudySchedule not saved', 'error');
      }
    });

  }



}



export class VisitDetail {
  VisitName: any;
  VisitDescription: any;
  Amount: any;
  StudyVisitId: any;
  StudyId: any;
  VisitFrequency:any;
  /**
   * Constructor
   *
   * @param VisitDetail
   */

  constructor(VisitDetail) {
    {
      this.VisitName = VisitDetail.VisitName || '';
      this.VisitDescription = VisitDetail.VisitDescription || '';
      this.Amount = VisitDetail.Amount || '';
      this.StudyVisitId = VisitDetail.StudyVisitId || 0;
      this.StudyId = VisitDetail.StudyId || 0;
      this.VisitFrequency = VisitDetail.VisitFrequency || 0;
    }
  }
}


