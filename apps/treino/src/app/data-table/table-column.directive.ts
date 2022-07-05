import { ContentChild, ContentChildren, Directive, Input } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';

@Directive({
  selector: '[uiTableColumn]'
})
export class TableColumnDirective {
  @Input() uiTableColumn: string;
  @Input() columnInitiallyVisible = true;
  @ContentChild(TableHeaderCellDirective, { static: false }) headerCell: TableHeaderCellDirective;
  @ContentChild(TableCellDirective, { static: false }) cell: TableCellDirective;

  constructor() {}

}
