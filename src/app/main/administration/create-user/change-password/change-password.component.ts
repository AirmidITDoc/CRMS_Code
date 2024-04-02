import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdministrationService } from '../../administration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AdvanceDataStored } from 'app/main/OpdCRMS/advance';
import { UserList } from '../create-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  selectedAdvanceObj: UserList;
  hasSelectedContacts: boolean;
  fname: String;
  lname: String;
  Uname: String;
  changePasswordFormGroup: FormGroup;

  
  hide = true;


  
  constructor(private _fuseSidebarService: FuseSidebarService,
    private accountService: AuthenticationService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    public dialog: MatDialog,
    public _AdministrationService: AdministrationService,
    private advanceDataStored: AdvanceDataStored,
    public _matDialog: MatDialog,
    private formBuilder: FormBuilder,) {
    dialogRef.disableClose = true;
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
    let UpdateUserPassword = "update LoginManager set Password ='" + pass + "' where UserId=" + id 
    this._AdministrationService.getpasswwordupdate(UpdateUserPassword).subscribe(data => {
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
}


