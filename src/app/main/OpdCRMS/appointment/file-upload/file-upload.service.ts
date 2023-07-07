import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  _url: string;
    constructor(private http: HttpClient) { }

    // uploadFile(data: any): Observable<{}> {
    //     this._url = 'http://localhost:4200/XXXXXXXXXX/uploadFile';
    //     return this.http.post(this._url, data)
    //         .map(this.handleData)
    //         .catch(this.handleError);
    // }

    // private handleData(res: Response) {
    //     let data = res.json();
    //     return data;
    // }
    // private handleError(error: Response | any) {
    //     return Observable.throw('API failed');
    // }

    // new?
    public uploadfile(file: File) {
      let formParams = new FormData();
      formParams.append('file', file)
      return this.http.post('http://localhost:3000/uploadFile', formParams)
    }
   }
