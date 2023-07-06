import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { AdvanceDataStored } from '../../advance';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { UploadDocumentService } from './upload-document.service';

export interface Fileload {
  Rollname: String;
  Filetype: any;
  Filename: string;
  Progress: string;
  
  isLocallyAdded: boolean;
}

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  fileToUpload: File | null;
  files: File[] = [];
  constructor(private fileUploadService: UploadDocumentService) {

   }

  ngOnInit(): void {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  uploadFileToActivity() {
    // this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    //   // do something, if upload success
    //   }, error => {
    //     console.log(error);
    //   });
  }

  }
