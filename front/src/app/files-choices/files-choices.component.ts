import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-files-choices',
  templateUrl: './files-choices.component.html',
  styleUrls: ['./files-choices.component.css']
  
})
export class FilesChoicesComponent implements OnInit {

  title : string = 'Generate Images';
  Backfile : File;
  Paintfile : File;
  progress: number = 0;
  @ViewChild('myInput1',{static: true}) myInputVariable1: ElementRef;
  @ViewChild('myInput2',{static: true}) myInputVariable2: ElementRef;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
      
  }

  onBackChange(event) {
    if (event.target.files.length > 0) {
      this.Backfile = event.target.files[0];

    }
  }

  onPaintChange(event) {
    if (event.target.files.length > 0) {
      this.Paintfile = event.target.files[0];
    }
  }

  uploadFile(){
    console.log(this.Backfile)
    console.log(this.Paintfile)
    this.fileUploadService.uploadBack(this.Backfile)
    .subscribe((event: HttpEvent<any>) => {
        switch(event.type){
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(this.progress);
              
              break;
            case HttpEventType.ResponseHeader:
              if(event.status == 200){
                console.log("File was uploaded successfully");   
                 
              }
              if(event.status == 500){
                console.log("Error while uploading file");
              }
        }
    });
    this.fileUploadService.uploadPaint(this.Paintfile)
    .subscribe((event: HttpEvent<any>) => {
        this.resetFile(); 
        switch(event.type){
          
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(this.progress);
              
              break;
            case HttpEventType.ResponseHeader:
              if(event.status == 200){
                console.log("File was uploaded successfully");  
                
                 
              }
              if(event.status == 500){
                console.log("Error while uploading file");
              }
        }
    });


  }

  fileIsUploaded()
  {
    let result = false;
    if(this.Backfile && this.Backfile != null && this.Paintfile && this.Paintfile != null)
    {
      result = true;
    }
    return result;
  }

  resetFile()
  {
    this.myInputVariable1.nativeElement.value = "";
    this.myInputVariable2.nativeElement.value = "";
    this.Backfile = null;
    this.Paintfile = null;
    //this.progress = 0;
  }
}
