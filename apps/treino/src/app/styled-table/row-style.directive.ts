import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[ui-row-style]'
})
export class RowStyleDirective implements OnInit {
  private isDarker = false;
  private isHover = false;

  private buildLightCss = () => `
    background-color: ${this.isHover ? '#f0f0f0' : '#ffffff'}
  `;

  private buildDarkCss = () => `
    background-color: ${this.isHover ? '#f0f0f0' : '#f8f8f8'}
  `;


  @HostListener('mouseover')
  onMouseOver() {
    this.isHover = true;
    this.updateStyle();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.isHover = false;
    this.updateStyle();
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  setAsDarker() {
    this.isDarker = true;
    this.updateStyle();
  }

  private updateStyle() {
    const style = this.isDarker ? this.buildDarkCss() : this.buildLightCss();
    this.elementRef.nativeElement.setAttribute("style", style);
  }

}
