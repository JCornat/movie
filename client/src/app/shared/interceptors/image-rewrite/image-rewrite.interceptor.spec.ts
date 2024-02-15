import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '@shared/config/config.provider';
import { imageRewriteInterceptor } from '@shared/interceptors/image-rewrite/image-rewrite.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

describe('ImageRewriteInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_CONFIG, useValue: { SERVER_URL: 'server-url' } }, provideHttpClient(withInterceptors([imageRewriteInterceptor])), provideHttpClientTesting()],
    });

    client = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should rewrite url starting with image keyword', () => {
    client.get('image/test').subscribe();
    httpTestingController.expectNone('image/test');
    const req = httpTestingController.expectOne('server-url/image/test');
    req.flush(null);
  });

  it('should not rewrite url not starting with image keyword', () => {
    client.get('other/test').subscribe();
    httpTestingController.expectNone('server-url/image/test');
    const req = httpTestingController.expectOne('other/test');
    req.flush(null);
  });
});
