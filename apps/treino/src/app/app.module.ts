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
    DemoStyledDataTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([
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
