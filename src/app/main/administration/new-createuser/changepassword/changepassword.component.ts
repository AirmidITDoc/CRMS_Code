import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AdvanceDataStored } from 'app/main/OpdCRMS/advance';
import { CreateUserService } from '../../create-user/create-user.service';
import { UserList } from '../new-createuser.component';
import Swal from 'sweetalert2';
import { CreateuserService } from '../createuser.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

 
 
  selectedAdvanceObj: UserList;
  hasSelectedContacts: boolean;
  fname: String;
  lname: String;
  Uname: String;
  changePasswordFormGroup: FormGroup;
  hide = true;
  UserId:any;
  passrule:boolean=false;
  
  constructor(private _fuseSidebarService: FuseSidebarService,
    private accountService: AuthenticationService,
    private dialogRef: MatDialogRef<ChangepasswordComponent>,
    public dialog: MatDialog,
    public _CreateUserService: CreateuserService,
    private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    private formBuilder: FormBuilder,) {
    dialogRef.disableClose = true;
    this.UserId= this.accountService.currentUserValue.user.id;
  }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.createchangePasswordForm();
    this.fname = this.accountService.currentUserValue.user.firstName;
    this.lname = this.accountService.currentUserValue.user.lastName;
    this.Uname = this.accountService.currentUserValue.user.userName;
  }
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
  onClose() {
    this.dialogRef.close();
  }

  onClear(){
    this.changePasswordFormGroup.get("password").reset();
  }

  passrulesdisp(){
    setTimeout(() => {
      this.passrule=true;
    }, 500);
    this.passrule=false;
  }
  changepassflag(){
    this.passrule=false;
  }
 
  createchangePasswordForm() {
    return this.formBuilder.group({
      fname: '',
      lname: '',
      Uname: '',
      password: '',
    });
  }

  changepassword() {
    let pass = this.changePasswordFormGroup.get('password').value;
    let id = this.accountService.currentUserValue.user.id;

    // let UpdateUserPassword = "update LoginManager set Password ='" + pass + "' where UserId=" + id 
    let changePasswordObj = {};
    changePasswordObj['userId'] =  this.UserId
    changePasswordObj['userName'] = this.Uname;
    changePasswordObj['password'] = this.changePasswordFormGroup.get('password').value || ''

      let submitData = {
        "changePassword": changePasswordObj,
      }
    
    this._CreateUserService.getpasswwordChange(submitData).subscribe(data => {
      if (data) {
        Swal.fire('Pasword Changed!', 'Record updated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Password not Updated', 'error');
      }
    },
      // (error) => {
      //   this.isLoading = 'list-loaded';
      // }
    );
  }

  screenFromString = 'OP-billing';
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }
}



