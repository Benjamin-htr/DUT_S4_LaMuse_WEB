import { Component, OnInit, OnDestroy } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-la-muse-exec-custom',
  templateUrl: './la-muse-exec-custom.component.html',
  styleUrls: ['./la-muse-exec-custom.component.css']
})
export class LaMuseExecCustomComponent implements OnInit {

    back_src: string;
    paint_src : string;
    result_src : string;
    display : boolean = false;

    constructor(private rs : LaMuseCallService, private http: HttpClient) { }

    ngOnInit(): void {
        this.back_src = 'http://127.0.0.1:5002/sendBackImg/'
        this.paint_src = 'http://127.0.0.1:5002/sendPaintImg/'

        if (!localStorage.getItem('foo')) { 
          localStorage.setItem('foo', 'no reload') 
          document.location.reload();
          console.log('refresh')
        } 
        

        /* this.rs.executeLaMuse('Custom').subscribe
        (
          (	response) => 
          	{
              console.log(response);
              this.result_src = 'http://127.0.0.1:5002/sendResult/'
              this.display = true;
              localStorage.removeItem('foo') 
          	},
          	(error) =>
          	{
              console.log("No Data Found" + error);
              localStorage.removeItem('foo') 
          	}
        )  */
      }

      ngOnDestroy(): void {
          localStorage.removeItem('foo')
          console.log('destruct')
      }
    

        
    

}
