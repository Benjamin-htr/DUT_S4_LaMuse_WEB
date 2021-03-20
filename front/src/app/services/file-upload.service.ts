import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uri = 'http://127.0.0.1:5002';
  
  constructor(private http: HttpClient) { }

  uploadFile(file:File){

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.uri}/uploadFile`,formData,{
      reportProgress : true,
      observe: 'events'
    })
  }
}