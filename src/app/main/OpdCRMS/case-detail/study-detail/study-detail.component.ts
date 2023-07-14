import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-study-detail',
  templateUrl: './study-detail.component.html',
  styleUrls: ['./study-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudyDetailComponent implements OnInit {

  
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

 
  StudyAmount: any;
  StudyId: any;
  VisitList: any = []
  Institutionist: any = []
  CompanyList: any = [];
  DocumentList: any = [];
  Study: boolean = false;

  //company filter
  public companyFilterCtrl: FormControl = new FormControl();
  public filteredCompany: ReplaySubject<any> = new ReplaySubject<any>(1);

  //Document filter
  public documentFilterCtrl: FormControl = new FormControl();
  public filteredDocument: ReplaySubject<any> = new ReplaySubject<any>(1);

  //Institution filter
  public institutionFilterCtrl: FormControl = new FormControl();
  public filteredInstitution: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();
  // private _onDestroy1 = new Subject<void>();


  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudyDetailComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    console.log(this.data)

    this.studySchFormGroup = this.createstudySchForm();
    this.documentFormGroup = this.createdocumentForm();


    if (this.data) {
      this.registerObj = this.data.registerObj;
      // this.StudyId=this.data.registerObj.StudyId;
      console.log(this.registerObj.StudyId);
      this.Study = true;
    }

    this.getCompanyList();
    this.getInstitutionList();
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

    this.institutionFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterInstitution();
      });


  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._CasedetailService.personalFormGroup.reset();
  }


  createstudySchForm() {
    return this.formBuilder.group({
      VisitId: '',
      VisitName: '',
      VisitDescription: '',
      Amount: '',

    });
  }


  createdocumentForm() {
    return this.formBuilder.group({
      StudyId: '',
      DocumentTypeId: '',
      DocumentName: '',
      DocumentPath: '',

    });
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


  // Instution filter code  
  private filterInstitution() {

    if (!this.Institutionist) {
      return;
    }
    // get the search keyword
    let search = this.companyFilterCtrl.value;
    if (!search) {
      this.filteredInstitution.next(this.Institutionist.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredInstitution.next(
      this.Institutionist.filter(bank => bank.InstitutionName.toLowerCase().indexOf(search) > -1)
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
    this._CasedetailService.getCompanyCombo().subscribe(data => {
      this.CompanyList = data;
      console.log(data);
      this.filteredCompany.next(this.CompanyList.slice());
      this._CasedetailService.personalFormGroup
        .get("CompanyId")
        .setValue(this.CompanyList[0]);
    });
  }

  getInstitutionList() {
    this._CasedetailService.getInstitutionCombo().subscribe(data => {
      this.Institutionist = data;
      console.log(data);
      this.filteredInstitution.next(this.Institutionist.slice());
      this._CasedetailService.personalFormGroup
        .get("Institution")
        .setValue(this.Institutionist[0]);
    });
  }

  VisitFrequencyComboList() {
    var mdata = {
      ConstanyType: "VisitFrequency"
    };

    this._CasedetailService.getVisitFrequencyCList(mdata).subscribe(data => {
      this.VisitFrequencyList = data;
      console.log(this.VisitFrequencyList);
      // this.filteredCity.next(this.VisitFrequencyList.slice());
      this._CasedetailService.personalFormGroup
        .get("VisitFrequency")
        .setValue(this.VisitFrequencyList[0]);
    });
  }

  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { Amount }) => sum += +(Amount || 0), 0);
    this.StudyAmount = netAmt;
   
    return netAmt
  }


  DocumentComboList() {
    var mdata = {
      ConstanyType: "CaseDocuments"
    };

    this._CasedetailService.getDocumentList(mdata).subscribe(data => {
      this.DocumentList = data;
      // console.log(this.VisitFrequencyList);
      this.filteredDocument.next(this.DocumentList.slice());
      // this._CasedetailService.personalFormGroup
      // .get("Document")
      // .setValue(this.DocumentList[0]);
    });
  }



  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  onSubmit() {

    this.isLoading = 'submit';

    if (!this._CasedetailService.personalFormGroup.get('StudyId').value) {

      var m_data = {
        "insertStudyInformation": {
          "studyId": 0,
          "protocolNo": this._CasedetailService.personalFormGroup.get('ProtocolNo').value || '',
          "protocolTitle": this._CasedetailService.personalFormGroup.get('ProtocolTitle').value || '',
          "studyProduct": this._CasedetailService.personalFormGroup.get('StudyProduct').value || '',
          "TotalSubjects": this._CasedetailService.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this._CasedetailService.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this._CasedetailService.personalFormGroup.get('VisitFrequency').value.ConstantId || 0,
          "sponser": this._CasedetailService.personalFormGroup.get('CompanyId').value.CompanyId || 0,
          "investigator": this._CasedetailService.personalFormGroup.get('Investigator').value || '',
          "institution": this._CasedetailService.personalFormGroup.get('Institution').value.InstitutionId || 0,
          "studyStartDate": this.datePipe.transform(this.registerObj.StudyStartDate, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "studyEndDate": this.datePipe.transform(this.registerObj.StudyEndDate, "MM-dd-yyyy"),
          "AgreementFileName": this._CasedetailService.personalFormGroup.get('AgreementFileName').value.ConstantId || 0,
          "createdBy": this.accountService.currentUserValue.user.id

        }
      }
      console.log(m_data);
      this._CasedetailService.StudyInfoInsert(m_data).subscribe(response => {
        if (response) {
          Swal.fire('New StudyDetail Save !', ' StudyDetail Save Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();

            }

          });
        } else {
          Swal.fire('Error !', 'StudyDetail not saved', 'error');
        }
      });
    } else {

      var m_data1 = {
        "updateStudyInformation": {
          "operation": "UPDATE",
          "studyId": this._CasedetailService.personalFormGroup.get('StudyId').value || 0,
          "protocolNo": this._CasedetailService.personalFormGroup.get('ProtocolNo').value || '',
          "protocolTitle": this._CasedetailService.personalFormGroup.get('ProtocolTitle').value || '',
          "studyProduct": this._CasedetailService.personalFormGroup.get('StudyProduct').value || '',
          "TotalSubjects": this._CasedetailService.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this._CasedetailService.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this._CasedetailService.personalFormGroup.get('VisitFrequency').value.ConstantId || 0,
          "sponser": this._CasedetailService.personalFormGroup.get('CompanyId').value.CompanyId || 0,
          "investigator": this._CasedetailService.personalFormGroup.get('Investigator').value || '',
          "institution": this._CasedetailService.personalFormGroup.get('Institution').value.InstitutionId || 0,
          "studyStartDate": this.datePipe.transform(this.registerObj.StudyStartDate, "MM-dd-yyyy"),
          "studyEndDate": this.datePipe.transform(this.registerObj.StudyEndDate, "MM-dd-yyyy"),
          "AgreementFileName": this._CasedetailService.personalFormGroup.get('AgreementFileName').value.ConstantId || 0,
          "UpdatedBy": this.accountService.currentUserValue.user.id

        }
      }
      console.log(m_data1);
      this._CasedetailService.StudyInfoUpdate(m_data1).subscribe(response => {

        if (response) {
          Swal.fire('Edit StudyDetail Save !', 'Edit StudyDetail save Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();

            }

          });
        } else {
          Swal.fire('Error !', 'StudyDetail not saved', 'error');
        }
      });
    }


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



}

