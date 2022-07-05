import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiDataTableFilter]'
})
export class DataTableFilterDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
