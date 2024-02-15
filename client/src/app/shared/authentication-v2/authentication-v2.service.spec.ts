import { TestBed } from '@angular/core/testing';

import { AuthenticationV2Service, LoginPayload, TokenResponse } from './authentication-v2.service';
import { TokenService } from '@shared/token/token.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { signal, Signal } from '@angular/core';
import Mock = jest.Mock;

describe('AuthenticationV2Service', () => {
  let service: AuthenticationV2Service;
  let tokenServiceMock: {
    setToken: Mock;
    setRefreshToken: Mock;
    reset: Mock;
    refreshToken: Signal<string | null>;
  };
  let httpTestingController: HttpTestingController;
  let tokenResponse: TokenResponse;

  beforeEach(() => {
    tokenResponse = { token: 'token', refresh: 'refresh' };
    tokenServiceMock = {
      setToken: jest.fn(),
      setRefreshToken: jest.fn(),
      reset: jest.fn(),
      refreshToken: signal(tokenResponse.refresh),
    };

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: TokenService, useValue: tokenServiceMock }],
    });
    service = TestBed.inject(AuthenticationV2Service);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    const credentials: LoginPayload = {
      username: 'username',
      password: 'password',
      stayLogged: true,
    };

    it('should call correct url', () => {
      service.login(credentials).subscribe();
      const req = httpTestingController.expectOne('api/login');
      req.flush(tokenResponse);
      expect(req.request.method).toEqual('POST');
    });

    it('should send correct body', () => {
      service.login(credentials).subscribe();
      const req = httpTestingController.expectOne('api/login');
      req.flush(tokenResponse);
      expect(req.request.body).toEqual(credentials);
    });

    it('should store tokens', () => {
      expect.assertions(2);
      service.login(credentials).subscribe(() => {
        expect(tokenServiceMock.setToken).toHaveBeenCalledWith(tokenResponse.token);
        expect(tokenServiceMock.setRefreshToken).toHaveBeenCalledWith(tokenResponse.refresh);
      });
      const req = httpTestingController.expectOne('api/login');
      req.flush(tokenResponse);
    });
  });

  describe('refresh()', () => {
    it('should call correct url', () => {
      service.refresh().subscribe();
      const req = httpTestingController.expectOne('api/token');
      req.flush(tokenResponse);
      expect(req.request.method).toEqual('POST');
    });

    it('should send correct body', () => {
      service.refresh().subscribe();
      const req = httpTestingController.expectOne('api/token');
      req.flush(tokenResponse);
      expect(req.request.body).toEqual({ refresh: tokenResponse.refresh });
    });

    it('should store tokens', () => {
      expect.assertions(2);
      service.refresh().subscribe(() => {
        expect(tokenServiceMock.setToken).toHaveBeenCalledWith(tokenResponse.token);
        expect(tokenServiceMock.setRefreshToken).toHaveBeenCalledWith(tokenResponse.refresh);
      });
      const req = httpTestingController.expectOne('api/token');
      req.flush(tokenResponse);
    });
  });

  describe('logout()', () => {
    it('should reset tokens', () => {
      service.logout();
      expect(tokenServiceMock.reset).toHaveBeenCalled();
    });
  });
});
