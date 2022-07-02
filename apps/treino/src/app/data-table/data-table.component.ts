import { AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { PactoDataTableFilter, PactoDataTableResult, PactoDataTableStateManager } from '../data-table-state-manager';
import { TableColumnDirective } from '../table-column.directive';
import { TableLoadingDirective } from '../table-loading.directive';
import { TableRowDirective } from '../table-row.directive';

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [PactoDataTableStateManager],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent<T> implements OnInit, AfterViewInit {
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;
  @ContentChild(TableLoadingDirective, { static: true }) loadingTemplate: TableLoadingDirective;
  @ContentChild(TableRowDirective, { static: true }) rowTemplate: TableRowDirective;
  @Output() filterUpdate: EventEmitter<PactoDataTableFilter> = new EventEmitter();

  constructor(
    public stateManager: PactoDataTableStateManager<any>
  ) {}

  ngOnInit() {
    this.stateManager.update$.subscribe($event => {
      this.filterUpdate.emit($event);
    })

    this.stateManager.initializeColumnConfig([
      { id: "nome", initiallyVisible: true },
      { id: "idade", initiallyVisible: true },
      { id: "cpf", initiallyVisible: true }
    ]);
  }

  ngAfterViewInit() {}

  setLoading() {
    this.stateManager.patchState({ loading: true });
  }

  setTableState(result: PactoDataTableResult<T>) {
    this.stateManager.patchState({
      ...result,
      loading: false
    });
  }
  
  show20() {
    this.stateManager.triggerPageSizeChange(20);
  }

}
