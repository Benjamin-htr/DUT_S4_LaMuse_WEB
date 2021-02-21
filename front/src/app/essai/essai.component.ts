import { Component, OnInit } from '@angular/core';
import { EssaiService } from '../services/essai.service';
import { Weather } from './Weather';

@Component({
  selector: 'app-essai',
  templateUrl: './essai.component.html',
  styleUrls: ['./essai.component.css']
})
export class EssaiComponent implements OnInit {
  title = 'AngularFlask';

  constructor(private rs : EssaiService){}

  headers = ["day","temperature", "windspeed",  "event"]

  weather : Weather[] = [];

  ngOnInit()
  {
      this.rs.readWeather()
      .subscribe
        (
          (response) => 
          {
            this.weather = response[0]["data"];
          },
          (error) =>
          {
            console.log("No Data Found" + error);
          }

        )
  }

  // readData()
  // {
  //   this.rs.readFile()
  //   .subscribe
  //       (
  //         (response) => 
  //         {
  //           this.weather = response[0]["data"];
  //         },
  //         (error) =>
  //         {
  //           console.log("File doesn't exist..." + error);
  //         }

  //       )
  // }

}