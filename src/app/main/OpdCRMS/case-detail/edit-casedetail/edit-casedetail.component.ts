import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CasedetailService } from '../casedetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-casedetail',
  templateUrl: './edit-casedetail.component.html',
  styleUrls: ['./edit-casedetail.component.scss']
})
export class EditCasedetailComponent implements OnInit {

 
  personalFormGroup: FormGroup;
  
  submitted = false;
  now = Date.now();
  isLoading:any;
  CaseIdList:any = [];
snackmessage:any;

// CaseId: any;
// CaseTitle: any;
// CaseDescription: any;
// TotalSubjects: number;
// TotalVisits: number;
// VisitFrequency: string;
// CaseStartDate: Date;
// CaseEndDate: Date;
// CaseStatus: string;
// CompanyName: string;
// CaseRepresentative: string;
// HospitalRepresentative: string;
// AgreementFileName: String;
registerObj = new CaseDetail({});

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
    )  
    {}

  
  ngOnInit(): void {
   
  console.log(this.data)
   this.personalFormGroup = this.createPesonalForm();
   
      if(this.data){
        this.registerObj = this.data.registerObj;
     
      }

    

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
        CaseStartDate:[(new Date()).toISOString()],
        CaseEndDate:[(new Date()).toISOString()],
        CaseStatus: '',
        CompanyName: '',
        CaseRepresentative: '',
        HospitalRepresentative: '',
        AgreementFileName: ''
      
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
        "updateCaseDetail": {
          "CaseId": this.personalFormGroup.get('CaseId').value.CaseId || 0,
          "CaseTitle": this.personalFormGroup.get('CaseTitle').value || '',
          "CaseDescription": this.personalFormGroup.get('CaseDescription').value || '',
          "TotalSubjects": this.personalFormGroup.get('TotalSubjects').value || 0,
          "TotalVisits": this.personalFormGroup.get('TotalVisits').value || '',
          "VisitFrequency": this.personalFormGroup.get('VisitFrequency').value || '',
          "CaseStartDate": this.datePipe.transform(this.personalFormGroup.get('CaseStartDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "CaseEndDate": this.datePipe.transform(this.personalFormGroup.get('CaseEndDate').value, "MM-dd-yyyy"),// this.registerObj.DateofBirth || "2021-03-31",
          "CaseStatus": this.personalFormGroup.get('CaseStatus').value || '',
          "CompanyName": this.personalFormGroup.get('CompanyName').value || 0,
          "CaseRepresentative": this.personalFormGroup.get('CaseRepresentative').value || '',
          "HospitalRepresentative": this.personalFormGroup.get('HospitalRepresentative').value || '',
          "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value || '',
          "createdBy": this.accountService.currentUserValue.user.id,
          "IsActive":1,
          "UpdatedBy": this.accountService.currentUserValue.user.id
          
        }
      }
      console.log(m_data);
      this._registerService.CaseDetailUpdate(m_data).subscribe(response => {
        if (response) {
          this.myFunction("CaseDetail Data Updated Successfully !");
          // const dialogRef = this._matDialog.open(CaseDetailListComponent,
          //   {
          //     maxWidth: "95%",
          //     height: '700px',
          //     width: '100%',
          //     // height: "100%"
          //   });
          this._matDialog.closeAll();
        } else {
          this.myFunction("CaseDetail Data  not Updated', 'error !");
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
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
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
    
    }
  }
}

