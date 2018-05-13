import { TestBed, inject } from '@angular/core/testing';

import { ListbillService } from './listbill.service';

describe('ListbillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListbillService]
    });
  });

  it('should be created', inject([ListbillService], (service: ListbillService) => {
    expect(service).toBeTruthy();
  }));
});
