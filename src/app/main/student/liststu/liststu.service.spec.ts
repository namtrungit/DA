import { TestBed, inject } from '@angular/core/testing';

import { ListstuService } from './liststu.service';

describe('ListstuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListstuService]
    });
  });

  it('should be created', inject([ListstuService], (service: ListstuService) => {
    expect(service).toBeTruthy();
  }));
});
