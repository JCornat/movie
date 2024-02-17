import { TestBed } from '@angular/core/testing';

import { UploadApiService } from './upload-api.service';

describe('UploadApiService', () => {
  let service: UploadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
