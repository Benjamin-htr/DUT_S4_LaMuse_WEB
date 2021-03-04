import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';

@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {
  title = 'Generate Images';

  constructor(private rs : LaMuseCallService){}

  

  ngOnInit(): void {
    this.rs.readWeather()
      .subscribe
        (
          (response) => 
          {
            response[0]["data"];
          },
          (error) =>
          {
            console.log("No Data Found" + error);
          }

        )
  }

}
