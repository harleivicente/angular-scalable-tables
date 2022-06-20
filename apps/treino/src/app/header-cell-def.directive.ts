import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiHeaderCellDef]'
})
export class HeaderCellDefDirective {

  constructor(private _templateRef: TemplateRef<any> ) {}

  public get templateRef() {
    return this._templateRef;
  }

}
