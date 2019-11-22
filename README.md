# drm-dynamic-loading

Angular component for showing loading spinners.

### Usage

Add module declaration in your module:

```typescript
import { DynamicLoadingModule } from 'drm-dynamic-loading';

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
<!-- declare the spinner -->
<drm-dynamic-loading component="component1">
  <!-- 
      here goes the content once it's been loaded,
      it will appear once this loader is disabled
   -->
  <drm-loaded-content>component1</drm-loaded-content>
</drm-dynamic-loading>
```

Import the service:

```typescript
import { DynamicLoadingService } from 'drm-dynamic-loading';
```

Inject the service in your component and use it to start/stop loading:

```typescript
// this will start loading spinner for "component1": <drm-dynamic-loading component="component1">
loadingService.startLoading('component1');
// ... do heavy work here
loadingService.stopLoading('component1');
```

By default, it will create a blue android-style spinner.

### Options

You can edit spinner's color like that:

```html
<!-- this changes the spinner color to red. Use any html color you like -->
<drm-dynamic-loading component="component1" color="red"></drm-dynamic-loading>
```

You can specify a custom spinner if you don't like the default one:

```html
<drm-dynamic-loading component="component1">
  <drm-loaded-content>component1</drm-loaded-content>
  <!--
      this is for custom spinners - they are not styled by default,
      so you need to provide your own styling.
  -->
  <drm-custom-loading-spinner>
    <!-- oyyyy avocados!! -->
    <img src="https://media.giphy.com/media/13gvXfEVlxQjDO/giphy.gif" width="100">
  </drm-custom-loading-spinner>
</drm-dynamic-loading>
```

You can specify a global loader. Global loaders keep loading until no specific
components are loading anymore.

Example:

```typescript
loadingService.startLoading('component1'); // global loader starts loading
loadingService.startLoading('component2'); // global loader keeps loading
loadingService.startLoading('component3'); // global loader keeps loading
loadingService.stopLoading('component1'); // component2 and component3 are still loading, global loader keeps loading
loadingService.stopLoading('component2'); // component3 is still loading, global loader keeps loading
loadingService.stopLoading('component3'); // all components finished loading, global loader stops loading
```

A loader without a `component` is global by default:

```html
<!-- this is global -->
<drm-dynamic-loading></drm-dynamic-loading>
```

However, if you want to make it global verbosely for the sake of clarity, use:

```html
<!-- this is global -->
<drm-dynamic-loading [global]="true"></drm-dynamic-loading>
```

###### Options:

 - `component`: the component to listen for updates on loading state.
 - `global`: whether the spinner is global or not. Defaults to `false` if a `component` is specified, `true` otherwise.
 - `color`: spinner path color, supports any html color
 - `backgroundColor`: background color, supports any html color
 - `showContentWhenLoading`: if `true` doesn't hide the content while loading. Defaults to `false`.
 - `stylePosition`: CSS position. Can be `static`, `relative`, `fixed`, `absolute`, `sticky`. Defaults to `relative`.
 - `zIndex`: CSS z-index for spinner only, useful when your element already has an high zIndex and you want to place the spinner over it. Defaults to `auto`.

For a demo, download clone the project on github and run `ng s -o`.
