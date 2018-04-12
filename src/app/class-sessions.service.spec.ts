import { TestBed, inject } from '@angular/core/testing';

import { ClassSessionsService } from './class-sessions.service';

describe('ClassSessionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassSessionsService]
    });
  });

  it('should be created', inject([ClassSessionsService], (service: ClassSessionsService) => {
    expect(service).toBeTruthy();
  }));
});
