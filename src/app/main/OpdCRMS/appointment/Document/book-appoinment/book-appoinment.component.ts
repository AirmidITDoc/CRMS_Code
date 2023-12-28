import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-book-appoinment',
  templateUrl: './book-appoinment.component.html',
  styleUrls: ['./book-appoinment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BookAppoinmentComponent implements OnInit {

  BookAppointmentFrom: FormGroup;
  screenFromString = 'admission-form';
  
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookAppoinmentComponent>,
    public _matDialog: MatDialog,) { }
 

  ngOnInit(): void {
    this.BookAppointmentFrom = this.createBookAppoinmentForm();
  }
  GenderList = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },

  ];
  
  createBookAppoinmentForm(){
    return this._formBuilder.group({
      Prefix:'',
      FirstName:'',
      MiddleName:'',
      LastName:'',
      ContactNo:['', Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$')],
      Age:'',
      Gender:'',
      Email:['',
      Validators.required,
      Validators.email],
      RefferedDR:''
    });
  }
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }
  onClose() {
    this.dialogRef.close();
  }
}
