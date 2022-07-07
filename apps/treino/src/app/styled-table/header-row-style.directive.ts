import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ui-header-row-style]'
})
export class HeaderRowStyleDirective implements OnInit {

  private css = ``;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute("style", this.css);
  }

}
