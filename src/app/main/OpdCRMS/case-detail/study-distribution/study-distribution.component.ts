import { Component, Inject, OnInit } from '@angular/core';
import { CasedetailService } from '../casedetail.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CaseDetail } from '../edit-casedetail/edit-casedetail.component';

@Component({
  selector: 'app-study-distribution',
  templateUrl: './study-distribution.component.html',
  styleUrls: ['./study-distribution.component.scss']
})
export class StudyDistributionComponent implements OnInit {
  distributionForm: FormGroup;
  DoctypeList: any = [];
  StudyList: any = [];
  ServiceList: any = [];
  currentDate=new Date()
  registerObj = new CaseDetail({});
  Study: boolean = false;

  public studyFilterCtrl: FormControl = new FormControl();
  public filteredStudy: ReplaySubject<any> = new ReplaySubject<any>(1);

  public serviceIdFilterCtrl: FormControl = new FormControl();
  public filteredServicename: ReplaySubject<any> = new ReplaySubject<any>(1);


  public doctorFilterCtrl: FormControl = new FormControl();
  public filteredDocument: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();


  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudyDistributionComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,) { }

  ngOnInit(): void {
    this.distributionForm = this.createstudydistributionForm();


    if (this.data) {
      this.registerObj = this.data.registerObj;

      this.Study = true;
    }

    this.getServiceList();
    this.getStudylist();
    this.DoctorComboList();

    this.studyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStudy();
      });

    this.doctorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDoctore();
      });
    this.serviceIdFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterService();
      });
  }



  createstudydistributionForm() {
    return this.formBuilder.group({
      studyId: '',
      serviceId: '',
      percentage: '',
      docType: '',

    });
  }


  private filterStudy() {

    if (!this.StudyList) {
      return;
    }
    // get the search keyword
    let search = this.studyFilterCtrl.value;
    if (!search) {
      this.filteredStudy.next(this.StudyList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredStudy.next(
      this.StudyList.filter(bank => bank.StudyId.toLowerCase().indexOf(search) > -1)
    );

  }



  private filterService() {

    if (!this.ServiceList) {
      return;
    }
    // get the search keyword
    let search = this.serviceIdFilterCtrl.value;
    if (!search) {
      this.filteredServicename.next(this.ServiceList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredServicename.next(
      this.ServiceList.filter(bank => bank.ServiceId.toLowerCase().indexOf(search) > -1)
    );

  }
  // Document filter code  
  private filterDoctore() {

    if (!this.DoctypeList) {
      return;
    }
    // get the search keyword
    let search = this.doctorFilterCtrl.value;
    if (!search) {
      this.filteredDocument.next(this.DoctypeList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDocument.next(
      this.DoctypeList.filter(bank => bank.DoctorType.toLowerCase().indexOf(search) > -1)
    );

  }

  getServiceList() {
    this._CasedetailService.getServviceNameList().subscribe(data => {
      this.ServiceList = data;

      this.filteredServicename.next(this.ServiceList.slice());
      // this.distributionForm.get("serviceId").setValue(this.ServiceList[0]);
    });
  }
  getStudylist() {
    this._CasedetailService.getCaseIDCombo().subscribe(data => {
      this.StudyList = data;

      this.filteredStudy.next(this.StudyList.slice());
      // this.distributionForm.get("studyId").setValue(this.StudyList[0]);
    });
  }


  DoctorComboList() {
    var mdata = {
      ConstanyType: "DocType"
    };
    this._CasedetailService.getDoctorTypeList(mdata).subscribe(data => {
      this.DoctypeList = data;
      this.filteredDocument.next(this.DoctypeList.slice());

    });
  }

  onSubmit() {

    // this.isLoading = 'submit';

    // if (!this.distributionForm.get('StudyId').value) {

      var m_data = {
        "insertDoctorPercentage": {
          "studyId":  this.distributionForm.get('studyId').value.StudyId || 0,
          "serviceId": this.distributionForm.get('serviceId').value.ServiceId || 0,
          "percentage": this.distributionForm.get('percentage').value || 0,
          "docType": this.distributionForm.get('docType').value.Name || "",
          "isActive":  1,//this.distributionForm.get('TotalSubjects').value || 0,
          "createdBy":  this.accountService.currentUserValue.user.id,
          "createdOn":  this.datePipe.transform(this.currentDate, "MM-dd-yyyy"),
          "updatedBy":  this.accountService.currentUserValue.user.id,
          "updatedOn":  this.datePipe.transform(this.currentDate, "MM-dd-yyyy"),

        }
      }
      console.log(m_data);
      this._CasedetailService.StudyDistributionInsert(m_data).subscribe(response => {
        if (response) {
          Swal.fire('New StudyDistribution Save !', ' StudyDistribution Save Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();

            }

          });
        } else {
          Swal.fire('Error !', 'StudyDetail not saved', 'error');
        }
      });
    // }
    // else {

    //   var m_data1 = {
    //     "updateDoctorPercentage": {
    //       "studyId":  this.distributionForm.get('studyId').value.StudyId || 0,
    //       "serviceId": this.distributionForm.get('serviceId').value.ServiceId || 0,
    //       "percentage": this.distributionForm.get('percentage').value || 0,
    //       "docType": this.distributionForm.get('docType').value.DoctorType || "",
    //       "isActive":  1,//this.distributionForm.get('TotalSubjects').value || 0,
    //       "updatedBy":  this.accountService.currentUserValue.user.id,
    //       "updatedOn":  this.datePipe.transform(this.currentDate, "MM-dd-yyyy"),

    //     }
    //   };
    //   console.log(m_data1);
    //   this._CasedetailService.StudyInfoUpdate(m_data1).subscribe(response => {
    //     if (response) {
    //       Swal.fire('Congratulations !', 'StudyDistribution Updated Successfully !', 'success').then((result) => {
    //         if (result.isConfirmed) {
    //           let m = response;

    //           this._matDialog.closeAll();

    //         }
    //       });
    //     } else {
    //       Swal.fire('Error !', 'StudyDistribution not saved', 'error');
    //     }
    //     // this.isLoading = '';
    //   });


    // }
  }
  onClose(){
    this.dialogRef.close();
  }
  onClear(){

  }
}