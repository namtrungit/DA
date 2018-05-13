import { TestBed, inject } from '@angular/core/testing';

import { AddbillService } from './addbill.service';

describe('AddbillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddbillService]
    });
  });

  it('should be created', inject([AddbillService], (service: AddbillService) => {
    expect(service).toBeTruthy();
  }));
});
