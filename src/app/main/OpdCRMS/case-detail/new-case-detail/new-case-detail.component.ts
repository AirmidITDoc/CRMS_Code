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

@Component({
  selector: 'app-new-case-detail',
  templateUrl: './new-case-detail.component.html',
  styleUrls: ['./new-case-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCaseDetailComponent implements OnInit {

  

  personalFormGroup: FormGroup;
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
   
      if(this.data){
        this.registerObj = this.data.registerObj;

        // this.CaseId=this.data.CaseId;
        // this.CaseTitle=this.data.CaseTitle;
        // this.CaseDescription=this.data.CaseDescription;
        // this.TotalSubjects=this.data.TotalSubjects;
        // this.TotalVisits=this.data.TotalVisits;
        // this.VisitFrequency=this.data.VisitFrequency;
        // this.CaseStartDate=this.data.CaseStartDate;
        // this.CaseEndDate=this.data.CaseEndDate;
        // this.CaseStatus=this.data.CaseStatus;
        // this.CompanyName=this.data.CompanyName;
        // this.CaseRepresentative=this.data.CaseRepresentative;
        // this.HospitalRepresentative=this.data.HospitalRepresentative;
        // this.AgreementFileName=this.data.AgreementFileName;
      
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
      CaseId: '',
      CaseTitle: '',
      CaseDescription: '',
      TotalSubjects: '',
      TotalVisits: ['', [
        Validators.required,
        Validators.maxLength(1),
        Validators.pattern("^[0-9]*$")]],
        VisitFrequency:'',
        CaseStartDate:[{ value: this.registerObj.CaseStartDate }],
        CaseEndDate:[{ value: this.registerObj.CaseEndDate }],
        CaseStatus: '',
        CompanyName: '',
        CaseRepresentative: '',
        HospitalRepresentative: '',
        AgreementFileName: ''
      
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
       
    this._registerService.getVisitFrequencyCList(mdata).subscribe(data => {
      this.DocumentList = data;
      console.log( this.VisitFrequencyList );
      this.filteredDocument.next(this.DocumentList.slice());
    });
  }

  addEmptyRow() { }
 
  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 
  
  onSubmit() {

        this.isLoading = 'submit';
    
      var m_data = {
        "insertCaseDetail": {
          "CaseId": this.personalFormGroup.get('CaseId').value.CaseId || 0,
          "CaseTitle": this.personalFormGroup.get('CaseTitle').value || '',
          "CaseDescription": this.personalFormGroup.get('CaseDescription').value || '',
          "TotalSubjects": this.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this.personalFormGroup.get('VisitFrequency').value || '',
          "CaseStartDate": this.registerObj.CaseStartDate,//this.datePipe.transform(this.personalFormGroup.get('CaseStartDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "CaseEndDate":this.registerObj.CaseEndDate,// this.datePipe.transform(this.personalFormGroup.get('CaseEndDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "CaseStatus":1,// this.personalFormGroup.get('CaseStatus').value || '',
          "CompanyName": this.personalFormGroup.get('CompanyName').value || 0,
          "CaseRepresentative": this.personalFormGroup.get('CaseRepresentative').value || '',
          "HospitalRepresentative": this.personalFormGroup.get('HospitalRepresentative').value || '',
          "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value || '',
          "createdBy": this.accountService.currentUserValue.user.id
          
        }
      }
      console.log(m_data);
      this._registerService.CaseDetailInsert(m_data).subscribe(response => {
        if (response) {
          this.myFunction("CaseDetail Data save Successfully !");
          // const dialogRef = this._matDialog.open(CaseDetailListComponent,
          //   {
          //     maxWidth: "95%",
          //     height: '700px',
          //     width: '100%',
          //     // height: "100%"
          //   });
          this._matDialog.closeAll();
        } else {
          this.myFunction("CaseDetail Data  not saved', 'error !");
          // Swal.fire('Error !', 'Register Data  not saved', 'error');
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
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
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
  currentDate = new Date();
  PatientName:any;
  RegNo:any;
  MobileNo:any;
  AgeYear:any;
  TotalBillAmt:any;
 
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
      this.CaseStartDate = CaseDetail.CaseStartDate ||  this.currentDate;
      this.CaseEndDate = CaseDetail.CaseEndDate || this.currentDate;
      this.CaseStatus = CaseDetail.CaseStatus || '';
      this.CompanyName = CaseDetail.CompanyName || '';
      this.CaseRepresentative = CaseDetail.CaseRepresentative || '';
      this.AgreementFileName = CaseDetail.AgreementFileName || '';

      this.PatientName = CaseDetail.PatientName || '';
      this.RegNo = CaseDetail.RegNo || '';
      this.MobileNo = CaseDetail.MobileNo || '';
      this.AgeYear = CaseDetail.AgeYear || '';
      this.TotalBillAmt = CaseDetail.TotalBillAmt || '';
    
    }
  }
}

