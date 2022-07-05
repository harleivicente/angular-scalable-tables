import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PureTableComponent } from './pure-table/pure-table.component';
import { UiSquaresComponent } from './ui-squares/ui-squares/ui-squares.component';
import { SquareGameDirective } from './ui-squares/square-game.directive';
import { SquareDirective } from './ui-squares/square.directive';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableDirective } from './data-table.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableColumnDirective } from './table-column.directive';
import { TableCellDirective } from './table-cell.directive';
import { TableLoadingDirective } from './table-loading.directive';
import { TableRowDirective } from './table-row.directive';
import { DataTableFilterDirective } from './data-table-filter.directive';
import { TableSortControlDirective } from './table-sort-control.directive';
import { StyledHtmlTableComponent } from './styled-html-table/styled-html-table.component';
import { UnstyledDataTableComponent } from './unstyled-data-table/unstyled-data-table.component';
import { SpecializedTableComponent } from './specialized-table/specialized-table.component';
import { StyledDataTableComponent } from './styled-data-table/styled-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PureTableComponent,
    UiSquaresComponent,
    SquareGameDirective,
    SquareDirective,
    DataTableComponent,
    DataTableDirective,
    TableHeaderCellDirective,
    TableColumnDirective,
    TableCellDirective,
    TableLoadingDirective,
    TableRowDirective,
    DataTableFilterDirective,
    TableSortControlDirective,
    StyledHtmlTableComponent,
    UnstyledDataTableComponent,
    SpecializedTableComponent,
    StyledDataTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'manual-data-table',
        component: PureTableComponent
      },
      {
        path: 'styled-html-table',
        component: StyledHtmlTableComponent
      },
      {
        path: 'unstyled-data-table',
        component: UnstyledDataTableComponent
      },
      {
        path: 'styled-data-table',
        component: StyledDataTableComponent
      },
      {
        path: 'specialized-table-component',
        component: SpecializedTableComponent
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
