import { TestBed, inject } from '@angular/core/testing';

import { ElecService } from './elec.service';

describe('ElecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElecService]
    });
  });

  it('should be created', inject([ElecService], (service: ElecService) => {
    expect(service).toBeTruthy();
  }));
});
