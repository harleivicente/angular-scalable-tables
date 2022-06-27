import { AfterContentInit, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { PactoDataTableFilter, PactoDataTableStateManager } from './data-table-state-manager';
import { TableColumnDirective } from './table-column.directive';
import { TableLoadingDirective } from './table-loading.directive';
import { TableRowDirective } from './table-row.directive';

@Directive({
  selector: 'table[uiDataTable]',
  exportAs: 'uiDataTable',
  providers: [ PactoDataTableStateManager ]
})
export class DataTableDirective<T> implements OnInit, AfterContentInit {
  @Output() filterUpdate: EventEmitter<PactoDataTableFilter>;
  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;
  @ContentChild(TableLoadingDirective, { static: true }) loading: TableLoadingDirective;
  @ContentChild(TableRowDirective, { static: true }) row: TableRowDirective;

  private thead;
  private tbody;
  private headerRow;

  constructor(
    private renderer: Renderer2,
    private tableElement: ElementRef,
    @Self() public stateManager: PactoDataTableStateManager<T>,
    private tableViewContainerRef: ViewContainerRef
  ) {

    this.filterUpdate = this.stateManager.filterUpdate$;
  }

  ngOnInit() {}
  
  ngAfterContentInit() {
    this.stateManager.initializeColumnConfig(this.columns.toArray());
    this.renderTable();
    this.stateManager.state$.subscribe(() => {
        this.renderTable();
    });
  }

  get state() {
    return this.stateManager.state$.value;
  }

  get data() {
      return this.state.data;
  }

  private get visibleColumns(): TableColumnDirective[] {
    return this.columns.filter(column => {
      const columnId = column.uiTableColumn;
      return this.state.columnVisibility[columnId];
    });
  }

  private renderTable() {
    this.clearState();

    if (this.state.loading) {
      this.renderLoading();
    } else {
      this.renderTableHeader(this.visibleColumns);
      this.renderTableBody(this.state.data);
    }
  }
  
  private clearState() {
    this.tableViewContainerRef.clear();
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

  private renderTableBody(data: any[]) {
    const tableBody = this.buildTableBody(data);
    const tableRef = this.tableElement.nativeElement;
    tableRef.insertBefore(
      tableBody,
      tableRef.lastChild
    );
  }

  private renderLoading() {
    if (!this.loading) return;
    const loadingTemplate = this.loading.templateRef;
    const embbededView = this.tableViewContainerRef.createEmbeddedView(loadingTemplate);
    
    this.tableElement.nativeElement.insertBefore(
      embbededView.rootNodes[0],
      this.tableElement.nativeElement.lastChild
    );
  }

  private buildHeaderRowCells(columns: TableColumnDirective[]): HTMLElement[] {
    return columns.map(column => {
      const headerCellTemplate = column.headerCell.template;
      const columnId = column.uiTableColumn;
      const sortDirection = this.getSortDirection(columnId);
      const embeddedViewRef = this.tableViewContainerRef.createEmbeddedView(headerCellTemplate, {
        sortDirection,
        toggleSort: () => {
          return this.toggleSort(columnId);
        }
      });
      return embeddedViewRef.rootNodes[0];
    });
  }

  private getSortDirection(columnId: string) {
    return this.state.orderBy === columnId ? this.state.orderDirection : null;
  }

  private toggleSort(columnId: string) {
    const sortDirection = this.getSortDirection(columnId);
    this.stateManager.patchState({
      orderBy: columnId,
      orderDirection: sortDirection === 'ASC' ? 'DESC' : 'ASC'
    });
  }

  private buildRowCells(data: any): HTMLElement[] {
    const templates = this.visibleColumns.map(column => column.cell.template);
    const viewContainerRef = this.tableViewContainerRef;
    return templates.map(template => {
      const embeddedViewRef = viewContainerRef.createEmbeddedView(template, {
        $implicit: data
      });
      return embeddedViewRef.rootNodes[0];
    });
  }

  private buildRow(dataItem: any): HTMLElement {
    const rowCells = this.buildRowCells(dataItem);

    const rowTemplate = this.row.templateRef;
    const rowEmbeddedView = this.tableViewContainerRef.createEmbeddedView(rowTemplate);
    const rowNativeRef = rowEmbeddedView.rootNodes[0];

    rowCells.reverse().forEach(rowCell => {
      rowNativeRef.insertBefore(rowCell, rowNativeRef.lastChild);
    });

    return rowNativeRef;
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
