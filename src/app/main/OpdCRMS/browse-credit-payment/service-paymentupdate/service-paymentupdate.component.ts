import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { CreditPaymentService } from '../credit-payment.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BillDetails } from '../browse-credit-payment.component';

@Component({
  selector: 'app-service-paymentupdate',
  templateUrl: './service-paymentupdate.component.html',
  styleUrls: ['./service-paymentupdate.component.scss']
})
export class ServicePaymentupdateComponent implements OnInit {

  serviceFormGroup: FormGroup;
  currentDate = new Date();
  submitted = false;
  now = Date.now();
  isLoading: any;
  vChargesId: any = 0;

  vUTINo: any = 0
  vComments: any = ''
  vPaymentDate = new Date().toISOString();
  screenFromString = 'admission-form';
  registerObj: BillDetails;


  constructor(public _CreditPaymentService: CreditPaymentService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ServicePaymentupdateComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.serviceFormGroup = this.createServiceForm();
    if (this.data) {
      this.registerObj = this.data.registerObj;
      if (this.registerObj.UTINo != null)
        this.vUTINo = this.registerObj
      if (this.registerObj.ChargesId != null)
        this.vChargesId = this.registerObj.ChargesId;
      if (this.registerObj.Comments != null)
        this.vComments = this.registerObj.Comments
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.serviceFormGroup.reset();
  }

  createServiceForm() {
    return this.formBuilder.group({
      ChargesId: [''],
      PaymentDate: [(new Date()).toISOString()],
      UTINo: [''],
      Comments: ['']

    });
  }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }

  onSubmit() {

    this.isLoading = 'submit';
    debugger
    var m_data = {
      "patientServicepayupdate": {
        "chargesId": this.vChargesId || 0,
        "utiNo": this.serviceFormGroup.get('UTINo').value || '',
        "paymentDate": this.serviceFormGroup.get('PaymentDate').value || this.vPaymentDate,
        "comments": this.serviceFormGroup.get('Comments').value || '',
      }
    }
    console.log(m_data);
    this._CreditPaymentService.PatientServicePaymentupdate(m_data).subscribe(response => {
      if (response) {
        Swal.fire('Patient Service Payment Updated !', 'Update Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Patient Service Payment not saved', 'error');
      }
    });


  }

  onClose() {
    this.dialogRef.close();
  }


}



export class MemberDetail {
  MemberId: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  Member_Address: any;
  CityId: any;
  PinCode: any;
  MobileNo: any;
  EmailId: any;
  StudyAmount: any;



  /**
   * Constructor
   *
   * @param MemberDetail
   */

  constructor(MemberDetail) {
    {
      this.MemberId = MemberDetail.MemberId || '';
      this.FirstName = MemberDetail.FirstName || '';
      this.MiddleName = MemberDetail.MiddleName || '';
      this.LastName = MemberDetail.LastName || 0;
      this.Member_Address = MemberDetail.Member_Address || '';
      this.CityId = MemberDetail.CityId || '';
      this.PinCode = MemberDetail.PinCode || '';
      this.MobileNo = MemberDetail.MobileNo || '';
      this.EmailId = MemberDetail.EmailId || '';
      this.StudyAmount = MemberDetail.StudyAmount || '';

    }
  }

}
