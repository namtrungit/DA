import { TestBed, inject } from '@angular/core/testing';

import { SturegisterService } from './sturegister.service';

describe('SturegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SturegisterService]
    });
  });

  it('should be created', inject([SturegisterService], (service: SturegisterService) => {
    expect(service).toBeTruthy();
  }));
});
