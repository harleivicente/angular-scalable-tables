import { AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DataTableFilterDirective } from '../data-table/data-table-filter.directive';
import { PactoDataTableFilter, PactoDataTableResult, PactoDataTableState, PactoDataTableStateManager } from '../data-table/data-table-state-manager';
import { TableColumnDirective } from '../data-table/table-column.directive';
import { TableLoadingDirective } from '../data-table/table-loading.directive';
import { TableRowDirective } from '../data-table/table-row.directive';


export interface TreinoTableFilter extends PactoDataTableFilter {
  textFilter?: string;
  filter?: any;
}

@Component({
  selector: 'ui-specialized-data-table',
  exportAs: 'dataTable',
  templateUrl: './specialized-data-table.component.html',
  styleUrls: ['./specialized-data-table.component.scss'],
  providers: [PactoDataTableStateManager],
  encapsulation: ViewEncapsulation.None
})
export class SpecializedDataTableComponent<T> implements OnInit, OnChanges {
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;
  @ContentChild(TableLoadingDirective, { static: true }) loadingTemplate: TableLoadingDirective;
  @ContentChild(TableRowDirective, { static: true }) rowTemplate: TableRowDirective;
  @ContentChild(DataTableFilterDirective, { static: true }) filterTemplate: DataTableFilterDirective;

  @ViewChild('filterOutlet', { read: ViewContainerRef, static: true }) filterOutlet: ViewContainerRef;

  @Input() loading: boolean;
  @Input() data: PactoDataTableResult<T>;

  @Output() filterUpdate: EventEmitter<TreinoTableFilter> = new EventEmitter();
  @Output() share: EventEmitter<boolean> = new EventEmitter();


  filter: any = {};
  showFilter = false;
  textFilterFormControl: FormControl = new FormControl();
  pageControlFormGroup: FormGroup = new FormGroup({
    pageSize: new FormControl(),
    currentPage: new FormControl()
  });


  constructor(
    public stateManager: PactoDataTableStateManager<any>
  ) {}

  ngOnInit() {

    this.stateManager.update$.subscribe((filter: PactoDataTableFilter) => {
      this.filterUpdate.emit({
        ...filter,
        textFilter: this.textFilterFormControl.value,
        filter: this.filter
      });
    })

    this.initializeFormControls();

    // Build custom filter
    if (this.filterTemplate) {
      const filterTemplate = this.filterTemplate.templateRef;
      this.filterOutlet.createEmbeddedView(filterTemplate);
    }

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

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  updateFilter(filter) {
    this.filter = filter;
    this.filterUpdate.emit({
      ...this.stateManager.getCurrentFilter(),
      textFilter: this.textFilterFormControl.value,
      filter: filter
    });
  }

  get Array() { return Array; }

  private initializeFormControls() {

    this.stateManager.state$.subscribe(state => {
      this.pageControlFormGroup.patchValue({
        pageSize: state.pageSize,
        currentPage: state.currentPage
      }, { emitEvent: false });
    });

    this.textFilterFormControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(textFilter => {
      this.filterUpdate.emit({
        ...this.stateManager.getCurrentFilter(),
        textFilter,
        filter: this.filter
      });
    });

    this.pageControlFormGroup.get('pageSize').valueChanges.subscribe(pageSize => {
      this.stateManager.triggerPageSizeChange(parseInt(pageSize, 10));
    });

    this.pageControlFormGroup.get('currentPage').valueChanges.subscribe(currentPage => {
      this.stateManager.triggerPageNumberChange(parseInt(currentPage, 10));
    });

  }

}
