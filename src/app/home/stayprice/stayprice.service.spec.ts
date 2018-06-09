import { TestBed, inject } from '@angular/core/testing';

import { StaypriceService } from './stayprice.service';

describe('StaypriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaypriceService]
    });
  });

  it('should be created', inject([StaypriceService], (service: StaypriceService) => {
    expect(service).toBeTruthy();
  }));
});
