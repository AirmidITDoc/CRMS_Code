import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { CaseDetailComponent } from '../case-detail.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { UploadDocumentComponent } from '../../appointment/upload-document/upload-document.component';
import { FileUploadComponent } from '../../appointment/file-upload/file-upload.component';
import { ImageUploadComponent } from '../../appointment/image-upload/image-upload.component';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-case-detail',
  templateUrl: './new-case-detail.component.html',
  styleUrls: ['./new-case-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCaseDetailComponent implements OnInit {


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
  CaseId: any;
  CaseTitle: any;
  CaseDescription: any;
  TotalSubjects: number;
  TotalVisits: number;
  VisitFrequency: string;
  CaseStartDate: Date;
  CaseEndDate: Date;
  CaseStatus: string;
  CompanyName: string;
  CaseRepresentative: string;
  HospitalRepresentative: string;
  AgreementFileName: String;
  registerObj = new CaseDetail({});
  VisitFrequencyList: any = [];
  VisitName: any;
  VisitDescription: any;
  Amount: any;
  DocumentTypeId:any;
  DocumentName: any;
  DocumentPath: any;
  StudyAmount: any;
  StudyId: any;
  VisitList: any = []
  Institutionist: any = []
  CompanyList: any = [];
  DocumentList: any = [];
  Study: boolean = false;
  TotalAmount:any;
  
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;

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

  displayedColumns = [

    'VisitName',
    'VisitDescription',
    'Amount',
    'action'
  ];



  displayedColumns1 = [
    'DocumentTypeId',
    'DocumentName',
    'DocumentPath',
    // 'Amount',
    'action'
  ];

  dataSource = new MatTableDataSource<VisitDetail>();
  dataSource1 = new MatTableDataSource<VisitDetail>();
  dataSource2 = new MatTableDataSource<DocumentDetail>();


  constructor(public _CasedetailService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCaseDetailComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    private http: HttpClient
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
      TotalAmount:''
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


  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { Amount }) => sum += +(Amount || 0), 0);
    this.StudyAmount = netAmt;
   this.TotalAmount=netAmt;
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
      // this._CasedetailService.personalFormGroup.get("DocumentTypeId").setValue(this.DocumentList[0]);
    });
  }

  onSaveEntry() {
    debugger;

    // if (this.SrvcName && (parseInt(this.b_price) != 0) && this.b_qty) {
    // this.isLoading = 'save';
    this.dataSource.data = [];
    this.chargeslist.push(
      {

        // MemberId: this.Vi,
        // MemberName: this.MemberName,

      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource.data = this.chargeslist;
    console.log(this.dataSource.data);

  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }


  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {
console.log(file)
        this.fileName = file.name;
    
        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
localUrl: any[];
// showPreviewImage(event: any) {
//   debugger;
//   if (event.target.files && event.target.files[0]) {
//       var reader = new FileReader();
//       reader.onload = (event: any) => {
//           this.localUrl = event.target.result;
//       }
//       reader.readAsDataURL(event.target.files[0]);
//   }
// }


 
cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = null;
  this.uploadSub = null;
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
          "VisitFrequency": this._CasedetailService.personalFormGroup.get('VisitFrequency').value || 0,
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
      debugger
      this._CasedetailService.StudyInfoInsert(m_data).subscribe(response => {
        if (response) {
          this.StudyId=response;
          console.log(response)
          Swal.fire('New StudyDetail Save !', ' StudyDetail Save Successfully !', 'success').then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              this._matDialog.closeAll();

            }

          });
        } else {
          Swal.fire('Error !', 'StudyDetail not saved', 'error');
        }
      });
    } else {
debugger;
      var m_data1 = {
        "updateStudyInformation": {
          "operation": "UPDATE",
          "studyId": this._CasedetailService.personalFormGroup.get('StudyId').value || 0,
          "protocolNo": this._CasedetailService.personalFormGroup.get('ProtocolNo').value || '',
          "protocolTitle": this._CasedetailService.personalFormGroup.get('ProtocolTitle').value || '',
          "studyProduct": this._CasedetailService.personalFormGroup.get('StudyProduct').value || '',
          "TotalSubjects": this._CasedetailService.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this._CasedetailService.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this._CasedetailService.personalFormGroup.get('VisitFrequency').value || 0,
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
  onAddVisitDetail() {
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

    this.studySchFormGroup.get('VisitName').reset('')

    this.studySchFormGroup.get('VisitDescription').reset('')

    this.studySchFormGroup.get('Amount').reset(0)


  }

  onAddDocumentDetail() {
    debugger;
    this.DocumentList.data = [];
    this.chargeslist.push(
      {
        DocumentTypeId: this.documentFormGroup.get('DocumentTypeId').value.ConstantId || 0,
        DocumentName: this.DocumentName || '',
        DocumentPath:  this.fileName || '',// this.DocumentPath || ''
       
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource2.data = this.chargeslist;
    
  }

  onStudyschduleSave() {

   
    let insertStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let insertStudySchedule = {};
      // insertStudySchedule['studyVisitId'] = 0;
      insertStudySchedule['studyId'] = this.StudyId;
      insertStudySchedule['visitName'] = element.VisitName;
      insertStudySchedule['visitDescription'] = element.VisitDescription;
      insertStudySchedule['visitAmount'] = element.Amount;
      insertStudySchedule['createdBy'] = this.accountService.currentUserValue.user.id;
      insertStudySchedulearr.push(insertStudySchedule);
    });

    let submitData = {
      "insertStudySchedule": insertStudySchedulearr
    };
    debugger;
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
      updateStudySchedule['studyVisitId'] = 0;
      updateStudySchedule['studyId'] = this.registerObj.StudyId

      updateStudySchedule['visitName'] = element.VisitName;
      updateStudySchedule['visitDescription'] = element.VisitDescription;
      updateStudySchedule['visitAmount'] = element.Amount;
      updateStudySchedule['createdBy'] = this.accountService.currentUserValue.user.id;
      updateStudySchedulearr.push(updateStudySchedule);
    });

    let deleteStudySchedule = {};
    deleteStudySchedule['studyId'] = this.registerObj.StudyId
  

    let submitData = {
      "updateStudySchedule": updateStudySchedulearr,
      "deleteStudySchedule":deleteStudySchedule
    };

    console.log(submitData);
    this._CasedetailService.StudySchduleInsert(submitData).subscribe(response => {
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
 
  onDocumentSave() {
    let insertDocumentarr = [];

    this.dataSource2.data.forEach((element) => {
      let insertDocument = {};
      insertDocument['studyDocId'] = 0;
      insertDocument['studyId'] = this.registerObj.StudyId
      insertDocument['DocumentTypeId'] = element.DocumentTypeId;
      insertDocument['DocumentName'] = element.DocumentName;
      insertDocument['DocumentPath'] = element.DocumentPath;
      insertDocument['createdBy'] = this.accountService.currentUserValue.user.id;
      insertDocumentarr.push(insertDocument);
    });

    let submitData = {
      "insertStudyUploadDocument": insertDocumentarr
    };

    console.log(submitData);
    this._CasedetailService.DocumentInsert(submitData).subscribe(response => {
      if (response) {
        Swal.fire('New Document Save !', ' Document Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Document not saved', 'error');
      }
    });
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


  deleteTableRow(element) {
    {
      let index = this.chargeslist.indexOf(element);
      if (index >= 0) {
        this.chargeslist.splice(index, 1);
        this.dataSource.data = [];
        this.dataSource.data = this.chargeslist;
      }
      Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');
    }
  }

  deleteTableRow1(element) {
    {
      let index = this.chargeslist.indexOf(element);
      if (index >= 0) {
        this.chargeslist.splice(index, 1);
        this.dataSource2.data = [];
        this.dataSource2.data = this.chargeslist;
      }
      Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');
    }
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




export class DocumentDetail {
  StudyDocId: any;
  StudyId: any;
  DocumentTypeId: any;
  DocumentName: any;
  DocumentPath: any;
  /**
   * Constructor
   *
   * @param DocumentDetail
   */

  constructor(DocumentDetail) {
    {
      this.StudyDocId = DocumentDetail.StudyDocId || 0;
      this.StudyId = DocumentDetail.StudyId || 0;
      this.DocumentTypeId = DocumentDetail.DocumentTypeId || '';

      this.DocumentName = DocumentDetail.DocumentName || '';
      this.DocumentPath = DocumentDetail.DocumentPath || '';
      // this.Amount = VisitDetail.Amount || '';

    }
  }
}



// https://blog.angular-university.io/angular-file-upload/