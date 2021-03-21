import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {

  display : boolean = false;
  result_src : string = 'http://127.0.0.1:5002/sendResult/';

  imageToShow: any;
  isImageLoading: boolean;

  constructor(private rs : LaMuseCallService, private imageService: ImageService){}

  ngOnInit(): void {
    this.rs.executeLaMuse('Default')
      .subscribe
        (
          (response) => 
              {
              console.log(response);
              this.getImageFromService(this.result_src)
              this.display = true;
          	},
          	(error) =>
          	{
            	console.log("No Data Found" + error);
          	}
        )

  
  }
  
  createImageFromBlob(image: Blob) : void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
  
    if (image) {
       reader.readAsDataURL(image);
    }
   }
  
   getImageFromService(route : string) {
       this.isImageLoading = true;
       this.imageService.getImage(route).subscribe(data => {
         this.createImageFromBlob(data);
         this.isImageLoading = false;
       }, error => {
         this.isImageLoading = false;
         console.log(error);
       });
    }

}




