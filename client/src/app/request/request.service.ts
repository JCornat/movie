import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, catchError, timeout } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from './request';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public currentServer: string;

  constructor(
    public http: HttpClient,
    public injector: Injector,
    public tokenService: TokenService,
  ) {
    //
  }

  public get(options: Request): Observable<any> {
    const requestOptions = {
      method: 'get',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  public post(options: Request): Observable<any> {
    const requestOptions = {
      method: 'post',
      ...options,
    };

    if (options.body && options.body.file) {
      requestOptions.method = 'request';

      const formData = new FormData();
      formData.append('uploadFile', options.body.file, options.body.file.name);
      requestOptions.body.file = formData;
    }

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  public put(options: Request): Observable<any> {
    const requestOptions = {
      method: 'put',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  public delete(options: Request): Observable<any> {
    const requestOptions = {
      method: 'delete',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  private requestBuilder(options?: Request): any {
    const timeoutValue = this.getTimeout(options.header);
    const method = options.method;
    const body = options.body;
    const header = options.header;
    let url = options.url;

    // If url starts by "/", prepend current server
    if (url[0] === '/') {
      url = `${this.currentServer}${url}`;
    }

    const params: any[] = [];
    const requestOptions = {
      headers: this.getHeaders(header),
      params: null,
      reportProgress: null,
      responseType: null,
    };

    if (options.header?.responseType) {
      requestOptions.responseType = options.header.responseType;
    } else {
      requestOptions.responseType = 'json';
    }

    switch (method) {
      case 'get':
      case 'delete':
        requestOptions.params = this.getParams(body);
        params.push(url, requestOptions);
        break;
      case 'post':
      case 'put':
        params.push(url, body, requestOptions);
        break;
      case 'request':
        requestOptions.params = this.getParams(body);
        requestOptions.reportProgress = true;
        const httpRequest = new HttpRequest('POST', url, body.file, requestOptions);
        params.push(httpRequest);
        break;
      default:
        throw new Error(`UNSUPPORTED METHOD ${method}`);
    }

    return (this.http[method] as any)(...params)
      .pipe(timeout(timeoutValue));
  }

  private intercept(error: any, replay?: Request): any {
    if (replay && error.error === 'TokenExpiredError') {
      return this.refreshToken()
        .pipe(flatMap((res) => {
          this.tokenService.setToken(res.token);
          return this.requestBuilder(replay);
        }), catchError((error2): any => {
          this.intercept(error2);
        }));
    }

    let message;

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        message = `Session expirée, veuillez vous reconnecter`;
        this.navigateLogout();
      } else if (error.status === 502) {
        message = `Serveur en cours de maintenance`;
      } else if (error.status === 0) {
        message = `Serveur injoignable, vérifiez votre réseau`;
      }
    } else if (error.name === 'TimeoutError') {
      message = `Temps d'attente expiré, requête annulée`;
    }

    throw new Error(message || error.error || error.message || error);
  }

  public navigateLogout(): void {
    const route = ['/logout'];
    this.injector.get(Router).navigate(route);
  }

  public refreshToken(): Observable<any> {
    const refresh = this.tokenService.getRefreshToken();
    if (!refresh) {
      this.navigateLogout();
      return;
    }

    const options = {
      url: `/api/token`,
      body: {
        refresh,
      },
    };

    return this.post(options);
  }

  private getHeaders(data: any): HttpHeaders {
    let headers: any = new HttpHeaders();

    if (!data?.disableAuthentication) { // If authentication is not disabled (enabled by default), get token
      const token = this.tokenService.getToken();
      if (!token && !data?.optionalAuthentication) { // If there is no token, and authentication is not optional (not optional by default), cancel request
        throw new Error('Authentification requise');
      }

      if (token) { // Add X-Access-Token only if token is populated
        headers = headers.append('X-Access-Token', token);
      }
    }

    return headers;
  }

  private getTimeout(parameters: Request['header']): number {
    let timeoutValue = 15000;

    if (parameters?.timeout) {
      timeoutValue = parameters.timeout;
      delete parameters.timeout;
    }

    return timeoutValue;
  }

  private getParams(body: any): HttpParams {
    let params = new HttpParams();

    if (body) {
      for (const item of Object.keys(body)) {
        if (body[item] === undefined) {
          continue;
        }

        if (item === 'file') { // Skip this, because it is a file upload from post request
          continue;
        }

        if (Array.isArray(body[item])) {
          params = params.set(item, JSON.stringify(body[item]));
        } else {
          params = params.set(item, body[item]);
        }
      }
    }

    return params;
  }
}
