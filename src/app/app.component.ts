import { Component } from '@angular/core';
import { DynamicLoadingService } from 'dynamic-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dynamic-loading';
  loading = false;

  constructor(
    private loadingService: DynamicLoadingService,
  ) {}


  startLoading(component?: string) {
    if (!component) {
      for (let i = 1; i <= 6; i++) {
        this.startLoading(`component${i}`);
      }
      return;
    }
    setTimeout(
      () => {
        this.loadingService.startLoading(component);
        setTimeout(
          () => {
            this.loadingService.stopLoading(component);
          },
          Math.random() * 3000 + 2000
        );
      },
      Math.random() * 1500
    );
  }
}
