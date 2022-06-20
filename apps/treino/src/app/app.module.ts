import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PactoDataTableDirective } from './pacto-data-table.directive';
import { CommonModule } from '@angular/common';
import { ColumnDefDirective } from './column-def.directive';
import { TableHeadComponent } from './table-head/table-head.component';
import { HeaderRowDefDirective } from './header-row-def.directive';
import { HeaderCellDefDirective } from './header-cell-def.directive';
import { CellDefDirective } from './cell-def.directive';

@NgModule({
  declarations: [
    AppComponent,
    PactoDataTableDirective,
    ColumnDefDirective,
    TableHeadComponent,
    HeaderRowDefDirective,
    HeaderCellDefDirective,
    CellDefDirective
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    BrowserAnimationsModule,
    CdkTableModule,
    MatSliderModule
  ],
  providers: [],
  entryComponents: [
    TableHeadComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
