import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicLoadingModule } from 'dynamic-loading';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicLoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
