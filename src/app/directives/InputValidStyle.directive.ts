import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValid]'
})
export class InputInvalidStyleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', 'green');
  }
}
