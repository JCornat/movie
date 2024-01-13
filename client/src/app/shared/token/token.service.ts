import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Global } from '@shared/global/global';
import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token!: string | null;
  private _refreshToken!: string | null;
  hasToken: WritableSignal<boolean> = signal(false);
  private storageService = inject(StorageService);

  init(): void {
    this.initToken();
    this.initRefreshToken();
  }

  /*-----------------------*\
        Getter / Setter
  \*-----------------------*/

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    this.hasToken.set(Global.isPopulated(value));

    const shouldSave = this.getStayLogged();
    if (shouldSave && value) {
      this.storeToken(value);
    }
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;

    const shouldSave = this.getStayLogged();
    if (shouldSave && value) {
      this.storeRefreshToken(value);
    }
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  reset(): void {
    this.removeStoredToken();
    this.removeStoredRefreshToken();
    this.removeStayLogged();
    this.token = null;
    this.refreshToken = null;
  }

  initToken(): void {
    let token = this._token;

    if (!token) {
      token = this.getStoredToken() as string;
    }

    this.token = token;
  }

  initRefreshToken(): void {
    let refresh = this._refreshToken;

    if (!refresh) {
      refresh = this.getStoreRefreshToken() as string;
    }

    this.refreshToken = refresh;
  }

  getStayLogged(): boolean {
    const tmp = this.storageService.getItem('stay-logged');
    return (tmp === 'true');
  }

  setStayLogged(value: string): void {
    this.storageService.setItem('stay-logged', value);
  }

  removeStayLogged(): void {
    this.storageService.removeItem('stay-logged');
  }

  getStoredToken(): string | null {
    return this.storageService.getItem('token');
  }

  storeToken(value: string): void {
    this.storageService.setItem('token', value);
  }

  removeStoredToken(): void {
    this.storageService.removeItem('token');
  }

  getStoreRefreshToken(): string | null {
    return this.storageService.getItem('refresh-token');
  }

  storeRefreshToken(value: string): void {
    this.storageService.setItem('refresh-token', value);
  }

  removeStoredRefreshToken(): void {
    this.storageService.removeItem('refresh-token');
  }

  decode(): any {
    const token = this.token;
    if (!token) {
      return null;
    }

    const data = jwtDecode(token) as any;
    data.token = token; // Add original token inside object, to keep trace

    return data;
  }
}
