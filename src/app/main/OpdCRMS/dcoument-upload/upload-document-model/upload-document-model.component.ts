import { Component, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadDocumentFetchComponent } from '../upload-document-fetch/upload-document-fetch.component';

@Component({
  selector: 'app-upload-document-model',
  templateUrl: './upload-document-model.component.html',
  styleUrls: ['./upload-document-model.component.scss']
})
export class UploadDocumentModelComponent implements OnInit {

 
  @ViewChildren('childUpload') childUpload: UploadDocumentFetchComponent;
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter();

  constructor(private modalRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    // debugger;
  }
  
  fileUploadFormGroup: FormGroup = new FormGroup({
    uploadFormID: new FormControl('')
  });

  afterUploadFile(f: File[]){
    // debugger;
  }

  fetchFilesFromComponent(files){
    console.log(files);
    this.modalRef.close();
  }
}
