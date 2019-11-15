import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { globalMetaComponent, LoadingAction } from './common';
import { DynamicLoadingService } from './dynamic-loading.service';

@Component({
  selector: 'drm-dynamic-loading',
  templateUrl: 'dynamic-loading.html',
  styleUrls: ['dynamic-loading.scss']
})
export class DynamicLoadingComponent implements OnInit, AfterViewInit {
  @Input()
  global: boolean;

  @Input()
  component: string;

  @Input()
  color: string;

  @ViewChild('customLoadingWrapper', { static: false })
  customLoadingWrapper: ElementRef;

  loading = false;
  hasCustomLoadingSpinner = false;

  constructor(
    private service: DynamicLoadingService,
  ) { }

  ngOnInit() {
    // formal check
    if (!!this.global && !!this.component) {
      throw new Error(`ERROR! Passed global = ${this.global} and a component = ${this.component}. Only one should be passed instead.`);
    }

    // if none is defined, `global` is the default
    if (!this.global && !this.component) {
      this.global = true;
    }

    const component = this.global ? globalMetaComponent : this.component;
    this.service.subscribe(
      component,
      (event) => {
        this.loading = event.action === LoadingAction.START;
        console.log(this.loading);
      },
    );
  }

  ngAfterViewInit(): void {
    // check if a custom loader is defined
    this.hasCustomLoadingSpinner = 0 !== this.customLoadingWrapper.nativeElement.childElementCount;
  }
}
@Component({
  selector: 'drm-loaded-content',
  template: '<ng-content></ng-content>',
  styles: [],
})
export class LoadedContentComponent {}

@Component({
  selector: 'drm-custom-loading-spinner',
  template: '<ng-content></ng-content>',
  styles: [],
})
export class CustomLoadingSpinnerComponent {}
