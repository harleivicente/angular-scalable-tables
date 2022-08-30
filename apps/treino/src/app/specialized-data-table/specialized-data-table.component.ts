import { AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { DataTableFilterDirective } from '../data-table/data-table-filter.directive';
import { PactoDataTableFilter, PactoDataTableResult, PactoDataTableState, PactoDataTableStateManager } from '../data-table/data-table-state-manager';
import { TableColumnDirective } from '../data-table/table-column.directive';
import { TableLoadingDirective } from '../data-table/table-loading.directive';
import { TableRowDirective } from '../data-table/table-row.directive';
import { DataTableShareOptions, ShareType } from '../specialized-table-export/specialized-table-export.component';
import { ShareHandlerFn } from './export-provider.model';

export interface TreinoTableFilter extends PactoDataTableFilter {
  textFilter?: string;
  filter?: any;
}

const DEFAULT_FILTER: PactoDataTableFilter = {
  currentPage: 1,
  pageSize: 10,
  orderBy: null,
  orderDirection: null
};

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
  @Input() name: String;
  @Input() showExport = false;
  @Input() shareHandlerFn: ShareHandlerFn;

  @Output() filterUpdate: EventEmitter<TreinoTableFilter> = new EventEmitter();


  protected filter: any = {};
  protected showFilter = false;
  protected isShareDropdownOpen = false;
  protected textFilterFormControl: FormControl = new FormControl();
  protected pageControlFormGroup: FormGroup = new FormGroup({
    pageSize: new FormControl(),
    currentPage: new FormControl()
  });

  constructor(public stateManager: PactoDataTableStateManager<any>) {}

  ngOnInit() {
    this.stateManager.patchState({ loading: true });
    this.initialStateFetch().subscribe(filter => {
      setTimeout(() => {
        this.stateManager.patchState({ loading: false });
        this.stateManager.triggerFilterChange(filter);
      });
    });

    this.stateManager.update$.subscribe((filter: PactoDataTableFilter) => {
      this.storeFilterState(filter);
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

  protected toggleExportDropdown() {
    this.isShareDropdownOpen = !this.isShareDropdownOpen;
  }

  protected shareConfirm(shareOptions: DataTableShareOptions) {
    if (!this.shareHandlerFn) throw Error('Para fazer o uso da funcionalidade de share é necessário definir um shareHandlerFn');

    this.shareHandlerFn(shareOptions, this.stateManager.state).subscribe(shareResult => {
      
      if (shareOptions.type === ShareType.PDF) {
        console.log('SHARE: download PDF file' + shareResult.fileToDownload);
      } else if (shareOptions.type === ShareType.WHATSAPP) {
        console.log('SHARE: open in new tab. cel number: ' + shareOptions.whatsapp)
      } else if (shareOptions.type === ShareType.CSV) {
        console.log('SHARE: download CSV file' + shareResult.fileToDownload);
      }

      this.isShareDropdownOpen = false;

    });

  }

  private initialStateFetch(): Observable<PactoDataTableFilter> {
    const state = this.fetchFilterState();
    return of(state ? state : DEFAULT_FILTER);
  }

  private filterStateId() {
    return `data-table-cache-${this.name}`;
  }

  private fetchFilterState(): PactoDataTableFilter {
    const id = this.filterStateId();
    const state = localStorage.getItem(id);
    return state ? JSON.parse(state) : null;
  }

  private storeFilterState(filter: PactoDataTableFilter) {
    const id = this.filterStateId();
    localStorage.setItem(id, JSON.stringify(filter));
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
