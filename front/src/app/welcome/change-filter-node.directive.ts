import { Directive, Renderer2, ElementRef, HostListener, ViewChildren, QueryList } from '@angular/core';

@Directive({
  selector: '[add]'
})
export class ChangeFilterNodeDirective {
    filters : Array<String>;

  constructor(private renderer: Renderer2, 
    private elmRef: ElementRef) {
        this.filters = ['light-blue', 'light-blue-blur', 'red', 'red-blur', 'orange', 'orange-blur', 'blue', 'blue-blur']
      
     }

    @HostListener('click') onClick() {
        this.Click()
    }

   Click() {
      this.changeColor();
      
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
