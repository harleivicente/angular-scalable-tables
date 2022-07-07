import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

export enum CellAction {
  ALARM = 'ALARM',
  TRASH = 'TRASH',
  ARROW_CLOCKWISE = 'ARROW_CLOCKWISE',
  EYE = 'EYE'
}

const iconClassMap = {
  ALARM: 'bi-eye',
  TRASH: 'bi-alarm',
  ARROW_CLOCKWISE: 'bi-arrow-clockwise',
  EYE: 'bi-eye',
};

@Directive({
  selector: '[uiCellAction]'
})
export class CellActionDirective implements OnInit {
  @Input() uiCellAction: CellAction;

  private css = `
    cursor: pointer;
    color: #5d5df4;
    padding: 0px 3px;
    font-size: 16px;
  `;

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef) {
  }
  
  ngOnInit() {
    const additionalClass = iconClassMap[this.uiCellAction];
    const element: HTMLElement = this.hostElement.nativeElement;
    
    if (additionalClass) {
      this.renderer.addClass(element, 'bi');
      this.renderer.addClass(element, additionalClass);
    }

    element.setAttribute("style", this.css);
  }

}
