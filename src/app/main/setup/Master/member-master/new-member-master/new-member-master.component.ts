import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MemberMasterService } from '../member-master.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-new-member-master',
  templateUrl: './new-member-master.component.html',
  styleUrls: ['./new-member-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewMemberMasterComponent implements OnInit {

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

  constructor(public _MemberMasterService: MemberMasterService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewMemberMasterComponent>,
    private _snackBar: MatSnackBar,
    // public datePipe: DatePipe,
    private router: Router,
    // private toastr: ToastrService
  ) { }


  ngOnInit(): void {
   
    if (this.data) {
      this.registerObj = this.data.registerObj;
    }
    

    this.getcityList();
    this.cityFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCity();
    });

    this.setDropdownObjs1();
  }



  get f() {
    return this._MemberMasterService.personalFormGroup.controls;
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
    
    this._MemberMasterService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
    });
  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._MemberMasterService.personalFormGroup.reset();
  }



  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 
  
  setDropdownObjs1() {
    debugger;
    const toSelectCity = this.cityList.find(c => c.CityId == this.registerObj.CityId);
    this._MemberMasterService.personalFormGroup.get('CityId').setValue(toSelectCity);

  }


  onSubmit() {
debugger
    this.isLoading = 'submit';

    if(!this._MemberMasterService.personalFormGroup.get("MemberId").value) {
    var m_data = {
      "insertMemberMaster": {
        "MemberId":0,// this._MemberMasterService.personalFormGroup.get('MemberId').value.CaseId || 0,
        "FirstName": this._MemberMasterService.personalFormGroup.get('FirstName').value || '',
        "MiddleName": this._MemberMasterService.personalFormGroup.get('MiddleName').value || '',
        "LastName": this._MemberMasterService.personalFormGroup.get('LastName').value || 0,
        "Member_Address": this._MemberMasterService.personalFormGroup.get('Member_Address').value || '',
        "CityId": this._MemberMasterService.personalFormGroup.get('CityId').value.CityId || 0,
        "PinCode": this._MemberMasterService.personalFormGroup.get('PinCode').value || '',
        "MobileNo": this._MemberMasterService.personalFormGroup.get('MobileNo').value || 0,
        "EmailId": this._MemberMasterService.personalFormGroup.get('EmailId').value || '',
        "StudyAmount": this._MemberMasterService.personalFormGroup.get('StudyAmount').value || '',

        // "AgreementFileName": this._MemberMasterService.personalFormGroup.get('AgreementFileName').value || '',
        "createdBy": this.accountService.currentUserValue.user.id

      }
    }
    console.log(m_data);
    this._MemberMasterService.MemberDetailInsert(m_data).subscribe(response => {
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
  }else{
    var m_data1 = {
      "updateMemberMaster": {
        "operation": "UPDATE",
        "MemberId":  this._MemberMasterService.personalFormGroup.get('MemberId').value || 0,
        "FirstName": this._MemberMasterService.personalFormGroup.get('FirstName').value || '',
        "MiddleName": this._MemberMasterService.personalFormGroup.get('MiddleName').value || '',
        "LastName": this._MemberMasterService.personalFormGroup.get('LastName').value || 0,
        "Member_Address": this._MemberMasterService.personalFormGroup.get('Member_Address').value || '',
        "CityId": this._MemberMasterService.personalFormGroup.get('CityId').value.CityId || 0,
        "PinCode": this._MemberMasterService.personalFormGroup.get('PinCode').value || '',
        "MobileNo": this._MemberMasterService.personalFormGroup.get('MobileNo').value || '',
        "EmailId": this._MemberMasterService.personalFormGroup.get('EmailId').value || '',
        "StudyAmount": this._MemberMasterService.personalFormGroup.get('StudyAmount').value || '',
        "updatedBy": this.accountService.currentUserValue.user.id

      }
    }
    console.log(m_data1);
    this._MemberMasterService.MemberDetailUpdate(m_data1).subscribe(response => {
      if (response) {
        Swal.fire('Edit MemberDetail  !', ' MemberDetail Edit Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();

          }

        });
      } else {
        Swal.fire('Error !', 'MemberDetail not Updated', 'error');
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