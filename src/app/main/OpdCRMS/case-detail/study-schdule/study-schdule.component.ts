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

  studySchFormGroup: FormGroup;
  documentFormGroup: FormGroup;
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
  TotalAmount1: any;
  TotalAmount=0;
 
  StudyAmount: any;
  StudyId: any;
  VisitList: any = []
  Institutionist: any = []
  CompanyList: any = [];
  DocumentList: any = [];
  Study: boolean = false;

  displayedColumns = [

    'VisitName',
    'VisitDescription',
    'Amount',
    'action'
  ];

  dataSource1 = new MatTableDataSource<VisitDetail>();

  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudySchduleComponent>,
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
    }

  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._CasedetailService.personalFormGroup.reset();
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



  onAddVisitDetail() {
    debugger;
    this.VisitList.data = [];
    this.chargeslist.push(
      {
        VisitName: this.VisitName,
        VisitDescription: this.VisitDescription,
        Amount: this.Amount
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource1.data = this.chargeslist;
    console.log(this.VisitList.data);

  }
  onStudySave() {

    debugger;
    let insertStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let insertStudySchedule = {};
      // insertStudySchedule['studyVisitId'] = 0;
      insertStudySchedule['studyId'] = this.registerObj.StudyId;

      insertStudySchedule['visitName'] = element.VisitName;
      insertStudySchedule['visitDescription'] = element.VisitDescription;
      insertStudySchedule['visitAmount'] = element.Amount;
      insertStudySchedule['createdBy'] = this.accountService.currentUserValue.user.id;
      insertStudySchedulearr.push(insertStudySchedule);
    });

    let submitData = {
      "insertStudySchedule": insertStudySchedulearr
    };

    console.log(submitData);
    this._CasedetailService.StudySchduleInsert(submitData).subscribe(response => {
      console.log(response)
      if (response) {
        Swal.fire('New StudySchedule Save !', ' StudySchedule Save Successfully !', 'success').then((result) => {

          console.log(result)
          if (result) {

            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudySchedule not saved', 'error');
      }
    });

  }

  onStudyUpdate() {
    let updateStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let updateStudySchedule = {};
      updateStudySchedule['Opration'] = 'UPDATE';
      updateStudySchedule['studyVisitId'] = 0;
      updateStudySchedule['studyId'] = this.registerObj.StudyId

      updateStudySchedule['visitName'] = element.VisitName;
      updateStudySchedule['visitDescription'] = element.VisitDescription;
      updateStudySchedule['visitAmount'] = element.Amount;
      updateStudySchedule['UpdatedBy'] = this.accountService.currentUserValue.user.id;
      updateStudySchedulearr.push(updateStudySchedule);
    });

    let submitData = {
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

    }
  }
}


