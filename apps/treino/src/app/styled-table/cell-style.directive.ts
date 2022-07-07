import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ui-cell-style]'
})
export class CellStyleDirective implements OnInit {

  private css = `
    padding: 10px;
  `;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute("style", this.css);
  }

}
