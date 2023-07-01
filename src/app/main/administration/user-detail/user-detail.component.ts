import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
  ) { }

  ngOnInit(): void {
  }

  Save(){}


  onClose() {
    // this._opappointmentService.mySaveForm.reset();
     this.dialogRef.close();
  }
}
