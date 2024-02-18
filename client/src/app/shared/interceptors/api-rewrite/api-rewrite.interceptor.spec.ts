import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '@shared/config/config.provider';
import { apiRewriteInterceptor } from '@shared/interceptors/api-rewrite/api-rewrite.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

describe('ApiRewriteInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_CONFIG, useValue: { SERVER_URL: 'server-url' } }, provideHttpClient(withInterceptors([apiRewriteInterceptor])), provideHttpClientTesting()],
    });

    client = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should rewrite url starting with api keyword', () => {
    client.get('api/test').subscribe();
    httpTestingController.expectNone('api/test');
    const req = httpTestingController.expectOne('server-url/api/test');
    req.flush(null);
  });

  it('should not rewrite url not starting with api keyword', () => {
    client.get('other/test').subscribe();
    httpTestingController.expectNone('server-url/api/test');
    const req = httpTestingController.expectOne('other/test');
    req.flush(null);
  });
});
