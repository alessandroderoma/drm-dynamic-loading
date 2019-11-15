import { TestBed } from '@angular/core/testing';

import { DynamicLoadingService } from './dynamic-loading.service';

describe('DynamicLoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicLoadingService = TestBed.get(DynamicLoadingService);
    expect(service).toBeTruthy();
  });
});
