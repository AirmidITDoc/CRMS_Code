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

  constructor(public _CommitteMeetingService: CommitteMeetingService,

    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCommitteeMeetingComponent>) { }

  personalFormGroup: FormGroup;
  registerObj = new MemberDetail({});

  displayedColumns = [
    // 'MemberId',
    'MemberName',
    'StudyAmount',
    'MeetingStatus',
    'action'
  ];
  dscommitteeMemberList = new MatTableDataSource<CommitteeMeetingMemberList>();

  chargeslist: any = [];
  isLoading: any;
  MemberId: any;
  MemberName: any;
  MembercmbList: any = [];


  public memberFilterCtrl: FormControl = new FormControl();
  public filteredMember: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
    this.getCommitteListCombobox();
  }

  createPesonalForm() {
    return this.formBuilder.group({
      CommitteeId: '',
      MemberId: '',
      MemberName: '',
      CommitteeMeetingName: '',
      CommitteeName: '',
      Location: '',
      Amount: ''

    });
  }

  //   private MemberDepartment() {
  //     // debugger;
  //     if (!this.MembercmbList) {
  //         return;
  //     }
  //     // get the search keyword
  //     let search = this.memberFilterCtrl.value;
  //     if (!search) {
  //         this.filteredMember.next(this.MembercmbList.slice());
  //         return;
  //     } else {
  //         search = search.toLowerCase();
  //     }
  //     // filter
  //     this.filteredMember.next(
  //         this.MembercmbList.filter(
  //             (bank) => bank.MemberName.toLowerCase().indexOf(search) > -1
  //         )
  //     );sssss
  // }
  getCommitteListCombobox() {
    this._CommitteMeetingService.getCommitteeMeetingList().subscribe((data) => {
      this.MembercmbList = data;
    });
  }
  OnSave() { }


  onAdd() {
    this.lngCommitteeId = this.personalFormGroup.get("CommitteeId").value.CommitteeId;
    console.log(this.lngCommitteeId);
    this.getCommitteeMemberList(this.lngCommitteeId)
  }

  getCommitteeMemberList(Params) {
    let m ={
      'CommitteeId': Params
    }
    this.sIsLoading = 'loading-data';
    setTimeout(() => {
      this.sIsLoading = 'loading-data';
      this._CommitteMeetingService.getCommitteeMemberList(m).subscribe(Visit => {
        this.dscommitteeMemberList.data = Visit as CommitteeMeetingMemberList[];
        // this.dscommitteeMemberList.sort = this.sort;
        // this.dscommitteeMemberList.paginator = this.paginator;
        this.sIsLoading = '';
      },
        error => {
          this.sIsLoading = '';
        });
    }, 1000);

  }

  onSaveEntry(e) {
    this.dscommitteeMemberList.data = [];
    this.chargeslist.push(
      {
        MemberId: e.MemberId,
        MemberName: e.MemberName
      });
    this.isLoading = '';
    console.log(this.chargeslist);
    this.dscommitteeMemberList.data = this.chargeslist;
    console.log(this.dscommitteeMemberList.data);

  }


  onSubmit() {

    this.isLoading = 'submit';


    let insertCommitteeMeeting = {};

    insertCommitteeMeeting['committeeMeetingId'] = 0;
    insertCommitteeMeeting['committeeMeetingDate'] = this.dateTimeObj.date;
    insertCommitteeMeeting['committeeMeetingTime'] = this.dateTimeObj.time;
    insertCommitteeMeeting['commiteeMeetingName'] = this.personalFormGroup.get('CommitteeMeetingName').value || '';
    insertCommitteeMeeting['committeeMeetingLocation'] = this.personalFormGroup.get('Location').value || '';
    insertCommitteeMeeting['committeeMeetingAmount'] = this.personalFormGroup.get('Amount').value || 0;

    let insertCommitteeMeetingMemberDetarry = [];
    this.dscommitteeMemberList.data.forEach((element) => {
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
    this._CommitteMeetingService.CommitteeDetailInsert(submitData).subscribe(response => {
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