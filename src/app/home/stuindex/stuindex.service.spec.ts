import { TestBed, inject } from '@angular/core/testing';

import { StuindexService } from './stuindex.service';

describe('StuindexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StuindexService]
    });
  });

  it('should be created', inject([StuindexService], (service: StuindexService) => {
    expect(service).toBeTruthy();
  }));
});
