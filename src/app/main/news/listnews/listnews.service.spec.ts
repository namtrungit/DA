import { TestBed, inject } from '@angular/core/testing';

import { ListnewsService } from './listnews.service';

describe('ListnewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListnewsService]
    });
  });

  it('should be created', inject([ListnewsService], (service: ListnewsService) => {
    expect(service).toBeTruthy();
  }));
});
