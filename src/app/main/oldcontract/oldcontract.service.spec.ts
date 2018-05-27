import { TestBed, inject } from '@angular/core/testing';

import { OldcontractService } from './oldcontract.service';

describe('OldcontractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OldcontractService]
    });
  });

  it('should be created', inject([OldcontractService], (service: OldcontractService) => {
    expect(service).toBeTruthy();
  }));
});
