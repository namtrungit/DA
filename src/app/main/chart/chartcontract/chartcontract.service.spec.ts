import { TestBed, inject } from '@angular/core/testing';

import { ChartcontractService } from './chartcontract.service';

describe('ChartcontractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartcontractService]
    });
  });

  it('should be created', inject([ChartcontractService], (service: ChartcontractService) => {
    expect(service).toBeTruthy();
  }));
});
