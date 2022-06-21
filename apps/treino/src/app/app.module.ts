import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PureTableComponent } from './pure-table/pure-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PureTableComponent
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
