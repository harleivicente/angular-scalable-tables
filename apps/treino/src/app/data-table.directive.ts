import { AfterViewInit, ContentChildren, Directive, ElementRef, EmbeddedViewRef, EventEmitter, OnInit, Output, QueryList, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { PactoDataTableFilter, PactoDataTableStateManager } from './data-table-state-manager';
import { TableColumnDirective } from './table-column.directive';

@Directive({
  selector: 'table[uiDataTable]',
  exportAs: 'uiDataTable',
  providers: [ PactoDataTableStateManager ]
})
export class DataTableDirective<T> implements OnInit, AfterViewInit {
  @Output() filterUpdate: EventEmitter<PactoDataTableFilter>;
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;

  private thead;
  private tbody;
  private headerRow;
  private bodyRows: HTMLElement[] = [];

  constructor(
    private renderer: Renderer2,
    private tableElement: ElementRef,
    @Self() public stateManager: PactoDataTableStateManager<T>,
    private tableViewContainerRef: ViewContainerRef
  ) {
    this.filterUpdate = this.stateManager.filterUpdate$;
  }

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.renderTable();

    this.stateManager.state$.subscribe(() => {
      this.renderTable();
    });

    this.columns.changes.subscribe(() => {
      this.renderTable();
    });
  }

  get state() {
    return this.stateManager.state$.value;
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

  private renderTable() {

    this.tableViewContainerRef.clear();
    this.bodyRows.forEach(row => {
      row.remove();
    });

    this.renderTableHeader(this.columns.toArray());
    this.renderTableBody(this.state.data);
  }

  private renderTableHeader(columns: TableColumnDirective[]) {
    const headerCells = this.buildHeaderRowCells(columns);

    if (!this.thead) {
      this.thead = this.renderer.createElement('thead');
    }
    if (!this.headerRow) {
      this.headerRow = this.renderer.createElement('tr');
    }

    this.thead.insertBefore(this.headerRow, this.thead.lastChild);
    headerCells.reverse().forEach(headerCell => {
      this.headerRow.insertBefore(headerCell, this.headerRow.firstChild);
    });

    const tableRef = this.tableElement.nativeElement;
    tableRef.insertBefore(
      this.thead,
      tableRef.firstChild
    )
  }

  private buildHeaderRowCells(columns: TableColumnDirective[]): HTMLElement[] {
    return columns.map(column => {
      const headerCellTemplate = column.headerCell.template;
      const embeddedViewRef = this.tableViewContainerRef.createEmbeddedView(headerCellTemplate);
      return embeddedViewRef.rootNodes[0];
    });
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

}
