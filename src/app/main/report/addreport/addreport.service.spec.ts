import { TestBed, inject } from '@angular/core/testing';

import { AddreportService } from './addreport.service';

describe('AddreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddreportService]
    });
  });

  it('should be created', inject([AddreportService], (service: AddreportService) => {
    expect(service).toBeTruthy();
  }));
});
