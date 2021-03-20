import { Component, OnInit, ViewEncapsulation, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent implements OnInit {
    filters : Array<String>;
  

    constructor() { 
        this.filters = ['light-blue', 'light-blue-blur', 'red', 'red-blur', 'orange', 'orange-blur', 'blue', 'blue-blur']


    }

    ngOnInit(): void {
      
    }

    changeColor() {
      let nodes = document.querySelectorAll('circle');
      nodes.forEach(node => {
      let color = this.filters[Math.floor(Math.random() * this.filters.length)]+'';
      node.removeAttribute('class');
      node.classList.add('node');
      node.classList.add(color);  
    });

  }

    

}
