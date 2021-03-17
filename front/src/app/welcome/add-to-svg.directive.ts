import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[add]'
})
export class AddToSvgDirective {
    filters : Array<String>;


    constructor(private renderer: Renderer2, 
      private elmRef: ElementRef) { this.filters = ['light-blue', 'light-blue-blur', 'red', 'red-blur', 'orange', 'orange-blur', 'blue', 'blue-blur']}

      ngOnInit() {
        this.generateNodes(45);
    }

    createNode(color, cx, cy, r): void {
        let newCircle = this.renderer.createElement('circle', 'http://www.w3.org/2000/svg');
        this.renderer.addClass(newCircle, 'node');
        this.renderer.addClass(newCircle, color);
        this.renderer.setAttribute(newCircle, 'cx', cx);
        this.renderer.setAttribute(newCircle, 'cy', cy);
        this.renderer.setAttribute(newCircle, 'r', r);
        this.renderer.setAttribute(newCircle, 'node', '');

        this.renderer.appendChild(this.elmRef.nativeElement, newCircle);
    }

    getRandomPosition() : Array<number> {
      var x = window.innerHeight;
      var y = window.innerWidth;
      var randomX = Math.floor(Math.random()*x);
      var randomY = Math.floor(Math.random()*y);
      return [randomX,randomY];
    }
    
    generateNodes(nbNodes) : void {
      let height = window.innerHeight;
      var width = window.innerWidth;
    

      let area = height*width;
      
      for (let i = 0; i < nbNodes; i++)
      {
        let minR = (area/nbNodes)/1300;
        let maxR = (area/nbNodes)/550;
        let r = Math.random() * (maxR - minR) + minR;

        let coord = this.getRandomPosition();
        
        let color = this.filters[Math.floor(Math.random() * this.filters.length)]+'';

        this.createNode(color, coord[1], coord[0], r);
      }

      console.log(height, width);
    }

}
