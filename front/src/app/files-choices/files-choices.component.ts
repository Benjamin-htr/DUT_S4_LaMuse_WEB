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
  file : File;
  progress: number = 0;
  @ViewChild('myInput',{static: true}) myInputVariable: ElementRef;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
      
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile(){
    this.fileUploadService.uploadFile(this.file)
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
    if(this.file && this.file != null )
    {
      result = true;
    }
    return result;
  }

  resetFile()
  {
    this.myInputVariable.nativeElement.value = "";
    this.file = null;
    //this.progress = 0;
  }
}
