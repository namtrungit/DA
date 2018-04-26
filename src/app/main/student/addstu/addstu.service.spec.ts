import { TestBed, inject } from '@angular/core/testing';

import { AddstuService } from './addstu.service';

describe('AddstuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddstuService]
    });
  });

  it('should be created', inject([AddstuService], (service: AddstuService) => {
    expect(service).toBeTruthy();
  }));
});
