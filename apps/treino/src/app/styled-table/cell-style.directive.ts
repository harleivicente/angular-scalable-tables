import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ui-cell-style]'
})
export class CellStyleDirective implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.padding = "10px";
  }

}
