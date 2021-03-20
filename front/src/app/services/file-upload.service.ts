import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uri = 'http://127.0.0.1:5002';
  
  constructor(private http: HttpClient) { }

  uploadBack(file:File){
    console.log('service upload Back')
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.uri}/uploadBack`,formData,{
      observe: 'events'
    })
  }

  uploadPaint(file:File){
    console.log('service upload Paint')
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.uri}/uploadPaint`,formData,{
      reportProgress : true,
      observe: 'events'
    })
  }

}