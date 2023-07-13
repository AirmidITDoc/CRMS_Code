import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommitteeMemberService } from '../committee-member.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-new-committee-member',
  templateUrl: './new-committee-member.component.html',
  styleUrls: ['./new-committee-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCommitteeMemberComponent implements OnInit {

  registerObj = new MemberDetail({});
  personalFormGroup: FormGroup;
  screenFromString = 'admission-form';
  
  constructor(  public _CommitteMeetingService: CommitteeMemberService,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    public dialogRef: MatDialogRef<NewCommitteeMemberComponent>) { }
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
    
    this.getMemberNameCombobox();

    this.memberFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
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
  this._CommitteMeetingService.getMemberMasterList(m).subscribe((data) => {
      this.MembercmbList = data;
      this.filteredMember.next(this.MembercmbList.slice());
  });
}


onSubmit() {

 if(!this._CommitteMeetingService.personalFormGroup.get('CommitteeId').value){
  this.isLoading = 'submit';
   let committeeInsertObj = {};
   committeeInsertObj['committeeId']= 0,//this.personalFormGroup.get('CommitteeId').value.CommitteeId || 0,
   committeeInsertObj['commiteeName']= this._CommitteMeetingService.personalFormGroup.get('CommitteeName').value || 0,
   committeeInsertObj['createdBy']= this.accountService.currentUserValue.user.id
  
  let Billdetsarr = [];
  this.dataSource.data.forEach((element) => {
    let BillDetailsInsertObj = {};
    BillDetailsInsertObj['committeeId'] = 0;
    BillDetailsInsertObj['memberId'] = element.MemberId;
    BillDetailsInsertObj['createdBy'] =  this.accountService.currentUserValue.user.id;
    Billdetsarr.push(BillDetailsInsertObj);
  });

  let submitData = {
    "insertCommitteeMaster": committeeInsertObj,
    "insertCommitteeMemberDetails": Billdetsarr
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
 }else{


  this.isLoading = 'submit';
  let committeeInsertObj = {};
  committeeInsertObj['committeeId']= this._CommitteMeetingService.personalFormGroup.get('CommitteeId').value || 0,
  committeeInsertObj['commiteeName']= this._CommitteMeetingService.personalFormGroup.get('CommitteeName').value || 0,
  committeeInsertObj['createdBy']= this.accountService.currentUserValue.user.id
 
 let Billdetsarr = [];
 this.dataSource.data.forEach((element) => {
   let BillDetailsInsertObj = {};
   BillDetailsInsertObj['committeeId'] = 0;
   BillDetailsInsertObj['memberId'] = element.MemberId;
   BillDetailsInsertObj['createdBy'] =  this.accountService.currentUserValue.user.id;
   Billdetsarr.push(BillDetailsInsertObj);
 });

 let submitData = {
   "insertCommitteeMaster": committeeInsertObj,
   "insertCommitteeMemberDetails": Billdetsarr
 };

 console.log(submitData);
 this._CommitteMeetingService.CommitteeMemberDetailInsert(submitData).subscribe(response => {
   if (response) {
     Swal.fire('Update CommitteeMember Save !', ' CommitteeMember Update Successfully !', 'success').then((result) => {
       if (result.isConfirmed) {
         this._matDialog.closeAll();
       }
     });
   } else {
     Swal.fire('Error !', 'CommitteeMember not Updated', 'error');
   }
 });
 }

}


deleteTableRow(element) {
  debugger;
  
  let index = this.chargeslist.indexOf(element);
  if (index >= 0) {
    this.chargeslist.splice(index, 1);
    this.dataSource.data = [];
    this.dataSource.data = this.chargeslist;
  }
  Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');
}


onSaveEntry(element) {
  this.dataSource.data = [];
  this.chargeslist.push(
    {
      MemberId: element.MemberId,
      MemberName: element.FirstName
    });
  this.isLoading = '';
  // console.log(this.chargeslist);
  this.dataSource.data = this.chargeslist;
  // console.log(this.dataSource.data);
}



dateTimeObj: any;
getDateTime(dateTimeObj) {
  // console.log('dateTimeObj==', dateTimeObj);
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

  CommitteeId:any;
  CommiteeName:any;
  IsActive:any;
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


      this.CommitteeId = MemberDetail.CommitteeId || 0;
      this.CommiteeName = MemberDetail.CommiteeName || '';
      this.IsActive = MemberDetail.IsActive || '';
   
    }
  }
}