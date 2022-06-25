import { AfterViewInit, ContentChildren, Directive, ElementRef, EmbeddedViewRef, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumnDirective } from './table-column.directive';

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
export class DataTableDirective<T> implements OnInit, AfterViewInit {
  @Output() filterUpdate: EventEmitter<PactoDataTableFilter> = new EventEmitter();
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;

  private thead;
  private tbody;
  private headerRow;
  private bodyRows: HTMLElement[] = [];

  private dataTableState$: BehaviorSubject<PactoDataTableState<T>> = new BehaviorSubject({
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    data: [],
    orderBy: null,
    orderDirection: null
  });

  constructor(
    private renderer: Renderer2,
    private tableElement: ElementRef,
    private tableViewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.renderTable();

    this.dataTableState$.subscribe(() => {
      this.renderTable();
    });

    this.columns.changes.subscribe(() => {
      this.renderTable();
    });
  }

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

  private renderTable() {

    this.tableViewContainerRef.clear();
    this.bodyRows.forEach(row => {
      row.remove();
    });

    this.renderTableHeader(this.columns.toArray());
    this.renderTableBody(this.dataTableState$.value.data);
  }

  private renderTableHeader(columns: TableColumnDirective[]) {
    const headerCells = columns.map(column => {
      const headerCellTemplate = column.headerCell.template;
      return this.tableViewContainerRef.createEmbeddedView(headerCellTemplate);
    });
    const tableHead = this.buildHeaderContainer(headerCells);
    this.injectTableHeader(tableHead);
  }

  private buildHeaderContainer(headerCells: EmbeddedViewRef<any>[]) {

    if (!this.thead) {
      this.thead = this.renderer.createElement('thead');
    }

    if (!this.headerRow) {
      this.headerRow = this.renderer.createElement('tr');
    }

    this.thead.insertBefore(this.headerRow, this.thead.lastChild);

    headerCells.reverse().forEach(headerCell => {
      const headerCellRoot = headerCell.rootNodes[0];
      this.headerRow.insertBefore(headerCellRoot, this.headerRow.firstChild);
    });

    return this.thead;
  }
  
  private injectTableHeader(thead) {
    const tableElementRef = this.tableElement.nativeElement;
    tableElementRef.insertBefore(
      thead,
      tableElementRef.firstChild
    )
  }

  private renderTableBody(data: any[]) {
    const tableBody = this.buildTableBody(data);
    const tableRef = this.tableElement.nativeElement;
    tableRef.insertBefore(
      tableBody,
      tableRef.lastChild
    );
  }

  private buildRowCells(data: any): HTMLElement[] {
    const templates = this.columns.map(column => column.cell.template);
    const viewContainerRef = this.tableViewContainerRef;
    return templates.map(template => {
      const embeddedViewRef = viewContainerRef.createEmbeddedView(template, {
        $implicit: data
      });
      return embeddedViewRef.rootNodes[0];
    });
  }

  private buildRow(dataItem: any) {
    const rowCells = this.buildRowCells(dataItem);
    const tr = this.renderer.createElement('tr');
    this.bodyRows.push(tr);

    rowCells.reverse().forEach(rowCell => {
      tr.insertBefore(rowCell, tr.firstChild);
    });
    return tr;
  }

  private buildTableBody(data: any[]) {
    const tableRows = data.map( dataItem => {
      return this.buildRow(dataItem);
    });

    if (!this.tbody) {
      this.tbody = this.renderer.createElement('tbody');
    }

    tableRows.forEach(tableRow => {
      this.tbody.insertBefore(tableRow, this.tbody.lastChild);
    });
    return this.tbody;
  }

  private injectTableBody() {}
}
