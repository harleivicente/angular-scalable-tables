import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTableCell]'
})
export class TableCellDirective {

  constructor(public template: TemplateRef<any>) { }

}
