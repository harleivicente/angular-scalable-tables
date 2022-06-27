import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTableLoading]'
})
export class TableLoadingDirective {

  constructor(public templateRef: TemplateRef<any>) {}

}
