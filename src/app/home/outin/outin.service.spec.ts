import { TestBed, inject } from '@angular/core/testing';

import { OutinService } from './outin.service';

describe('OutinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutinService]
    });
  });

  it('should be created', inject([OutinService], (service: OutinService) => {
    expect(service).toBeTruthy();
  }));
});
