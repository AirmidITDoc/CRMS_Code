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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface Result {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-committee-meeting',
  templateUrl: './new-committee-meeting.component.html',
  styleUrls: ['./new-committee-meeting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCommitteeMeetingComponent implements OnInit {
  screenFromString = 'admission-form';
  lngCommitteeId: any;
  sIsLoading: string = '';
  NetAmount:any;
  
  results: Result[] = [
    { value: 'ONLINE', viewValue: 'ONLINE' },
    { value: 'OFFLINE', viewValue: 'OFFLINE' },
  ];


  constructor(public _CommitteMeetingService: CommitteMeetingService,

    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCommitteeMeetingComponent>) { }

    StudyAmount:any;
  registerObj = new MemberDetail({});

  displayedColumns = [
    // 'MemberId',
    'MemberName',
    'StudyAmount',
    'MeetingStatus',
    'action'
  ];

  dataSource = new MatTableDataSource<CommitteeMeetingMemberList>();

  chargeslist: any = [];
  isLoading: any;
  MemberId: any;
  MemberName: any;
  MembercmbList: any = [];


  public memberFilterCtrl: FormControl = new FormControl();
  public filteredMember: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();

  ngOnInit(): void {
   
    this.getCommitteListCombobox();
if(this._CommitteMeetingService.personalFormGroup.get('CommitteeMeetingId').value){
    let m ={
      'CommitteeId': 1
    }
   
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CommitteMeetingService.getCommitteeMemberList(m).subscribe(Visit => {
        this.dataSource.data = Visit as CommitteeMeetingMemberList[];

        this.chargeslist = Visit as CommitteeMeetingMemberList[];

        this.dataSource.data = this.chargeslist;

        this.dataSource.data['MeetingStatus']="Offline";
        // this.dscommitteeMemberList.paginator = this.paginator;
        this.sIsLoading = '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }
  }

  
 
  getCommitteListCombobox() {
    this._CommitteMeetingService.getCommitteeMeetingList().subscribe((data) => {
      this.MembercmbList = data;
    });
  }

  getNetAmtSum(element) {

    let netAmt;
    netAmt = element.reduce((sum, { StudyAmount }) => sum += +(StudyAmount || 0), 0);
    this.StudyAmount = netAmt;
    this.NetAmount = netAmt;
   
    return netAmt
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


  onAdd() {
    this.lngCommitteeId = this._CommitteMeetingService.personalFormGroup.get("CommitteeId").value.CommitteeId;
    console.log(this.lngCommitteeId);
    this.getCommitteeMemberList(this.lngCommitteeId)
  }

  getCommitteeMemberList(Params) {
    let m ={
      'CommitteeId': Params
    }
   
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CommitteMeetingService.getCommitteeMemberList(m).subscribe(Visit => {
        this.dataSource.data = Visit as CommitteeMeetingMemberList[];

        this.chargeslist = Visit as CommitteeMeetingMemberList[];

        this.dataSource.data = this.chargeslist;
        // this.dscommitteeMemberList.paginator = this.paginator;
        this.sIsLoading = '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }

  onSaveEntry(e) {
    this.dataSource.data = [];
    this.chargeslist.push(
      {
        MemberId: e.MemberId,
        MemberName: e.MemberName
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    
    this.dataSource.data = this.chargeslist;
    console.log(this.dataSource.data);

  }


  onSubmit() {

    this.isLoading = 'submit';
if(! this._CommitteMeetingService.personalFormGroup.get('CommitteeMeetingId').value){

    let insertCommitteeMeeting = {};

    insertCommitteeMeeting['committeeMeetingId'] = 0;
    insertCommitteeMeeting['committeeMeetingDate'] = this.dateTimeObj.date;
    insertCommitteeMeeting['committeeMeetingTime'] = this.dateTimeObj.time;
    insertCommitteeMeeting['commiteeMeetingName'] = this._CommitteMeetingService.personalFormGroup.get('CommitteeMeetingName').value || '';
    insertCommitteeMeeting['committeeMeetingLocation'] = this._CommitteMeetingService.personalFormGroup.get('Location').value || '';
    insertCommitteeMeeting['committeeMeetingAmount'] = this._CommitteMeetingService.personalFormGroup.get('NetAmount').value || 0;

    let insertCommitteeMeetingMemberDetarry = [];
    this.dataSource.data.forEach((element) => {
      let insertCommitteeMeetingMemberDet = {};
      insertCommitteeMeetingMemberDet['committeeMeetingId'] = 0;
      insertCommitteeMeetingMemberDet['memberId'] = element.MemberId;
      insertCommitteeMeetingMemberDet['studyId'] = 0,// element.studyId;
      insertCommitteeMeetingMemberDet['memberAmount'] = element.StudyAmount || 0;
      insertCommitteeMeetingMemberDet['memberMeetingStatus'] = element.MeetingStatus;
      insertCommitteeMeetingMemberDet['createdBy'] = this.accountService.currentUserValue.user.id;
      insertCommitteeMeetingMemberDetarry.push(insertCommitteeMeetingMemberDet);
    });

    let submitData = {
      "insertCommitteeMeeting": insertCommitteeMeeting,
      "insertCommitteeMeetingMemberDet": insertCommitteeMeetingMemberDetarry
    };
    console.log(submitData);
    this._CommitteMeetingService.CommitteeMeettingDetailInsert(submitData).subscribe(response => {
      if (response) {
        Swal.fire('New Committee Meeting Save !', ' New Committee Meeting Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Committee Meeting not saved', 'error');
      }
    });
  }else{
    let updateCommitteeMeeting = {};

    updateCommitteeMeeting['committeeMeetingId'] =this._CommitteMeetingService.personalFormGroup.get('CommitteeMeetingId').value || 0;
    updateCommitteeMeeting['committeeMeetingDate'] = this.dateTimeObj.date;
    updateCommitteeMeeting['committeeMeetingTime'] = this.dateTimeObj.time;
    updateCommitteeMeeting['commiteeMeetingName'] = this._CommitteMeetingService.personalFormGroup.get('CommitteeMeetingName').value || '';
    updateCommitteeMeeting['committeeMeetingLocation'] = this._CommitteMeetingService.personalFormGroup.get('Location').value || '';
    updateCommitteeMeeting['committeeMeetingAmount'] = this._CommitteMeetingService.personalFormGroup.get('NetAmount').value || 0;

    let insertCommitteeMeetingMemberDetarry = [];
    this.dataSource.data.forEach((element) => {
      let insertCommitteeMeetingMemberDet = {};
      insertCommitteeMeetingMemberDet['committeeMeetingId'] = 0;
      insertCommitteeMeetingMemberDet['memberId'] = element.MemberId;
      insertCommitteeMeetingMemberDet['studyId'] = 0,// element.studyId;
      insertCommitteeMeetingMemberDet['memberAmount'] = element.StudyAmount || 0;
      insertCommitteeMeetingMemberDet['memberMeetingStatus'] = element.MeetingStatus;
      insertCommitteeMeetingMemberDet['createdBy'] = this.accountService.currentUserValue.user.id;
      insertCommitteeMeetingMemberDetarry.push(insertCommitteeMeetingMemberDet);
    });

    let submitData = {
      "insertCommitteeMeeting": updateCommitteeMeeting,
      "insertCommitteeMeetingMemberDet": insertCommitteeMeetingMemberDetarry
    };
    console.log(submitData);
    this._CommitteMeetingService.CommitteeMeettingDetailUpdate(submitData).subscribe(response => {
      if (response) {
        Swal.fire('Updated Committee Meeting  !', ' Updated Committee Meeting  Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Committee Meeting not Updated', 'error');
      }
    });
  }

  }

  onClose() {
    this.dialogRef.close();
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }


  
  
}

export class CommitteeMeetingMemberList {
  MemberId: any;
  MemberName: any;
  StudyAmount: any;
  MeetingStatus: any;
  /**
  * Constructor
  *
  * @param CommitteeMeetingMemberList
  */
  constructor(CommitteeMeetingMemberList) {
    {
      this.MemberId = CommitteeMeetingMemberList.MemberId || '';
      this.MemberName = CommitteeMeetingMemberList.MemberName || '';
      this.StudyAmount = CommitteeMeetingMemberList.StudyAmount || '';
      this.MeetingStatus = CommitteeMeetingMemberList.MeetingStatus || '';
    }
  }
}


export class MemberDetail {
  MemberId: any;
  MemberName: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  Member_Address: any;
  CityId: any;
  PinCode: any;
  MobileNo: any;
  EmailId: any;
  StudyAmount: any;
  Location: any;
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