import { TestBed, inject } from '@angular/core/testing';

import { ContractregService } from './contractreg.service';

describe('ContractregService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractregService]
    });
  });

  it('should be created', inject([ContractregService], (service: ContractregService) => {
    expect(service).toBeTruthy();
  }));
});
