import { AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PactoDataTableFilter, PactoDataTableResult, PactoDataTableState, PactoDataTableStateManager } from '../data-table-state-manager';
import { TableColumnDirective } from '../table-column.directive';
import { TableLoadingDirective } from '../table-loading.directive';
import { TableRowDirective } from '../table-row.directive';
import { debounceTime } from 'rxjs/operators';


export interface TreinoTableFilter extends PactoDataTableFilter {
  textFilter?: string;
}

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [PactoDataTableStateManager],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent<T> implements OnInit, OnChanges {
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;
  @ContentChild(TableLoadingDirective, { static: true }) loadingTemplate: TableLoadingDirective;
  @ContentChild(TableRowDirective, { static: true }) rowTemplate: TableRowDirective;
  
  @Input() loading: boolean;
  @Input() data: PactoDataTableResult<T>;

  @Output() filterUpdate: EventEmitter<TreinoTableFilter> = new EventEmitter();
  @Output() share: EventEmitter<boolean> = new EventEmitter();


  filterInputFc: FormControl = new FormControl();
  

  constructor(
    public stateManager: PactoDataTableStateManager<any>
  ) {}

  ngOnInit() {

    this.stateManager.update$.subscribe((filter: PactoDataTableFilter) => {
      this.filterUpdate.emit({
        ...filter,
        textFilter: this.filterInputFc.value
      });
    })

    this.filterInputFc.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(textFilter => {
      this.filterUpdate.emit({
        ...this.stateManager.getCurrentFilter(),
        textFilter
      });
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    let state: Partial<PactoDataTableState<T>> = {};

    if (changes.data && changes.data.currentValue) {
      const data: PactoDataTableResult<T> = changes.data.currentValue;
      state = { ...data };
    }

    if (changes.loading && changes.loading.currentValue !== undefined) {
      state = {
        ...state,
        loading: changes.loading.currentValue
      }
    }
    
    this.stateManager.patchState(state);
  }

  show20() {
    this.stateManager.triggerPageSizeChange(20);
  }

}
