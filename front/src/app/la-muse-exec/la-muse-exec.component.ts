import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';
import { GetResultService } from '../services/get-result.service';

@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {

  source: string = "../../assets/giphy.gif";
  constructor(private rs : LaMuseCallService, private resultService : GetResultService){}

  ngOnInit(): void {
    /*this.rs.executeLaMuse(Default)
      .subscribe
        (
          (	response) => 
          	{
            	console.log(response);
          	},
          	(error) =>
          	{
            	console.log("No Data Found" + error);
          	}
        )*/
        this.resultService.getImage().subscribe((response) => 
        {
          console.log(response);
        },
        (error) =>
        {
          console.log("No Data Found" + error);
        })
	}

	changeSourceToResult() :void {
		this.source = "../../../../back/Demo-test/Interpretations/";
	}
}




