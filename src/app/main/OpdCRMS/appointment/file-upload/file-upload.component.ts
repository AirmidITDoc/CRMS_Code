import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl:'./file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  ngOnInit(): void {}
 
  constructor(private _service: FileUploadService,
    private http: HttpClient) { }

  // upload(event: any) {
  //     let files = event.target.files;
  //     let fData: FormData = new FormData;

  //     for (var i = 0; i < files.length; i++) {
  //         fData.append("file[]", files[i]);
  //     }
  //     var _data = {
  //         filename: 'Sample File',
  //         id: '0001'
  //     }

  //     fData.append("data", JSON.stringify(_data));

  //     this._service.uploadFile(fData).subscribe(
  //         response => this.handleResponse(response),
  //         error => this.handleError(error)
  //     )
  // }
  // handleResponse(response: any) {
  //     console.log(response);
  // }
  // handleError(error: string) {
  //     console.log(error);
  // }


  // new


  
//  file: File = null;
 
//  onFilechange(event: any) {
//    console.log(event.target.files[0])
//    this.file = event.target.files[0]
//  }
 
//  upload() {
//    if (this.file) {
//      this._service.uploadfile(this.file).subscribe(resp => {
//        alert("Uploaded")
//      })
//    } else {
//      alert("Please select a file first")
//    }
//  }


//sec

myFiles:string [] = [];
   
myForm = new FormGroup({
 name: new FormControl('', [Validators.required, Validators.minLength(3)]),
 file: new FormControl('', [Validators.required])
});
  
    
get f(){
 return this.myForm.controls;
}
   
onFileChange(event) {
 
     for (var i = 0; i < event.target.files.length; i++) { 
         this.myFiles.push(event.target.files[i]);
     }
}
    
submit(){
 const formData = new FormData();

 for (var i = 0; i < this.myFiles.length; i++) { 
   formData.append("file[]", this.myFiles[i]);
 }

 this.http.post('http://localhost:8001/upload.php', formData)
   .subscribe(res => {
     console.log(res);
     alert('Uploaded Successfully.');
   })
}

onClose(){
  
}
}