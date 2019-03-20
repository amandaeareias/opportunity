import { TestBed } from '@angular/core/testing';

import { GoogleSearchService } from './google-search.service';

describe('GoogleSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleSearchService = TestBed.get(GoogleSearchService);
    expect(service).toBeTruthy();
  });
});
