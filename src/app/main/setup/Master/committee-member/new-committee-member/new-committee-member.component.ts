import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommitteeMemberService } from '../committee-member.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
import { CommitteeMemberDetail } from '../committee-member.component';

@Component({
  selector: 'app-new-committee-member',
  templateUrl: './new-committee-member.component.html',
  styleUrls: ['./new-committee-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCommitteeMemberComponent implements OnInit {

  registerObj = new CommitteeMemberDetail({});
  personalFormGroup: FormGroup;
  screenFromString = 'admission-form';
  paginator: any;
  sort: any;

  constructor(public _CommitteeMemberService: CommitteeMemberService,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialog: MatDialog,
    public dialogRef: MatDialogRef<NewCommitteeMemberComponent>) { }
  displayedColumns = [
    // 'MemberId',
    'MemberName',
    'action'
  ];

  dataSource = new MatTableDataSource<CommitteeMemberDetail>();
  chargeslist: any = [];
  isLoading: any;
  MemberId: any;
  MemberName: any;
  MembercmbList: any = [];
  CommiteeName: any;

  public memberFilterCtrl: FormControl = new FormControl();
  public filteredMember: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();


  DeptSource = new MatTableDataSource<CommitteeMemberDetail>();

  ngOnInit(): void {
    debugger;

    if (this.data) {
      console.log(this.data);
      this.CommiteeName = this.data.registerObj.CommiteeName;
      var m = {
        CommitteeId:this.data.registerObj.CommitteeId
      };

      this._CommitteeMemberService.getCommitteeMemberMeetingList(m).subscribe(Visit => {
        this.dataSource.data = Visit as CommitteeMemberDetail[];
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.isLoading = '';
      },
        error => {
          this.isLoading = '';
        });
    }

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
    var m = {
      FirstName: '%',
      LastName: '%'
    };
    this._CommitteeMemberService.getMemberMasterList(m).subscribe((data) => {
      this.MembercmbList = data;
      this.filteredMember.next(this.MembercmbList.slice());
    });
  }


  onSubmit() {

    if (!this._CommitteeMemberService.personalFormGroup.get('CommitteeId').value) {
      this.isLoading = 'submit';
      let committeeInsertObj = {};
      committeeInsertObj['committeeId'] = 0,//this.personalFormGroup.get('CommitteeId').value.CommitteeId || 0,
        committeeInsertObj['commiteeName'] = this._CommitteeMemberService.personalFormGroup.get('CommitteeName').value || 0,
        committeeInsertObj['createdBy'] = this.accountService.currentUserValue.user.id

      let MemberDetailarr = [];
      this.dataSource.data.forEach((element) => {
        let MemberDetailObj = {};
        MemberDetailObj['committeeId'] = 0;
        MemberDetailObj['memberId'] = element.MemberId;
        MemberDetailObj['createdBy'] = this.accountService.currentUserValue.user.id;
        MemberDetailarr.push(MemberDetailObj);
      });

      let submitData = {
        "insertCommitteeMaster": committeeInsertObj,
        "insertCommitteeMemberDetails": MemberDetailarr
      };

      console.log(submitData);
      this._CommitteeMemberService.CommitteeMemberDetailInsert(submitData).subscribe(response => {
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
    } else {


      this.isLoading = 'submit';
      let committeeInsertObj = {};
      committeeInsertObj['committeeId'] = this._CommitteeMemberService.personalFormGroup.get('CommitteeId').value || 0,
        committeeInsertObj['commiteeName'] = this._CommitteeMemberService.personalFormGroup.get('CommitteeName').value || 0,
        committeeInsertObj['createdBy'] = this.accountService.currentUserValue.user.id

      let MemberDetailarr = [];
      this.dataSource.data.forEach((element) => {
        let MemberDetailObj = {};
        MemberDetailObj['committeeId'] = 0;
        MemberDetailObj['memberId'] = element.MemberId;
        MemberDetailObj['createdBy'] = this.accountService.currentUserValue.user.id;
        MemberDetailarr.push(MemberDetailObj);
      });

      let submitData = {
        "insertCommitteeMaster": committeeInsertObj,
        "insertCommitteeMemberDetails": MemberDetailarr
      };

      console.log(submitData);
      this._CommitteeMemberService.CommitteeMemberDetailInsert(submitData).subscribe(response => {
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

  OnSave() {

  }

  onClose() {
    this.dialogRef.close();
  }
}



