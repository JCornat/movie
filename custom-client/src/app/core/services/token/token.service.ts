import { effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { LocalStorageToken } from '../../injection-tokens/local-storage.token';

const tokenKey = 'token' as const;
const refreshTokenKey = 'refreshToken' as const;

export type TokenLocalStorageKey = typeof tokenKey | typeof refreshTokenKey;
type Token = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  readonly token: Signal<Token>;
  readonly refreshToken: Signal<Token>;
  //#region Injection
  private readonly storageService: Storage = inject(LocalStorageToken);
  //#endregion
  private readonly _token: WritableSignal<Token>;
  private readonly _refreshToken: WritableSignal<Token>;

  constructor() {
    effect(() => {
      const token = this._token();
      this.store(tokenKey, token);
    });
    effect(() => {
      const refreshToken = this._refreshToken();
      this.store(refreshTokenKey, refreshToken);
    });
    this._token = signal(this.storageService.getItem(tokenKey));
    this._refreshToken = signal(this.storageService.getItem(refreshTokenKey));
    this.token = this._token.asReadonly();
    this.refreshToken = this._refreshToken.asReadonly();
  }

  public setToken(token: Token): void {
    this._token.set(token);
  }

  public setRefreshToken(token: Token): void {
    this._refreshToken.set(token);
  }

  public reset(): void {
    this.remove(tokenKey);
    this.remove(refreshTokenKey);
  }

  private store(key: TokenLocalStorageKey, token: Token): void {
    if (token) {
      this.storageService.setItem(key, token);
    } else {
      this.storageService.removeItem(key);
    }
  }

  private remove(key: TokenLocalStorageKey): void {
    this.storageService.removeItem(key);
  }
}
