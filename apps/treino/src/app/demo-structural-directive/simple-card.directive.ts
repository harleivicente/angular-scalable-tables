import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiSimpleCard]'
})
export class SimpleCardDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

