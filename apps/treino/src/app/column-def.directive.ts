import { AfterContentInit, ContentChild, ContentChildren, Directive, Input, OnInit, QueryList } from '@angular/core';
import { CellDefDirective } from './cell-def.directive';
import { HeaderCellDefDirective } from './header-cell-def.directive';
import { HeaderRowDefDirective } from './header-row-def.directive';

@Directive({
  selector: '[uiColumnDef]'
})
export class ColumnDefDirective implements OnInit, AfterContentInit {
  @ContentChild(HeaderCellDefDirective, { static: true }) headerCell: HeaderCellDefDirective;
  @ContentChild(CellDefDirective, { static: true }) cell: HeaderRowDefDirective;

  constructor() {}

  @Input() uiColumnDef: string;

  ngOnInit() {}

  get columnId() { return this.uiColumnDef; }
  
  ngAfterContentInit() {}

}
