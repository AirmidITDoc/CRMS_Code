import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-casedetail',
  templateUrl: './edit-casedetail.component.html',
  styleUrls: ['./edit-casedetail.component.scss']
})
export class EditCasedetailComponent implements OnInit {


  personalFormGroup: FormGroup;

  submitted = false;
  now = Date.now();
  isLoading: any;
  CaseIdList: any = [];
  snackmessage: any;
  VisitFrequencyList: any = [];
  screenFromString = 'admission-form';
  CompanyList: any = [];
  DocumentList: any = [];

  registerObj = new CaseDetail({});


  //company filter
  public companyFilterCtrl: FormControl = new FormControl();
  public filteredCompany: ReplaySubject<any> = new ReplaySubject<any>(1);

  //Document filter
  public documentFilterCtrl: FormControl = new FormControl();
  public filteredDocument: ReplaySubject<any> = new ReplaySubject<any>(1);



  private _onDestroy = new Subject<void>();
  // private _onDestroy1 = new Subject<void>();




  constructor(public _registerService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditCasedetailComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    console.log(this.data)
    this.personalFormGroup = this.createPesonalForm();

    if (this.data) {
      this.registerObj = this.data.registerObj;

    }

    this.getCompanyList();
    this.VisitFrequencyComboList();
    this.DocumentComboList();

    this.companyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCompany();
      });

    this.documentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDocument();
      });
      this.setDropdownObjs1();
  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this.personalFormGroup.reset();
  }
  createPesonalForm() {
    return this.formBuilder.group({
      CaseId: '',
      CaseTitle: '',
      CaseDescription: '',
      TotalSubjects: '',
      TotalVisits: ['', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern("^[0-9]*$")]],
      VisitFrequency: '',
      CaseStartDate: [(new Date()).toISOString()],
      CaseEndDate: [(new Date()).toISOString()],
      CaseStatus: '',
      CompanyName: '',
      CompanyId: '',
      CaseRepresentative: '',
      HospitalRepresentative: '',
      AgreementFileName: ''

    });
  }


  

  setDropdownObjs1() {
    debugger;

    debugger;
    const toSelect = this.VisitFrequencyList.find(c => c.ContactId == this.registerObj.VisitFrequency);
    this.personalFormGroup.get('VisitFrequency').setValue(toSelect);

    const toSelectMarital = this.DocumentList.find(c => c.ContactId == this.registerObj.AgreementFileName);
    this.personalFormGroup.get('Document').setValue(toSelectMarital);

    const toSelectReligion = this.CompanyList.find(c => c.CompanyId == this.registerObj.CompanyName);
    this.personalFormGroup.get('CompanyId').setValue(toSelectReligion);

  

    this.personalFormGroup.updateValueAndValidity();
    // this.dialogRef.close();

  }




  // company filter code  
  private filterCompany() {

    if (!this.CompanyList) {
      return;
    }
    // get the search keyword
    let search = this.companyFilterCtrl.value;
    if (!search) {
      this.filteredCompany.next(this.CompanyList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredCompany.next(
      this.CompanyList.filter(bank => bank.CompanyName.toLowerCase().indexOf(search) > -1)
    );

  }


  // Document filter code  
  private filterDocument() {

    if (!this.DocumentList) {
      return;
    }
    // get the search keyword
    let search = this.documentFilterCtrl.value;
    if (!search) {
      this.filteredDocument.next(this.DocumentList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDocument.next(
      this.DocumentList.filter(bank => bank.Name.toLowerCase().indexOf(search) > -1)
    );

  }

  getCompanyList() {
    this._registerService.getCompanyCombo().subscribe(data => {
      this.CompanyList = data;
      this.filteredCompany.next(this.CompanyList.slice());
    });
  }

  VisitFrequencyComboList() {
    var mdata = {
      ConstanyType: "VisitFrequency"
    };

    this._registerService.getVisitFrequencyCList(mdata).subscribe(data => {
      this.VisitFrequencyList = data;
      console.log(this.VisitFrequencyList);
      // this.filteredCity.next(this.VisitFrequencyList.slice());
    });
  }


  DocumentComboList() {
    var mdata = {
      ConstanyType: "CaseDocuments"
    };

    this._registerService.getVisitFrequencyCList(mdata).subscribe(data => {
      this.DocumentList = data;
      console.log(this.VisitFrequencyList);
      this.filteredDocument.next(this.DocumentList.slice());
    });
  }
  addEmptyRow() { }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }




  // onSubmit() {
  //   debugger
  //   this.isLoading = 'submit';

  //   var m_data = {
  //     "updateStudyInformation": {
  //       "studyId": 0,
  //       "operation":"UPDATE",
  //       "protocolNo": this.registerObj.CaseId,
  //         "protocolTitle": this.personalFormGroup.get('protocolTitle').value || '',
  //         "studyProduct": this.personalFormGroup.get('studyProduct').value || '',
  //         "TotalSubjects": this.personalFormGroup.get('TotalSubjects').value || 0,
  //         "TotalVisits": this.personalFormGroup.get('TotalVisits').value || '',
  //         "VisitFrequency": this.personalFormGroup.get('VisitFrequency').value.ConstantId || 0,
  //         "sponser": this.personalFormGroup.get('CompanyId').value.CompanyId || 0,
  //         "investigator": this.personalFormGroup.get('investigator').value || '',
  //         "institution": this.personalFormGroup.get('institution').value || '',
  //         "studyStartDate": this.registerObj.studyStartDate,//this.datePipe.transform(this.personalFormGroup.get('CaseStartDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
  //         "studyEndDate":this.registerObj.studyEndDate,// this.datePipe.transform(this.personalFormGroup.get('CaseEndDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
  //          "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value || '',
         
  //         // "IsActive": 1,
  //       "UpdatedBy": this.accountService.currentUserValue.user.id

  //     }
  //   }
  //   console.log(m_data);
  //   this._registerService.CaseDetailUpdate(m_data).subscribe(response => {

  //     if (response) {
  //       Swal.fire('Edit CaseDetail Save !', 'Edit CaseDetail save Successfully !', 'success').then((result) => {
  //         if (result.isConfirmed) {
  //           this._matDialog.closeAll();

  //         }

  //       });
  //     } else {
  //       Swal.fire('Error !', 'CaseDetail not saved', 'error');
  //     }
  //   });


  // }

  onClose() {
    this.dialogRef.close();
  }


  myFunction(s) {
    this.snackmessage = s;
    console.log(s);
    console.log(this.snackmessage);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
  }
}



export class CaseDetail {
  CaseId: any;
  CaseTitle: any;
  CaseDescription: any;
  TotalSubjects: any;
  TotalVisits: number;
  VisitFrequency: string;
  CaseStartDate: Date;
  CaseEndDate: Date;
  CaseStatus: string;
  CompanyName: string;
  CaseRepresentative: string;
  HospitalRepresentative: string;
  AgreementFileName: String;
ContactId:any;
CompanyId:any;
  /**
   * Constructor
   *
   * @param CaseDetail
   */

  constructor(CaseDetail) {
    {
      this.CaseId = CaseDetail.CaseId || '';
      this.CaseTitle = CaseDetail.CaseTitle || '';
      this.CaseDescription = CaseDetail.CaseDescription || '';
      this.TotalSubjects = CaseDetail.TotalSubjects || 0;
      this.TotalVisits = CaseDetail.TotalVisits || '';
      this.VisitFrequency = CaseDetail.VisitFrequency || '';
      this.CaseStartDate = CaseDetail.CaseStartDate || '';
      this.CaseEndDate = CaseDetail.CaseEndDate || '';
      this.CaseStatus = CaseDetail.CaseStatus || '';
      this.CompanyName = CaseDetail.CompanyName || '';
      this.CaseRepresentative = CaseDetail.CaseRepresentative || '';
      this.AgreementFileName = CaseDetail.AgreementFileName || '';
      this.ContactId = CaseDetail.ContactId || '';
      this.CompanyId=CaseDetail.CompanyId ||0;
    }
  }
}

