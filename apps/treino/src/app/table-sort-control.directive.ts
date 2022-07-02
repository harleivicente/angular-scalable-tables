import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTableSortControl]'
})
export class TableSortControlDirective {

  constructor(public templateRef: TemplateRef<any>) {}

}
