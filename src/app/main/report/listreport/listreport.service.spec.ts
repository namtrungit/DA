import { TestBed, inject } from '@angular/core/testing';

import { ListreportService } from './listreport.service';

describe('ListreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListreportService]
    });
  });

  it('should be created', inject([ListreportService], (service: ListreportService) => {
    expect(service).toBeTruthy();
  }));
});
