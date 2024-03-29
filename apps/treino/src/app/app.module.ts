import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SpecializedDataTableComponent } from './specialized-data-table/specialized-data-table.component';


import { DemoPureTableComponent } from './demo-pure-table/demo-pure-table.component';
import { DemoSpecializedTableComponent } from './demo-specialized-table/demo-specialized-table.component';
import { DemoStyledDataTableComponent } from './demo-styled-data-table/demo-styled-data-table.component';
import { DemoStyledHtmlTableComponent } from './demo-styled-html-table/demo-styled-html-table.component';
import { DemoUnstyledDataTableComponent } from './demo-unstyled-data-table/demo-unstyled-data-table.component';
import { DataTableDirective } from './data-table/data-table.directive';
import { TableHeaderCellDirective } from './data-table/table-header-cell.directive';
import { TableColumnDirective } from './data-table/table-column.directive';
import { TableCellDirective } from './data-table/table-cell.directive';
import { TableLoadingDirective } from './data-table/table-loading.directive';
import { TableRowDirective } from './data-table/table-row.directive';
import { DataTableFilterDirective } from './data-table/data-table-filter.directive';
import { TableSortControlDirective } from './data-table/table-sort-control.directive';
import { StyledTableDirective } from './styled-table/styled-table.directive';
import { HeaderRowStyleDirective } from './styled-table/header-row-style.directive';
import { HeaderCellStyleDirective } from './styled-table/header-cell-style.directive';
import { CellStyleDirective } from './styled-table/cell-style.directive';
import { RowStyleDirective } from './styled-table/row-style.directive';
import { CellActionDirective } from './cell-action.directive';
import { DemoTemplatesComponent } from './demo-templates/demo-templates.component';
import { DemoComponentCommunicationComponent } from './demo-component-communication/demo-component-communication.component';
import { CardComponent } from './demo-component-communication/card/card.component';
import { DemoDirectiveStyleComponent } from './demo-directive-style/demo-directive-style.component';
import { StyledTextDirective } from './demo-directive-style/styled-text.directive';
import { AvatarComponent } from './demo-component-communication/avatar/avatar.component';
import { DemoStructuralDirectiveComponent } from './demo-structural-directive/demo-structural-directive.component';
import { SimpleCardDirective } from './demo-structural-directive/simple-card.directive';
import { DemoBehaviorSubjectComponent } from './demo-behavior-subject/demo-behavior-subject.component';
import { CounterBlockComponent } from './demo-behavior-subject/counter-block/counter-block.component';
import { SpecializedTableExportComponent } from './specialized-table-export/specialized-table-export.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPureTableComponent,
    SpecializedDataTableComponent,
    DataTableDirective,
    TableHeaderCellDirective,
    TableColumnDirective,
    TableCellDirective,
    TableLoadingDirective,
    TableRowDirective,
    DataTableFilterDirective,
    TableSortControlDirective,
    DemoStyledHtmlTableComponent,
    DemoUnstyledDataTableComponent,
    DemoSpecializedTableComponent,
    DemoStyledDataTableComponent,
    StyledTableDirective,
    HeaderRowStyleDirective,
    HeaderCellStyleDirective,
    CellStyleDirective,
    RowStyleDirective,
    CellActionDirective,
    DemoTemplatesComponent,
    DemoComponentCommunicationComponent,
    CardComponent,
    DemoDirectiveStyleComponent,
    StyledTextDirective,
    AvatarComponent,
    DemoStructuralDirectiveComponent,
    SimpleCardDirective,
    DemoBehaviorSubjectComponent,
    CounterBlockComponent,
    SpecializedTableExportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'behavior-subject',
        component: DemoBehaviorSubjectComponent
      },
      {
        path: 'structural-directive',
        component: DemoStructuralDirectiveComponent
      },
      {
        path: 'directive-style',
        component: DemoDirectiveStyleComponent
      },
      {
        path: 'templates',
        component: DemoTemplatesComponent
      },
      {
        path: 'component-comunication',
        component: DemoComponentCommunicationComponent
      },
      {
        path: 'manual-data-table',
        component: DemoPureTableComponent
      },
      {
        path: 'styled-html-table',
        component: DemoStyledHtmlTableComponent
      },
      {
        path: 'unstyled-data-table',
        component: DemoUnstyledDataTableComponent
      },
      {
        path: 'styled-data-table',
        component: DemoStyledDataTableComponent
      },
      {
        path: 'specialized-table-component',
        component: DemoSpecializedTableComponent
      },
    ]),
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    CdkTableModule,
    MatSliderModule
  ],
  providers: [],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
