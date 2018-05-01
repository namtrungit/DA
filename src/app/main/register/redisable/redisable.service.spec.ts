import { TestBed, inject } from '@angular/core/testing';

import { RedisableService } from './redisable.service';

describe('RedisableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedisableService]
    });
  });

  it('should be created', inject([RedisableService], (service: RedisableService) => {
    expect(service).toBeTruthy();
  }));
});
