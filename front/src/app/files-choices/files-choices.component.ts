import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-choices',
  templateUrl: './files-choices.component.html',
  styleUrls: ['./files-choices.component.css']
})
export class FilesChoicesComponent implements OnInit {

  title : string = 'Generate Images';
  fileUploadService : any ;

  constructor() { }

  ngOnInit(): void {
  }

  onFolderSelected(event){
    if (event.target.files.length > 0){
        let files = event.target.files;
        console.log(files);
    }     
}

fileToUpload: File = null;
handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}

}
