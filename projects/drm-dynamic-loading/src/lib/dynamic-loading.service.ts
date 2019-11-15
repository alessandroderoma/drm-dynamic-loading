import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { globalMetaComponent, LoadingAction, LoadingCallback, LoadingEvent } from './common';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadingService {
  private eventStream: Subject<LoadingEvent> = new Subject<LoadingEvent>();
  private componentsLoading: Set<string> = new Set<string>();
  private notifiedStartEvent = false;

  constructor() { }

  public startLoading(component?: string) {
    if (!this.notifiedStartEvent) {
      this.eventStream.next(createStartEvent(globalMetaComponent));
      this.notifiedStartEvent = true;
    }
    this.eventStream.next(createStartEvent(component));
    this.componentsLoading.add(component);
  }

  public stopLoading(component?: string) {
    this.eventStream.next(createStopEvent(component));
    this.componentsLoading.delete(component);

    if (this.componentsLoading.size === 0) {
      this.notifiedStartEvent = false;
      this.eventStream.next(createStopEvent(globalMetaComponent));
    }
  }

  public subscribe(component: string, callback: LoadingCallback) {
    this.eventStream.subscribe(
      (event: LoadingEvent) => {
        if (event.component === component) {
          callback(event);
        }
      }
    );
  }

  private subscribeOnAction(component: string, action: LoadingAction, callback: () => void) {
    this.subscribe(
      component,
      (event: LoadingEvent) => {
        if (event.action === action) {
          callback();
        }
      }
    );
  }

  public onStartLoading(component, callback: () => void) {
    this.subscribeOnAction(component, LoadingAction.START, callback);
  }

  public onStopLoading(component, callback: () => void) {
    this.subscribeOnAction(component, LoadingAction.STOP, callback);
  }
}

const createStartEvent = (component: string): LoadingEvent => ({ component, action: LoadingAction.START });
const createStopEvent = (component: string): LoadingEvent => ({ component, action: LoadingAction.STOP });
