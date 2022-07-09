import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: `
    p[uiStyledText],
    h1[uiStyledText],
    h2[uiStyledText]
  `
})
export class StyledTextDirective implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const css = `
      font-style: italic;
      color: royalblue;
      cursor: pointer;
    `;
    this.elementRef.nativeElement.setAttribute("style", css);
  }

}
