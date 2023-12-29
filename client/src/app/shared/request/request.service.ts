import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, catchError, timeout } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '@shared/token/token.service';
import { Request } from './request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  currentServer!: string;
  timeout: number = 50000;
  http = inject(HttpClient);
  injector = inject(Injector);
  tokenService = inject(TokenService);

  get(options: Request): Observable<any> {
    const requestOptions = {
      method: 'get',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  post(options: Request): Observable<any> {
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

  put(options: Request): Observable<any> {
    const requestOptions = {
      method: 'put',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  delete(options: Request): Observable<any> {
    const requestOptions = {
      method: 'delete',
      ...options,
    };

    return this.requestBuilder(requestOptions)
      .pipe(catchError((error) => {
        return this.intercept(error, requestOptions);
      }));
  }

  private requestBuilder(options: Request): any {
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
    const requestOptions: {
      [key: string]: any;
    } = {
      headers: this.getHeaders(header),
      params: null,
      reportProgress: null,
      responseType: null,
    };

    if (options && options.header && options.header.responseType) {
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
          this.tokenService.token = res.token;
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

  navigateLogout(): void {
    const route = ['/logout'];
    this.injector.get(Router).navigate(route);
  }

  refreshToken(): Observable<any> {
    const refresh = this.tokenService.refreshToken;
    if (!refresh) {
      this.navigateLogout();
      throw new Error('NO REFRESH TOKEN');
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
      const token = this.tokenService.token;
      if (!token && !data?.optionalAuthentication) { // If there is no token, and authentication is not optional (not optional by default), cancel request
        throw new Error('Authentification requise');
      }

      if (token) { // Add X-Access-Token only if token is populated
        headers = headers.append('X-Access-Token', token);
      }
    }

    return headers;
  }

  private getTimeout(parameters: any): number {
    let timeoutValue = this.timeout;

    if (parameters) {
      if (parameters.timeout) {
        timeoutValue = parameters.timeout;
        delete parameters.timeout;
      }
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

  download(url: string, fileName?: string): void {
    const xhr = new XMLHttpRequest();

    xhr.onloadstart = () => {
      xhr.responseType = 'blob';
    };

    xhr.onload = () => {
      const blob = new Blob([xhr.response], { type: 'application/pdf' });
      if ((navigator as any).msSaveOrOpenBlob) {
        (navigator as any).msSaveOrOpenBlob(blob, fileName || name);
      } else {
        const element: any = document.createElement('a');
        element.style.position = 'absolute';
        element.style.height = '1px';
        element.style.width = '1px';
        element.style.zIndex = '-999';
        element.style.top = '1px';
        element.style.left = '1px';
        document.body.appendChild(element);

        const url2 = window.URL.createObjectURL(blob);
        element.href = url2;

        const tmp = url.split('/');
        const name = tmp[tmp.length - 1];
        element.download = fileName || name;

        element.click();
        window.URL.revokeObjectURL(url2);
        document.body.removeChild(element);
      }
    };

    xhr.open('GET', url);
    xhr.send();
  }

  upload(url: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      formData.append('uploads[]', file, file.name);

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        switch (xhr.readyState) { // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
          case 1: // OPEN
            break;
          case 4: // DONE
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject(xhr.response);
            }

            xhr = null as any;
            break;
          default:
            break;
        }
      };

      xhr.open('POST', url, true);
      if (this.tokenService.token) {
        xhr.setRequestHeader('X-Access-Token', this.tokenService.token);
      }

      xhr.send(formData);
    });
  }

  getMobileOperatingSystem(): string {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'iOS';
    }

    return 'unknown';
  }
}
