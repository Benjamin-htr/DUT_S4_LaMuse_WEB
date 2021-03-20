import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetResultService {

  constructor(private http : HttpClient) { }

  urlSendResult : string = "http://127.0.0.1:5002/sendResult";

  getImage()
  {
    return this.http.get(this.urlSendResult);
  }
}
