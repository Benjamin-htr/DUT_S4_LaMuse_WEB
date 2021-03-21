import { Component, OnInit, OnDestroy } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-la-muse-exec-custom',
  templateUrl: './la-muse-exec-custom.component.html',
  styleUrls: ['./la-muse-exec-custom.component.css']
})
export class LaMuseExecCustomComponent implements OnInit {

    back_src: string = 'http://127.0.0.1:5002/sendBackImg/';
    paint_src : string = 'http://127.0.0.1:5002/sendPaintImg/';
    result_src : string = 'http://127.0.0.1:5002/sendResult/';
    display : boolean = false;

    imageToShow: any;
    isImageLoading: boolean;

    txt1 : string = "The image is being created  ...";

    constructor(private rs : LaMuseCallService, private imageService: ImageService) { }

    ngOnInit(): void {
        this.getImageFromService(this.back_src)
        this.getImageFromService(this.paint_src)  
        
        this.rs.executeLaMuse('Custom').subscribe
        (
          (	response) => 
          	{
              console.log(response);
              this.getImageFromService(this.result_src)
              this.display = true;
              this.txt1 = "Image is now created !"  
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
