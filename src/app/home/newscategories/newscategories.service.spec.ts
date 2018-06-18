import { TestBed, inject } from '@angular/core/testing';

import { NewscategoriesService } from './newscategories.service';

describe('NewscategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewscategoriesService]
    });
  });

  it('should be created', inject([NewscategoriesService], (service: NewscategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
