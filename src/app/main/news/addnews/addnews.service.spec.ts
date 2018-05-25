import { TestBed, inject } from '@angular/core/testing';

import { AddnewsService } from './addnews.service';

describe('AddnewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddnewsService]
    });
  });

  it('should be created', inject([AddnewsService], (service: AddnewsService) => {
    expect(service).toBeTruthy();
  }));
});
