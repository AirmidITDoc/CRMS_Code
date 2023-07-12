import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DcoumentUploadService } from '../dcoument-upload.service';

@Component({
  selector: 'app-upload-document-fetch',
  templateUrl: './upload-document-fetch.component.html',
  styleUrls: ['./upload-document-fetch.component.scss']
})
export class UploadDocumentFetchComponent implements OnInit {

 
  
  @Input() parentForm: FormGroup;
  fileUploadId: any;
  
  @Output() afterSelectionMethod: EventEmitter<any[]> = new EventEmitter();


  constructor(private _snackBar: MatSnackBar,
    public _opappointmentService: DcoumentUploadService, 
     private modalRef: MatDialogRef<any>) { }

  

  ngOnInit(): void {
    // debugger;
    this.fileUploadId = Object.keys(this.parentForm.controls)[0];
    this.parentForm.addControl(this.fileUploadId, new FormControl(''));
    console.log(this.fileUploadId);
  }

  onFilesChange(f){
    // debugger;
    this._snackBar.open(f.length + " File(s) selected!", null, {
        duration: 2000,
      });
      
    this._opappointmentService.afterMethodFileSelect.next(f);
    this.modalRef.close();
  }

  check(){
    return this.parentForm.get("uploadFormId").value;
  }

}
