import { TestBed, inject } from '@angular/core/testing';

import { SturuleService } from './sturule.service';

describe('SturuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SturuleService]
    });
  });

  it('should be created', inject([SturuleService], (service: SturuleService) => {
    expect(service).toBeTruthy();
  }));
});
