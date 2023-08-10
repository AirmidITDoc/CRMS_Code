import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommitteMeetingService } from '../committe-meeting.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-committee-master-member',
  templateUrl: './committee-master-member.component.html',
  styleUrls: ['./committee-master-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CommitteeMasterMemberComponent implements OnInit {

  registerObj = new MemberDetail({});
  personalFormGroup: FormGroup;
  screenFromString = 'admission-form';
  
  constructor(  public _CommitteMeetingService: CommitteMeetingService,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    public dialogRef: MatDialogRef<CommitteeMasterMemberComponent>) { }
  displayedColumns = [
    // 'MemberId',
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
      CommitteeId:'',
      CommitteeName: '',
      MemberId: '',
      Amount:''
    });
  }
 
  private MemberDepartment() {

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
  this._CommitteMeetingService.getMemberMasterList(m).subscribe((data) => {
      this.MembercmbList = data;
      
      this.filteredMember.next(this.MembercmbList.slice());
  });
}


onSubmit() {

  this.isLoading = 'submit';
   let committeeInsertObj = {};
   committeeInsertObj['committeeId']= 0,
   committeeInsertObj['commiteeName']= this.personalFormGroup.get('CommitteeName').value || 0,
   committeeInsertObj['createdBy']= this.accountService.currentUserValue.user.id
  
  let MemberDetailarr = [];
  this.dataSource.data.forEach((element) => {
    let MemberDetailObj = {};
    MemberDetailObj['committeeId'] = 0;
    MemberDetailObj['memberId'] = element.MemberId;
    MemberDetailObj['createdBy'] =  this.accountService.currentUserValue.user.id;
    MemberDetailarr.push(MemberDetailObj);
  });

  let submitData = {
    "insertCommitteeMaster": committeeInsertObj,
    "insertCommitteeMemberDetails": MemberDetailarr
  };

  console.log(submitData);
  this._CommitteMeetingService.CommitteeMemberDetailInsert(submitData).subscribe(response => {
    if (response) {
      Swal.fire('New CommitteeMember Save !', ' CommitteeMember Save Successfully !', 'success').then((result) => {
        if (result.isConfirmed) {
          this._matDialog.closeAll();
        }
      });
    } else {
      Swal.fire('Error !', 'CommitteeMember not saved', 'error');
    }
  });


}


deleteTableRow(element) {
    
  let index = this.chargeslist.indexOf(element);
  if (index >= 0) {
    this.chargeslist.splice(index, 1);
    this.dataSource.data = [];
    this.dataSource.data = this.chargeslist;
  }
  Swal.fire('Success !', 'List Row Deleted Successfully', 'success');
}


onSaveEntry(element) {
  this.dataSource.data = [];
  this.chargeslist.push(
    {
      MemberId: element.MemberId,
      MemberName: element.MemberName
    });
  this.isLoading = '';
  
  this.dataSource.data = this.chargeslist;
  
}



dateTimeObj: any;
getDateTime(dateTimeObj) {
  
  this.dateTimeObj = dateTimeObj;
}

OnSave(){
  
}

onClose(){
  this.dialogRef.close();
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
   
    }
  }
}