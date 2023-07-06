import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})


export class UploadDocumentService {
  constructor(private webReqService:WebRequestService) { }
  // file to upload should be passed


  // postFile(fileToUpload: File): Observable<boolean> {
     // we want to send a post web request to upload the file

    // const endpoint = '/upload-txt';
    // const formData: FormData = new FormData();
    // formData.append('fileKey', fileToUpload, fileToUpload.name);
    // this.webReqService.post(endpoint, formData, { headers: yourHeadersConfig })
    //   .map(() => { return true; })
    //   .catch((e) => this.handleError(e));
// }


  ReadTable(){
    this.webReqService.get('/read-table-csv')
  }
}