import { TestBed } from '@angular/core/testing';

import { MovieServiceAgent } from './movie.service-agent';

describe('MovieServiceAgent', () => {
  let service: MovieServiceAgent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieServiceAgent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
