import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommitteMeetingService } from '../committe-meeting.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-committee-meeting',
  templateUrl: './new-committee-meeting.component.html',
  styleUrls: ['./new-committee-meeting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCommitteeMeetingComponent implements OnInit {


  constructor(  public _CommitteMeetingService: CommitteMeetingService,
    
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCommitteeMeetingComponent>) { }

    personalFormGroup: FormGroup;
    registerObj = new MemberDetail({});
    
  displayedColumns = [
    'MemberId',
    'MemberName',
    'action'
  ];

  dataSource = new MatTableDataSource<MemberDetail>();
  chargeslist: any = [];
  isLoading:any;
  MemberId:any;
  MemberName:any;
  MembercmbList: any = [];


  public memberFilterCtrl: FormControl = new FormControl();
  public filteredMember: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();

  DeptSource = new MatTableDataSource<MemberDetail>();

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
    this.getMemberNameCombobox();

    
    this.memberFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
        
    });
  }

  createPesonalForm() {
    return this.formBuilder.group({
      CommitteeName: '',
      Location: '',
      Amount:''

    });
  }

  private MemberDepartment() {
    // debugger;
    if (!this.MembercmbList) {
        return;
    }
    // get the search keyword
    let search = this.memberFilterCtrl.value;
    if (!search) {
        this.filteredMember.next(this.MembercmbList.slice());
        return;
    } else {
        search = search.toLowerCase();
    }
    // filter
    this.filteredMember.next(
        this.MembercmbList.filter(
            (bank) => bank.FirstName.toLowerCase().indexOf(search) > -1
        )
    );
}
getMemberNameCombobox() {
  var m={
    FirstName:'%',                  
    LastName :'%'
    
  };

  this._CommitteMeetingService.getMemberMasterList().subscribe((data) => {
      this.MembercmbList = data;
      console.log(data);
      this.filteredMember.next(this.MembercmbList.slice());
   
  });
}



onSaveEntry() {
  debugger;
 
  // if (this.SrvcName && (parseInt(this.b_price) != 0) && this.b_qty) {
  // this.isLoading = 'save';
  this.dataSource.data = [];
  this.chargeslist.push(
    {
     
      MemberId: this.MemberId,
      MemberName: this.MemberName,
     
    });
  this.isLoading = '';
  console.log(this.chargeslist);
  this.dataSource.data = this.chargeslist;
  console.log(this.dataSource.data);
  
}


onSubmit() {

  this.isLoading = 'submit';

  var m_data = {
    "insertMemberDetail": {
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
  this._CommitteMeetingService.CommitteeDetailInsert(m_data).subscribe(response => {
    if (response) {
      Swal.fire('New Committee Save !', ' New Committee Save Successfully !', 'success').then((result) => {
        if (result.isConfirmed) {
          this._matDialog.closeAll();

        }

      });
    } else {
      Swal.fire('Error !', 'Committee not saved', 'error');
    }
  });


}

onClose(){}


dateTimeObj: any;
getDateTime(dateTimeObj) {
  // console.log('dateTimeObj==', dateTimeObj);
  this.dateTimeObj = dateTimeObj;
}

}




export class MemberDetail {
  MemberId:any;
  MemberName:any;
  FirstName:any;
  MiddleName: any;
  LastName: any;
  Member_Address: any;
  CityId: any;
  PinCode: any;
  MobileNo: any;
  EmailId: any;
  StudyAmount: any;
  Location:any;
  /**
   * Constructor
   *
   * @param MemberDetail
   */

  constructor(MemberDetail) {
    {
      this.MemberId = MemberDetail.MemberId || '';
      this.MemberName = MemberDetail.MemberName || '';
      this.FirstName = MemberDetail.FirstName || '';
      this.MiddleName = MemberDetail.MiddleName || '';
      this.LastName = MemberDetail.LastName || 0;
      this.Member_Address = MemberDetail.Member_Address || '';
      this.CityId = MemberDetail.CityId || '';
      this.PinCode = MemberDetail.PinCode || '';
      this.MobileNo = MemberDetail.MobileNo || '';
      this.EmailId = MemberDetail.EmailId || '';
      this.StudyAmount = MemberDetail.StudyAmount || '';
      this.Location = MemberDetail.Location || '';
    }
  }
}