export class CaseDetail {
  ProtocolNo: any;
  ProtocolTitle: any;
  StudyProduct: any;
  TotalSubjects: any;
  TotalVisits: number;
  VisitFrequency: string;
  StudyStartDate: Date;
  StudyEndDate: Date;
  Sponser: string;
  Investigator: string;
  Institution: string;
  HospitalRepresentative: string;
  AgreementFileName: String;
  currentDate = new Date();
  PatientName: any;
  RegNo: any;
  MobileNo: any;
  AgeYear: any;
  TotalBillAmt: any;
  BillNo: any;
  StudyId: any;
  operation: any;
  /**
   * Constructor
   *
   * @param CaseDetail
   */

  constructor(CaseDetail) {
    {
      this.ProtocolNo = CaseDetail.ProtocolNo || '';
      this.ProtocolTitle = CaseDetail.ProtocolTitle || '';
      this.StudyProduct = CaseDetail.StudyProduct || '';
      this.TotalSubjects = CaseDetail.TotalSubjects || 0;
      this.TotalVisits = CaseDetail.TotalVisits || '';
      this.VisitFrequency = CaseDetail.VisitFrequency || '';
      this.StudyStartDate = CaseDetail.StudyStartDate || this.currentDate;
      this.StudyEndDate = CaseDetail.StudyEndDate || this.currentDate;
      this.Sponser = CaseDetail.Sponser || '';
      this.Investigator = CaseDetail.Investigator || '';
      this.Institution = CaseDetail.Institution || '';
      this.AgreementFileName = CaseDetail.AgreementFileName || '';

      this.PatientName = CaseDetail.PatientName || '';
      this.RegNo = CaseDetail.RegNo || '';
      this.MobileNo = CaseDetail.MobileNo || '';
      this.AgeYear = CaseDetail.AgeYear || '';
      this.TotalBillAmt = CaseDetail.TotalBillAmt || '';
      this.BillNo = CaseDetail.BillNo || 0;
      this.StudyId = CaseDetail.StudyId || 0;
      this.operation = CaseDetail.operation || 0;
    }
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


