import { TestBed } from '@angular/core/testing';

import { UploadApiService } from './upload-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UploadApiService', () => {
  let service: UploadApiService;
  let httpTestingController: HttpTestingController;

  let file: File;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UploadApiService);
    httpTestingController = TestBed.inject(HttpTestingController);

    file = new File([], 'filename.jpg');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadFile', () => {
    it('should upload to correct url', () => {
      service.uploadFile(file).subscribe();
      const req = httpTestingController.expectOne('api/file');
      expect(req.request.method).toEqual('POST');
      req.flush('1');
    });

    it('should send correct body', () => {
      service.uploadFile(file).subscribe();
      const req = httpTestingController.expectOne('api/file');
      expect(req.request.body).toBeInstanceOf(FormData);
      expect((req.request.body as FormData).get('uploads[]')).toEqual(file);
      req.flush('1');
    });
  });
});
