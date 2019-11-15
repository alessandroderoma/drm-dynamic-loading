# drm-dynamic-loading

Angular component for showing loading spinners.

###Usage

Add module declaration in your module:

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicLoadingModule, // <- here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use the component:

```html
<drm-dynamic-loading component="component1">
  <drm-loaded-content>component1</drm-loaded-content>
</drm-dynamic-loading>
<!-- standard spinner with custom color (supports all html colors) -->
<drm-dynamic-loading component="component2" color="green">
  <drm-loaded-content>component2</drm-loaded-content>
</drm-dynamic-loading>
<drm-dynamic-loading component="component3">
  <drm-loaded-content>component3</drm-loaded-content>
</drm-dynamic-loading>
<drm-dynamic-loading component="component4">
  <drm-loaded-content>component4</drm-loaded-content>
</drm-dynamic-loading>
<drm-dynamic-loading component="component5">
  <drm-loaded-content>component5</drm-loaded-content>
</drm-dynamic-loading>
<drm-dynamic-loading component="component6">
  <drm-loaded-content>component6</drm-loaded-content>
  <!-- this is for custom loading spinners -->
  <drm-custom-loading-spinner>
    <img src="https://media.giphy.com/media/13gvXfEVlxQjDO/giphy.gif" width="100">
  </drm-custom-loading-spinner>
</drm-dynamic-loading>

<!-- this is global and starts when the first loader starts and ends when the last loader ends -->
<drm-dynamic-loading color="red"></drm-dynamic-loading>
```

Import the service:

```typescript
import { DynamicLoadingService } from drm-dynamic-loading;
```

Inject the service in your component and use it to start/stop loading:

```typescript
drm-dynamic-loading
loadingService.startLoading('component1');
// ... do heavy work here
loadingService.stopLoading('component1');
```
