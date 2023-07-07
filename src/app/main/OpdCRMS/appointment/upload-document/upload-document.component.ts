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

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UploadDocumentService } from './upload-document.service';
import { finalize } from 'rxjs/operators';

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
 
  @Input()
  requiredFileType:string;

  fileName = '';
  FilePath ='';
  uploadProgress:number;
  uploadSub: Subscription;

    constructor(private http: HttpClient,
      public dialogRef: MatDialogRef<UploadDocumentComponent>,) {}

    ngOnInit(): void {}

    
    onFileSelected(event) {

      console.log(event);
        const file:File = event.target.files[0];
      
        if (file) {
            this.fileName = file.name;
            // this.FilePath=file.path;
            const formData = new FormData();
            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                finalize(() => this.reset())
            );
          
            this.uploadSub = upload$.subscribe(event => {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              }
            })
        }
    }

    onClose() {
      this.dialogRef.close();
    }
  

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}