import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PureTableComponent } from './pure-table/pure-table.component';
import { UiSquaresComponent } from './ui-squares/ui-squares/ui-squares.component';
import { SquareGameDirective } from './ui-squares/square-game.directive';
import { SquareDirective } from './ui-squares/square.directive';

@NgModule({
  declarations: [
    AppComponent,
    PureTableComponent,
    UiSquaresComponent,
    SquareGameDirective,
    SquareDirective
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
