import { TestBed, inject } from '@angular/core/testing';

import { DiselecService } from './diselec.service';

describe('DiselecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiselecService]
    });
  });

  it('should be created', inject([DiselecService], (service: DiselecService) => {
    expect(service).toBeTruthy();
  }));
});
