import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';


@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {

  display : boolean = false;
  result_src : string = 'http://127.0.0.1:5002/sendResult/';

  constructor(private rs : LaMuseCallService){}

  ngOnInit(): void {
    this.rs.executeLaMuse('Default')
      .subscribe
        (
          (	response) => 
          	{
              console.log(response);
              this.display = true;
          	},
          	(error) =>
          	{
            	console.log("No Data Found" + error);
          	}
        )
        
  
	}

}




