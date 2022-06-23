import { Directive, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PactoDataTableState<T> {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  data: T[];
}

export interface PactoDataTableFilter {
  pageSize: number;
  currentPage: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

@Directive({
  selector: 'table[uiDataTable]',
  exportAs: 'uiDataTable'
})
export class DataTableDirective<T> {
  @Output() filterUpdate: EventEmitter<PactoDataTableFilter> = new EventEmitter();
  
  private dataTableState$: BehaviorSubject<PactoDataTableState<T>> = new BehaviorSubject({
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    data: [],
    orderBy: null,
    orderDirection: null
  });

  private getCurrentFilter(): PactoDataTableFilter {
    const { 
      totalPages,
      data,
      ...filter 
    } = this.dataTableState$.value;
    return filter;
  }

  get state() { 
    return this.dataTableState$.value;
  }

  get data() {
    return this.state.data;
  }

  get currentPage() {
    return this.state.currentPage;
  }

  get pageSize() {
    return this.state.pageSize;
  }

  patchState(state: Partial<PactoDataTableState<T>>) {
    const current = this.dataTableState$.value;
    this.dataTableState$.next({
      ...current,
      ...state
    });
  }

  setCurrentPage(currentPage: number) {
    const currentFilter = this.getCurrentFilter();
    this.filterUpdate.emit({
      ...currentFilter,
      currentPage
    })
  }

  setPageSize(pageSize: number) {
    const currentFilter = this.getCurrentFilter();
    this.filterUpdate.emit({
      ...currentFilter,
      pageSize,
      currentPage: 1
    });
  }

  setOrderState(orderBy: string, orderDirection: 'ASC' | 'DESC') {
    const currentFilter = this.getCurrentFilter();
    this.filterUpdate.emit({
      ...currentFilter,
      orderBy,
      orderDirection,
      currentPage: 1
    });
  }

  constructor() {}

}
