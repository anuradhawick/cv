import { TestBed } from '@angular/core/testing';

import { CitationsService } from './citations-service';

describe('CitationsService', () => {
  let service: CitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
