import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[uiHeaderRowDef]'
})
export class HeaderRowDefDirective {
  @Input() uiHeaderRowDef: string;

  constructor(
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
  ) {}

  public get viewContainer() {
    return this._viewContainer;
  }

  public get columnIdsToShow() {
    return this.uiHeaderRowDef;
  }

}
