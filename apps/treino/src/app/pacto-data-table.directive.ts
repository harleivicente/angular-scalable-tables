import { AfterContentInit, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColumnDefDirective } from './column-def.directive';
import { HeaderRowDefDirective } from './header-row-def.directive';
import { TableHeadComponent } from './table-head/table-head.component';

@Directive({
  selector: '[uiPactoDataTable]'
})
export class PactoDataTableDirective implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(ColumnDefDirective) columnDefinitions: QueryList<ColumnDefDirective>;
  @ContentChild(HeaderRowDefDirective, { static: false }) headerRowDef: HeaderRowDefDirective;

  @Input() columnsToShow = [];

  constructor(
    private viewContainer: ViewContainerRef,
    private element: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  getColumnDefs(): ColumnDefDirective[] {
    if (!this.columnDefinitions || !this.columnDefinitions.length) return [];
    return this.columnDefinitions.toArray();
  }

  getFilteredColumnDefs(): ColumnDefDirective[] {
    const columnsToShow = this.getColumnIdsToShow();
    return this.getColumnDefs().filter(columnDef => {
      return columnsToShow.includes(columnDef.columnId);
    })
  }

  getColumnIdsToShow() {
    return ['nome', 'idade']
    // return this.headerRowDef.columnIdsToShow;
  }

  getHeaderTemplates(): TemplateRef<any>[] {
    return this.getFilteredColumnDefs().map(
      columnDef => columnDef.headerCell.templateRef
    );
  }
  
  ngAfterContentInit() {
    const tableHeadResolver = this.componentFactoryResolver.resolveComponentFactory(TableHeadComponent);
    const tableHeadInstance = this.headerRowDef.viewContainer.createComponent(tableHeadResolver);
    tableHeadInstance.instance.headers = this.getHeaderTemplates();

    console.log(this.headerRowDef.viewContainer);

  }
  
  ngOnChanges(changes: SimpleChanges): void {}


}
