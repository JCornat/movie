import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: any;
  private tokenSubject = new Subject<any>();
  public tokenObservable = this.tokenSubject.asObservable();

  private _refreshToken: any;
  private refreshTokenSubject = new Subject<any>();
  public refreshTokenObservable = this.refreshTokenSubject.asObservable();

  constructor(
    public route: ActivatedRoute,
    public storageService: StorageService,
  ) {
    //
  }

  public async init(): Promise<void> {
    this._token = await this.retrieveToken();
    this._refreshToken = await this.retrieveRefreshToken();
  }

  /*-----------------------*\
        Getter / Setter
  \*-----------------------*/

  public getToken(): string {
    return this._token;
  }

  public async setToken(data?: string): Promise<void> {
    this._token = data;
    this.tokenSubject.next(this._token);

    const stayLogged = await this.getStayLogged();
    if (stayLogged) {
      await this.setStoredToken(this._token);
    }
  }

  public getRefreshToken(): string {
    return this._refreshToken;
  }

  public async setRefreshToken(data?: string): Promise<void> {
    this._refreshToken = data;
    this.refreshTokenSubject.next(this._refreshToken);

    const shouldSave = await this.getStayLogged();
    if (shouldSave) {
      await this.storeRefreshToken(this._refreshToken);
    }
  }

  public hasToken(): boolean {
    const data = this.getToken();
    return !!data;
  }

  public async reset(): Promise<any> {
    await this.setToken();
    await this.setRefreshToken();

    await this.storageService.clear();
  }

  public async retrieveToken(): Promise<string | null> {
    let token = this._token;

    if (!token) {
      token = await this.getStoredToken();
    }

    return token;
  }

  public async retrieveRefreshToken(): Promise<string | null> {
    let refresh = this._refreshToken;

    if (!refresh) {
      refresh = await this.getStoreRefreshToken();
    }

    return refresh;
  }

  public async getStayLogged(): Promise<boolean> {
    const tmp = await this.storageService.getItem('stay-logged');
    return !!tmp;
  }

  public async setStayLogged(value: string): Promise<any> {
    await this.storageService.setItem('stay-logged', value);
  }

  public async removeStayLogged(): Promise<any> {
    await this.storageService.removeItem('stay-logged');
  }

  public async getStoredToken(): Promise<string> {
    return await this.storageService.getItem('token');
  }

  public async setStoredToken(value: string): Promise<any> {
    await this.storageService.setItem('token', value);
  }

  public async removeStoredToken(): Promise<any> {
    await this.storageService.removeItem('token');
  }

  public async getStoreRefreshToken(): Promise<string> {
    return this.storageService.getItem('refresh-token');
  }

  public async storeRefreshToken(value: string): Promise<any> {
    await this.storageService.setItem('refresh-token', value);
  }

  public async removeStoredRefreshToken(): Promise<any> {
    await this.storageService.removeItem('refresh-token');
  }

  public decode(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const data = jwtDecode(token) as any;
    data.token = token; // Add original token inside object, to keep trace

    return data;
  }
}
