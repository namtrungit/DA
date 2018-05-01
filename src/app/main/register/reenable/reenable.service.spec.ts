import { TestBed, inject } from '@angular/core/testing';

import { ReenableService } from './reenable.service';

describe('ReenableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReenableService]
    });
  });

  it('should be created', inject([ReenableService], (service: ReenableService) => {
    expect(service).toBeTruthy();
  }));
});
