import { NgModule } from '@angular/core';
import { CustomLoadingSpinnerComponent, DynamicLoadingComponent, LoadedContentComponent } from './dynamic-loading.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DynamicLoadingComponent,
    LoadedContentComponent,
    CustomLoadingSpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicLoadingComponent,
    LoadedContentComponent,
    CustomLoadingSpinnerComponent,
  ]
})
export class DynamicLoadingModule { }
