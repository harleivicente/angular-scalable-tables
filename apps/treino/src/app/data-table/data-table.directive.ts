import { AfterContentInit, ContentChild, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { PactoDataTableStateManager } from './data-table-state-manager';
import { TableColumnDirective } from './table-column.directive';
import { TableLoadingDirective } from './table-loading.directive';
import { TableRowDirective } from './table-row.directive';
import { TableSortControlDirective } from './table-sort-control.directive';

@Directive({
  selector: 'table[uiDataTable]',
  exportAs: 'uiDataTable'
})
export class DataTableDirective<T> implements OnInit, AfterContentInit {
  @ContentChildren(TableColumnDirective) contentColumnTemplates: QueryList<TableColumnDirective>;
  @ContentChild(TableLoadingDirective, { static: true }) contentLoadingTemplate: TableLoadingDirective;
  @ContentChild(TableRowDirective, { static: true }) contentRowTemplate: TableRowDirective;
  @ContentChild(TableSortControlDirective, { static: true }) sortTemplate: TableSortControlDirective;

  @Input() stateManager: PactoDataTableStateManager<T>;
  /**
   * Colunas adicinais no formato TableColumnDirective
   */
  @Input() columnTemplates: TableColumnDirective[] = [];
  @Input() loadingTemplate: TableLoadingDirective;
  @Input() rowTemplate: TableRowDirective;

  private thead;
  private tbody;
  private headerRow;

  constructor(
    private renderer: Renderer2,
    private tableElement: ElementRef,
    private tableViewContainerRef: ViewContainerRef
  ) {}

  get allColumns(): TableColumnDirective[] {
    return [
      ...this.contentColumnTemplates.toArray(),
      ...this.columnTemplates
    ];
  }

  get activeLoadingTemplate(): TableLoadingDirective {
    return this.loadingTemplate || this.contentLoadingTemplate;
  }

  get activeRowTemplate(): TableRowDirective {
    return this.rowTemplate || this.contentRowTemplate;
  }

  ngOnInit() {}
  
  ngAfterContentInit() {
    if (!this.stateManager) return;
    this.initializeColumnConfig();
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

  private initializeColumnConfig() {
    const columnConfig = this.allColumns.map(column => ({
      id: column.uiTableColumn,
      initiallyVisible: column.columnInitiallyVisible
    }));
    this.stateManager.initializeColumnConfig(columnConfig);
  }

  private get visibleColumns(): TableColumnDirective[] {
    return this.allColumns.filter(column => {
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
    const headerCells = this.buildHeaderCells(columns);

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
    if (!this.activeLoadingTemplate) return;
    const loadingTemplate = this.activeLoadingTemplate.templateRef;
    const embbededView = this.tableViewContainerRef.createEmbeddedView(loadingTemplate);
    
    this.tableElement.nativeElement.insertBefore(
      embbededView.rootNodes[0],
      this.tableElement.nativeElement.lastChild
    );
  }

  private buildHeaderCells(columns: TableColumnDirective[]): HTMLElement[] {
    return columns.map(column => this.buildHeaderCell(column));
  }

  private buildHeaderCell(column: TableColumnDirective): HTMLElement {
    const headerCellTemplate = column.headerCell.template;
    const viewContainer = this.tableViewContainerRef;

    const cellEmbeddedViewRef = viewContainer.createEmbeddedView(headerCellTemplate);

    const cellElement: HTMLElement = cellEmbeddedViewRef.rootNodes[0];
    const sortControl = this.buildSortControl(column.uiTableColumn);
    if (sortControl) {
      cellElement.insertBefore(sortControl,null);
    }

    return cellEmbeddedViewRef.rootNodes[0];
  }

  private buildSortControl(columnId: string): HTMLElement {
    if (!this.sortTemplate) return null;

    const sortTemplate = this.sortTemplate.templateRef;
    const viewContainer = this.tableViewContainerRef;
    const sortEmbeddedViewRef = viewContainer.createEmbeddedView(sortTemplate, {
      direction: this.stateManager.getSortDirection(columnId),
      triggerSortToggle: () => {
        this.stateManager.triggerSortToggle(columnId);
      }
    });
    return sortEmbeddedViewRef.rootNodes[0];
  }

  private buildBodyCells(data: any): HTMLElement[] {
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
    const rowCells = this.buildBodyCells(dataItem);
    const rowTemplate = this.activeRowTemplate.templateRef;
    const rowEmbeddedView = this.tableViewContainerRef.createEmbeddedView(rowTemplate);
    const rowNativeRef = rowEmbeddedView.rootNodes[0];

    rowCells.forEach(rowCell => {
      rowNativeRef.insertBefore(rowCell, null);
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
