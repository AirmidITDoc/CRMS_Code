import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ImageUploadComponent implements OnInit {

  imageSrc: string;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
 fileSource: new FormControl('', [Validators.required])
  });
   
  constructor(private http: HttpClient,
    public  dialogRef :MatDialogRef<ImageUploadComponent>,
    ) { }
     
  ngOnInit(): void {}
  get f(){
    return this.myForm.controls;
  }
    
  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.myForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }

  
  onClose() {
    this.dialogRef.close();
  }
    
  submit(){
    console.log(this.myForm.value);
    this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}