import { TestBed, inject } from '@angular/core/testing';

import { EnelecService } from './enelec.service';

describe('EnelecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnelecService]
    });
  });

  it('should be created', inject([EnelecService], (service: EnelecService) => {
    expect(service).toBeTruthy();
  }));
});
