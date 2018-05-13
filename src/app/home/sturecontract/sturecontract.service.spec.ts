import { TestBed, inject } from '@angular/core/testing';

import { SturecontractService } from './sturecontract.service';

describe('SturecontractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SturecontractService]
    });
  });

  it('should be created', inject([SturecontractService], (service: SturecontractService) => {
    expect(service).toBeTruthy();
  }));
});
