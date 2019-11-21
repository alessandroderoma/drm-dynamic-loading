import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { globalMetaComponent, LoadingAction, LoadingCallback, LoadingEvent } from './common';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadingService {
  private eventStream: Subject<LoadingEvent> = new Subject<LoadingEvent>();
  private componentsLoading: Set<string> = new Set<string>();

  constructor() { }

  public startLoading(component?: string) {
    this.eventStream.next(createStartEvent(globalMetaComponent));
    this.eventStream.next(createStartEvent(component));
    this.componentsLoading.add(component);
  }

  public stopLoading(component?: string) {
    this.eventStream.next(createStopEvent(component));
    this.componentsLoading.delete(component);

    if (this.componentsLoading.size === 0) {
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
    // if the component was already loading before subscribing, call the callback
    if (
      this.componentsLoading.has(component)
    ) {
      callback(createStartEvent(component));
    }
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
    // if the component was already loading before subscribing, call the callback
    if (
      action === LoadingAction.START &&
      this.componentsLoading.has(component)
    ) {
      callback();
    }
  }

  public onStartLoading(component, callback: () => void) {
    this.subscribeOnAction(component, LoadingAction.START, callback);
  }

  public onStopLoading(component, callback: () => void) {
    this.subscribeOnAction(component, LoadingAction.STOP, callback);
  }
}

const createEvent = (component: string, action: LoadingAction): LoadingEvent => ({ component, action });
const createStartEvent = (component: string): LoadingEvent => createEvent(component, LoadingAction.START);
const createStopEvent = (component: string): LoadingEvent => createEvent(component, LoadingAction.STOP);
