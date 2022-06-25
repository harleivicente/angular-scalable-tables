import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTableHeaderCell]'
})
export class TableHeaderCellDirective {

  constructor(public template: TemplateRef<any>) {}

}
