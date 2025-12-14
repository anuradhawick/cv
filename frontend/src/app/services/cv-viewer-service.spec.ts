import { TestBed } from '@angular/core/testing';

import { CvViewerService } from './cv-viewer-service';

describe('CvViewerService', () => {
  let service: CvViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
