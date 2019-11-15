/*
 * Public API Surface of drm-dynamic-loading
 */

export {
  DynamicLoadingService,
} from './lib/dynamic-loading.service';
export {
  CustomLoadingSpinnerComponent,
  DynamicLoadingComponent,
  LoadedContentComponent,
} from './lib/dynamic-loading.component';

export {
  LoadingAction,
  LoadingEvent,
  LoadingCallback,
} from './lib/common';

export {
  DynamicLoadingModule
} from './lib/dynamic-loading.module';
