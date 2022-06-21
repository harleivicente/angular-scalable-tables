import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiSquare]'
})
export class SquareDirective {
  @Input() uiSquare: string;
  @Input() uiSquareInvisible = false;

  constructor(
    private templateRef: TemplateRef<any>
  ) {}

  get template() {
    return this.templateRef;
  }

}
