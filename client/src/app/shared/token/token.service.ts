import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import jwtDecode from 'jwt-decode';

import * as Global from '@shared/global/global';

import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token!: string | null;
  private _refreshToken!: string | null;
  public hasToken: WritableSignal<boolean> = signal(false);
  private storageService = inject(StorageService);

  public init(): void {
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

  public reset(): void {
    this.removeStoredToken();
    this.removeStoredRefreshToken();
  }

  public initToken(): void {
    let token = this._token;

    if (!token) {
      token = this.getStoredToken() as string;
    }

    this.token = token;
  }

  public initRefreshToken(): void {
    let refresh = this._refreshToken;

    if (!refresh) {
      refresh = this.getStoreRefreshToken() as string;
    }

    this.refreshToken = refresh;
  }

  public getStayLogged(): boolean {
    const tmp = this.storageService.getItem('stay-logged');
    return (tmp === 'true');
  }

  public setStayLogged(value: string): void {
    this.storageService.setItem('stay-logged', value);
  }

  public removeStayLogged(): void {
    this.storageService.removeItem('stay-logged');
  }

  public getStoredToken(): string | null {
    return this.storageService.getItem('token');
  }

  public storeToken(value: string): void {
    this.storageService.setItem('token', value);
  }

  public removeStoredToken(): void {
    this.storageService.removeItem('token');
  }

  public getStoreRefreshToken(): string | null {
    return this.storageService.getItem('refresh-token');
  }

  public storeRefreshToken(value: string): void {
    this.storageService.setItem('refresh-token', value);
  }

  public removeStoredRefreshToken(): void {
    this.storageService.removeItem('refresh-token');
  }

  public decode(): any {
    const token = this.token;
    if (!token) {
      return null;
    }

    const data = jwtDecode(token) as any;
    data.token = token; // Add original token inside object, to keep trace

    return data;
  }
}
