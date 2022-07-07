import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ui-header-cell-style]'
})
export class HeaderCellStyleDirective implements OnInit {

  private css = `
    border-bottom: 1px solid #808080;
    border-top: 1px solid grey;
    padding: 10px 10px;
  `;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute("style", this.css);
  }

}
