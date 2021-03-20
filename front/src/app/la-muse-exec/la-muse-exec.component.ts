import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';

@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {

  source: string = "../../assets/giphy.gif";
  constructor(private rs : LaMuseCallService){}

  ngOnInit(): void {
    setTimeout(() => 
    {this.changeSourceToResult()},
5000);
	}

	changeSourceToResult() :void {
		this.source = "http://127.0.0.1:5002/sendResult/";
	}
}




