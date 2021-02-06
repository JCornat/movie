import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

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

  public setToken(data: string): void {
    this._token = data;
    this.tokenSubject.next(this._token);

    const shouldSave = this.getStayLogged();
    if (shouldSave) {
      this.setStoredToken(this._token);
    }
  }

  public getRefreshToken(): string {
    return this._refreshToken;
  }

  public setRefreshToken(data: string): void {
    this._refreshToken = data;
    this.refreshTokenSubject.next(this._refreshToken);

    const shouldSave = this.getStayLogged();
    if (shouldSave) {
      this.storeRefreshToken(this._refreshToken);
    }
  }

  public reset(): void {
    this.setToken(null);
    this.setRefreshToken(null);

    this.storageService.clear();
  }

  public retrieveToken(): string | null {
    let token = this._token;

    if (!token) {
      token = this.getStoredToken();
    }

    return token;
  }

  public retrieveRefreshToken(): string | null {
    let refresh = this._refreshToken;

    if (!refresh) {
      refresh = this.getStoreRefreshToken();
    }

    return refresh;
  }

  public getStayLogged(): boolean {
    const tmp = this.storageService.getItem('stay-logged');
    return !!tmp;
  }

  public setStayLogged(value: string): void {
    this.storageService.setItem('stay-logged', value);
  }

  public removeStayLogged(): void {
    this.storageService.removeItem('stay-logged');
  }

  public getStoredToken(): string {
    return this.storageService.getItem('token');
  }

  public setStoredToken(value: string): void {
    this.storageService.setItem('token', value);
  }

  public async removeStoredToken(): Promise<any> {
    await this.storageService.removeItem('token');
  }

  public getStoreRefreshToken(): string {
    return this.storageService.getItem('refresh');
  }

  public storeRefreshToken(value: string): void {
    this.storageService.setItem('refresh', value);
  }

  public removeStoredRefreshToken(): void {
    this.storageService.removeItem('refresh');
  }
}
