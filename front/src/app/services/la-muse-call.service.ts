import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaMuseCallService implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(){
  }

  LaMuseUrl : string = "http://127.0.0.1:5002/LaMuse/";
  
  readWeather()
  {
    return this.http.get(this.LaMuseUrl);
  }

}
