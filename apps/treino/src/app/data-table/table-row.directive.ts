import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTableRow]'
})
export class TableRowDirective {

  constructor(public templateRef: TemplateRef<any>) {}

}
