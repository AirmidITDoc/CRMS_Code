import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DcoumentUploadService, FileQueueObject } from './dcoument-upload.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvanceDataStored } from '../advance';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadDocumentModelComponent } from './upload-document-model/upload-document-model.component';

export interface Fileload {
  Rollname: String;
  Filetype: any;
  Filename: string;
  Progress: string [];
  
  isLocallyAdded: boolean;
}

@Component({
  selector: 'app-dcoument-upload',
  templateUrl: './dcoument-upload.component.html',
  styleUrls: ['./dcoument-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // animations: fuseAnimations,

  animations: [
    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("0.5s 300ms ease-out")
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(100%)" }))
      ])
    ])
  ]
})


export class DcoumentUploadComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() placeHolderText: string;
  @Input() showImage: boolean = false;

 
  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  Progress:any;
  ImagePath: string;
  FileName:any;
  Filetype:any;
  FileSize:any;
  isSearchInProgress :any;
  sIsLoading: string = '';
  
  fileselect :boolean= false;
  public itemIDSpesification;
  public itemDefSpesification;
  
  public files: File[] = [];
  
  public filename:File[] = [];
  // selectedAdvanceObj: AdvanceDetailObj;
  screenFromString = 'app-op-refund-bill';
  dateTimeObj: any;

  name = 'Angular';

  // showImage = true;

  constructor(public _opappointmentService: DcoumentUploadService,
    private _ActRoute: Router,public uploader: DcoumentUploadService,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,
    public datePipe: DatePipe,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DcoumentUploadComponent>,
    private _snackBar: MatSnackBar,
    private http:HttpClient,
    public fb: FormBuilder,
    ) {
      _opappointmentService.afterMethodFileSelect.subscribe(b => {
        for (var i = 0; i < b.length; i++) {
          this.files.push(b[i]);
        }
      });
     }


  private _queue: BehaviorSubject<any[]>;
  ngOnInit(): void {
    
    // if (this.advanceDataStored.storage) {
    //   this.selectedAdvanceObj = this.advanceDataStored.storage;

    // }
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
    // this.itemIDSpesification = Object.keys(this.parentForm.controls)[1];
    // this.itemDefSpesification = Object.keys(this.parentForm.controls)[2];
  }

  onFileChange(pFileList: File[]){
    console.log(pFileList)
    this.uploader.addToQueue(pFileList);
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    console.log(this.fileInput.nativeElement.files.length)
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }

uploadAll(){

}

  upload(i){
console.log(i);
    debugger;
    // this.selectedfile=<File>i.target.files[0];

    // alert("Selected File is :" + this.selectedfile.name +'\n' + 'Type :' + this.selectedfile.type + '\n' +'Size:' +this.selectedfile.size )

    // this.fileselect=true;

  this.isSearchInProgress=true;
  this.sIsLoading = 'loading-data';

    const fd=new FormData();
  fd.append('image',i,i.name);
  this.FileName=i.name;
  this.Filetype=i.type;
  this.FileSize=i.size;
   
  this.http.post('',fd,{
    reportProgress:true,
    observe:'events'
  }).subscribe(event =>{
    if(event.type== HttpEventType.UploadProgress){
    //  debugger;
      this.Progress= ( Math.round(event.loaded / event.total * 100)  +'%');
     // console.log('Loaded Progress :' + Math.round(event.loaded / event.total * 100)  +'%' )
     
      if(this.Progress==100 + '%'){
        this.filename.push(i);
        // console.log(this.filename);
        this.fileselect=false;
      }else{
              
        this.fileselect=true;
      }
    }else if (event.type == HttpEventType.Response){
    // console.log(event)
    }
  });
  this.sIsLoading ='';

  // this.files =[];

    // }
    this.itemIDSpesification = Object.keys(this.parentForm.controls)[1];
    this.itemDefSpesification = Object.keys(this.parentForm.controls)[2];
  }
  uploadFile(file) {
    console.log(file);
    this._snackBar.open("Upload function was triggered! - " + file.name, null, {
      duration: 2000
    });
  }

  deleteFile(index) {
    this.files.splice(index, 1);

    this.FileName="";
    this.FileSize ="";
    this._snackBar.open("File was deleted!", null, {
      duration: 2000
    });
   
  }
  
  selectedfile: File =null;
  onFileSelected(event){
    
    debugger;
    this.selectedfile=<File>event.target.files[0];
    // this.filename.push(this.selectedfile.name);

    // Swal.fire({
    //   icon: 'error',
    //   title: 'File Details...',
    //   text: 'Selected!' + this.selectedfile.name +
    //   'Type' + this.selectedfile.type +
    //   'Size' + this.selectedfile.size
    //   // footer: '<a href="">Why do I have this issue?</a>'
    // })

    
    alert("Selected File is :" + this.selectedfile.name +'\n' + 'Type :' + this.selectedfile.type + '\n' +'Size:' +this.selectedfile.size )

    this.fileselect=true;
  }


  changeFile(event) {
    debugger;

    this.selectedfile=<File>event.target.files[0];

    alert("Selected File is :" + this.selectedfile.name +'\n' + 'Type :' + this.selectedfile.type + '\n' +'Size:' +this.selectedfile.size )

    this.fileselect=true;
  
    this._snackBar.open("File was deleted!", null, {
      duration: 2000
    });
  }


 
  openModal(e: Event) {
    const dialogRef = this._matDialog.open(UploadDocumentModelComponent, {
      panelClass: "modal-md",
      height: "400px",
      width: "50%"
    });
  }
  
  onSave()
  {

  }
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }

  onClose() {
      this._matDialog.closeAll();
  }
}
