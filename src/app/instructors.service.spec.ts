import { TestBed, inject } from '@angular/core/testing';

import { InstructorsService } from './instructors.service';

describe('AddressesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructorsService]
    });
  });

  it('should be created', inject([InstructorsService], (service: InstructorsService) => {
    expect(service).toBeTruthy();
  }));
});
