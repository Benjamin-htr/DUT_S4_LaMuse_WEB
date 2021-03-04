import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFolderSelected(event){
    if (event.target.files.length > 0){
        let files = event.target.files;
    }     
}

}
