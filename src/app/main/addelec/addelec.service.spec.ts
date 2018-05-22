import { TestBed, inject } from '@angular/core/testing';

import { AddelecService } from './addelec.service';

describe('AddelecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddelecService]
    });
  });

  it('should be created', inject([AddelecService], (service: AddelecService) => {
    expect(service).toBeTruthy();
  }));
});
