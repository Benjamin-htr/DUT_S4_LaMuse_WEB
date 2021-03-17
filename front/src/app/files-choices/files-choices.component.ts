import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-choices',
  templateUrl: './files-choices.component.html',
  styleUrls: ['./files-choices.component.css']
  
})
export class FilesChoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFolderSelected(event){
    if (event.target.files.length > 0){
        let files = event.target.files;
        console.log(files);
    }     
}

}
