import { TestBed, inject } from '@angular/core/testing';

import { SkusService } from './skus.service';

describe('SkuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkusService]
    });
  });

  it('should be created', inject([SkusService], (service: SkusService) => {
    expect(service).toBeTruthy();
  }));
});
