import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ReplaySubject, Subject } from 'rxjs';
import { CommitteMeetingService } from '../committe-meeting.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddMemberComponent implements OnInit {



  personalFormGroup: FormGroup;
  currentDate = new Date();
  submitted = false;
  now = Date.now();
  isLoading: any;
  CaseIdList: any = [];
  snackmessage: any;
  screenFromString = 'admission-form';
  registerObj:MemberDetail;

  cityList: any = [];
  DocumentList: any = [];

  
  // city filter
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCity: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();
  // private _onDestroy1 = new Subject<void>();




  constructor(public _CommitteMeetingService: CommitteMeetingService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMemberComponent>,
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

    this.getcityList();

    this.cityFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCity();
    });

 
  }


   // City filter code
   private filterCity() {

    if (!this.cityList) {
      return;
    }
    // get the search keyword
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCity.next(this.cityList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredCity.next(
      this.cityList.filter(bank => bank.CityName.toLowerCase().indexOf(search) > -1)
    );
  }


  getcityList() {
    
    this._CommitteMeetingService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
    });
  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this.personalFormGroup.reset();
  }
  createPesonalForm() {
    return this.formBuilder.group({
      MemberId: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Member_Address: '',
      CityId: '',
      PinCode: ' ',
      MobileNo: '',
      EmailId: '',
      StudyAmount: ''

    });
  }



  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 
  onSubmit() {

    this.isLoading = 'submit';

    var m_data = {
      "insertMemberMaster": {
        "MemberId":0,// this.personalFormGroup.get('MemberId').value.CaseId || 0,
        "FirstName": this.personalFormGroup.get('FirstName').value || '',
        "MiddleName": this.personalFormGroup.get('MiddleName').value || '',
        "LastName": this.personalFormGroup.get('LastName').value || 0,
        "Member_Address": this.personalFormGroup.get('Member_Address').value || '',
        "CityId": this.personalFormGroup.get('CityId').value.CityId || 0,
        "PinCode": this.personalFormGroup.get('PinCode').value || '',
        "MobileNo": this.personalFormGroup.get('MobileNo').value || 0,
        "EmailId": this.personalFormGroup.get('EmailId').value || '',
        "StudyAmount": this.personalFormGroup.get('StudyAmount').value || '',

        // "AgreementFileName": this.personalFormGroup.get('AgreementFileName').value || '',
        "createdBy": this.accountService.currentUserValue.user.id

      }
    }
    console.log(m_data);
    this._CommitteMeetingService.MemberDetailInsert(m_data).subscribe(response => {
      if (response) {
        Swal.fire('New MemberDetail Save !', ' MemberDetail Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();

          }

        });
      } else {
        Swal.fire('Error !', 'MemberDetail not saved', 'error');
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
}



export class MemberDetail {
  MemberId:any;
  FirstName:any;
  MiddleName:any;
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