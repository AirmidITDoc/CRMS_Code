import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
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
import { DcoumentUploadComponent } from '../../dcoument-upload/dcoument-upload.component';

@Component({
  selector: 'app-new-case-detail',
  templateUrl: './new-case-detail.component.html',
  styleUrls: ['./new-case-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCaseDetailComponent implements OnInit {

  
  chargeslist: any = [];
  personalFormGroup: FormGroup;
  studySchFormGroup:FormGroup;
  documentFormGroup:FormGroup;
  currentDate=new Date();
  submitted = false;
  now = Date.now();
  isLoading:any;
  CaseIdList:any = [];
snackmessage:any;
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
VisitName:any;
VisitDescription:any;
Amount:any;

DocumentName:any;
DocumentPath:any;
// Amount:any;

VisitList:any=[]
CompanyList:any=[];
DocumentList:any=[];

//company filter
public companyFilterCtrl: FormControl = new FormControl();
public filteredCompany: ReplaySubject<any> = new ReplaySubject<any>(1);

//Document filter
public documentFilterCtrl: FormControl = new FormControl();
public filteredDocument: ReplaySubject<any> = new ReplaySubject<any>(1);



  private _onDestroy = new Subject<void>();
  // private _onDestroy1 = new Subject<void>();

  displayedColumns = [
  
    'VisitName',
    'VisitDescription',
    'Amount',
    'action'
  ];

  

  displayedColumns1 = [
  
    'DocumentName',
    'DocumentPath',
    // 'Amount',
    'action'
  ];

  dataSource = new MatTableDataSource<VisitDetail>();
  dataSource1 = new MatTableDataSource<VisitDetail>();
  dataSource2 = new MatTableDataSource<DocumentDetail>();


  constructor(public _registerService: CasedetailService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCaseDetailComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
    )  
    {}

  
  ngOnInit(): void {
   
  console.log(this.data)
   this.personalFormGroup = this.createPesonalForm();
   this.studySchFormGroup =this.createstudySchForm();
    this.documentFormGroup=this.createdocumentForm();


      if(this.data){
        this.registerObj = this.data.registerObj;
console.log(this.registerObj);
      
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
  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
   // this.personalFormGroup.reset();
  }
  createPesonalForm() {
    return this.formBuilder.group({
      ProtocolNo: '',
      ProtocolTitle: '',
      StudyProduct: '',
      TotalSubjects: '',
      TotalVisits: ['', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern("^[0-9]*$")]],
        VisitFrequency:'',
        StudyStartDate:[{ value: this.registerObj.StudyStartDate }],
        StudyEndDate:[{ value: this.registerObj.StudyEndDate }],
        Sponser: '',
        Investigator: '',
        Institution:' ',
        AgreementFileName: '',
        CompanyId:''
    });
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
      console.log(data);
      this.filteredCompany.next(this.CompanyList.slice());
    });
  }

  VisitFrequencyComboList(){
    var mdata ={
      ConstanyType:"VisitFrequency"
    };
       
    this._registerService.getVisitFrequencyCList(mdata).subscribe(data => {
      this.VisitFrequencyList = data;
      console.log( this.VisitFrequencyList );
      // this.filteredCity.next(this.VisitFrequencyList.slice());
    });
  }


  DocumentComboList(){
    var mdata ={
      ConstanyType:"CaseDocuments"
    };
       
    this._registerService.getDocumentList(mdata).subscribe(data => {
      this.DocumentList = data;
      console.log( this.VisitFrequencyList );
      this.filteredDocument.next(this.DocumentList.slice());
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

  UploadDoc(){
 
    // const dialogRef = this._matDialog.open(DcoumentUploadComponent,
    //   {
    //     maxWidth: "25vw",
    //     height: '25vw',
    //     width: '100%',
       
    //   });
    // dialogRef.afterClosed().subscribe(result => {
      
    // });
  }
 
  UploadImgage(){
    const dialogRef = this._matDialog.open(ImageUploadComponent,
      {
        maxWidth: "45vw",
        height: '45vw',
        width: '100%',
       
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  onSubmit() {

        this.isLoading = 'submit';

        if(this.registerObj.operation !="UPDATE"){
    
      var m_data = {
        "insertStudyInformation": {
          "studyId":0,
          "protocolNo": this.personalFormGroup.get('ProtocolNo').value || '',
          "protocolTitle": this.personalFormGroup.get('ProtocolTitle').value || '',
          "studyProduct": this.personalFormGroup.get('StudyProduct').value || '',
          "TotalSubjects": this.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this.personalFormGroup.get('VisitFrequency').value.ConstantId || 0,
          "sponser": this.personalFormGroup.get('CompanyId').value.CompanyId || 0,
          "investigator": this.personalFormGroup.get('Investigator').value || '',
          "institution": this.personalFormGroup.get('Institution').value || 0,
          "studyStartDate": this.registerObj.StudyStartDate,//this.datePipe.transform(this.personalFormGroup.get('CaseStartDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "studyEndDate":this.registerObj.StudyEndDate,// this.datePipe.transform(this.personalFormGroup.get('CaseEndDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value.ConstantId || 0,
          "createdBy": this.accountService.currentUserValue.user.id
          
        }
      }
      console.log(m_data);
      this._registerService.StudyInfoInsert(m_data).subscribe(response => {
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
    }else{

      var m_data1 = {
        "updateStudyInformation": {
          "studyId":this.registerObj.StudyId,
          "operation":"UPDATE",
            "protocolNo":  this.personalFormGroup.get('ProtocolNo').value || '',
            "protocolTitle": this.personalFormGroup.get('ProtocolTitle').value || '',
            "studyProduct": this.personalFormGroup.get('StudyProduct').value || '',
            "TotalSubjects": this.personalFormGroup.get('TotalSubjects').value || 0,
            "TotalVisits": this.personalFormGroup.get('TotalVisits').value || '',
            "VisitFrequency": this.personalFormGroup.get('VisitFrequency').value.ConstantId || 0,
            "sponser": this.personalFormGroup.get('CompanyId').value.CompanyId || 0,
            "investigator": this.personalFormGroup.get('Investigator').value || '',
            "institution": this.personalFormGroup.get('Institution').value || '',
            "studyStartDate": this.registerObj.StudyStartDate,//this.datePipe.transform(this.personalFormGroup.get('CaseStartDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
            "studyEndDate":this.registerObj.StudyEndDate,// this.datePipe.transform(this.personalFormGroup.get('CaseEndDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
             "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value.ConstantId || 0,
           
            // "IsActive": 1,
             "UpdatedBy": this.accountService.currentUserValue.user.id
  
        }
      }
      console.log(m_data1);
      this._registerService.StudyInfoUpdate(m_data1).subscribe(response => {
  
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
  onAddVisitDetail(){
    this.VisitList.data = [];
    this.chargeslist.push(
      {
        VisitName:this.VisitName,
        VisitDescription: this.VisitDescription,
         Amount: this.Amount
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource1.data = this.chargeslist;
    console.log(this.VisitList.data);

  }

  onAddDocumentDetail(){
    this.DocumentList.data = [];
    this.chargeslist.push(
      {
        DocumentName:this.DocumentName,
        DocumentPath: this.DocumentPath
         
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dataSource2.data = this.chargeslist;
    console.log(this.DocumentList.data);
  }

  onStudySave(){

    debugger;
    let insertStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let insertStudySchedule = {};
      insertStudySchedule['studyVisitId'] = 0;
      insertStudySchedule['studyId'] = 1;

      insertStudySchedule['visitName'] = element.VisitName;
      insertStudySchedule['visitDescription'] = element.VisitDescription;
      insertStudySchedule['visitAmount'] = element.Amount;
      insertStudySchedule['createdBy'] =  this.accountService.currentUserValue.user.id;
      insertStudySchedulearr.push(insertStudySchedule);
    });
  
    let submitData = {
            "insertStudySchedule": insertStudySchedulearr
    };
  
    console.log(submitData);
    this._registerService.StudySchduleInsert(submitData).subscribe(response => {
      if (response) {
        Swal.fire('New StudySchedule Save !', ' StudySchedule Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'StudySchedule not saved', 'error');
      }
    });
  
  }

  onStudyUpdate(){
    let updateStudySchedulearr = [];
    this.dataSource1.data.forEach((element) => {
      let updateStudySchedule = {};
      updateStudySchedule['studyVisitId'] = 0;
      updateStudySchedule['studyId'] = 0;

      updateStudySchedule['visitName'] = element.VisitName;
      updateStudySchedule['visitDescription'] = element.VisitDescription;
      updateStudySchedule['visitAmount'] = element.Amount;
      updateStudySchedule['createdBy'] =  this.accountService.currentUserValue.user.id;
      updateStudySchedulearr.push(updateStudySchedule);
    });
  
    let submitData = {
            "updateStudySchedule": updateStudySchedulearr
    };
  
    console.log(submitData);
    this._registerService.StudySchduleInsert(submitData).subscribe(response => {
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


  onDocumentSave(){
    let insertDocumentarr = [];
    
    this.dataSource2.data.forEach((element) => {
      let insertDocument = {};
      insertDocument['studyDocId'] = 0;
      insertDocument['studyId'] = 0;

      insertDocument['DocumentTypeId'] = element.DocumentTypeId;
      insertDocument['DocumentName'] = element.DocumentName;
      insertDocument['DocumentPath'] = element.DocumentPath;
      insertDocument['createdBy'] =  this.accountService.currentUserValue.user.id;
      insertDocumentarr.push(insertDocument);
    });
  
    let submitData = {
            "insertStudyUploadDocument": insertDocumentarr
    };
  
    console.log(submitData);
    this._registerService.DocumentInsert(submitData).subscribe(response => {
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
    this.snackmessage=s;
    console.log(s);
    console.log(this.snackmessage);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 15000);
  }

  
  deleteTableRow(element) {
  {  let index = this.chargeslist.indexOf(element);
  if (index >= 0) {
    this.chargeslist.splice(index, 1);
    this.dataSource.data = [];
    this.dataSource.data = this.chargeslist;
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
  PatientName:any;
  RegNo:any;
  MobileNo:any;
  AgeYear:any;
  TotalBillAmt:any;
 BillNo:any;
 StudyId:any;
 operation:any;
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
      this.StudyStartDate = CaseDetail.StudyStartDate ||  this.currentDate;
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
      this.BillNo=CaseDetail.BillNo || 0;
      this.StudyId=CaseDetail.StudyId || 0;
      this.operation=CaseDetail.operation || 0;
  }
}

}



export class VisitDetail {
  VisitName:any;
  VisitDescription:any;
  Amount:any;
 
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
  StudyDocId:any;
  StudyId:any;
  DocumentTypeId:any;
  DocumentName:any;
  DocumentPath:any;
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