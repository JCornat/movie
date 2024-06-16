import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Global } from '@shared/global/global';
import { StorageService } from '@shared/storage/storage.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private storageService = inject(StorageService);

  readonly stayLogged = this.#buildStayLogged();
  readonly #token = this.#buildToken();
  readonly token = this.#token.asReadonly();
  readonly #refreshToken = this.#buildRefreshToken();
  readonly refreshToken = this.#refreshToken.asReadonly();
  readonly hasToken = computed(() => {
    return Global.isPopulated(this.token());
  });

  constructor() {
    this.#subscribeToken();
    this.#subscribeRefreshToken();
    this.#subscribeStayLogged();
  }

  //region Method
  setToken(value: string | null): void {
    this.#token.set(value);
  }

  setRefreshToken(value: string | null): void {
    this.#refreshToken.set(value);
  }

  #buildToken(): WritableSignal<string | null> {
    const data = this.#getStoredToken();
    return signal(data);
  }

  #buildRefreshToken(): WritableSignal<string | null> {
    const data = this.#getStoreRefreshToken();
    return signal(data);
  }

  #buildStayLogged(): WritableSignal<boolean> {
    const data = this.#getStayLogged();
    return signal(data);
  }

  reset(): void {
    this.#removeStoredToken();
    this.#removeStoredRefreshToken();
    this.#removeStayLogged();
    this.setToken(null);
    this.setRefreshToken(null);
  }

  #getStayLogged(): boolean {
    const tmp = this.storageService.getItem('stay-logged');
    return (tmp === 'true');
  }

  #setStayLogged(value: string): void {
    this.storageService.setItem('stay-logged', value);
  }

  #removeStayLogged(): void {
    this.storageService.removeItem('stay-logged');
  }

  #getStoredToken(): string | null {
    return this.storageService.getItem('token');
  }

  #storeToken(value: string): void {
    this.storageService.setItem('token', value);
  }

  #removeStoredToken(): void {
    this.storageService.removeItem('token');
  }

  #getStoreRefreshToken(): string | null {
    return this.storageService.getItem('refresh-token');
  }

  #storeRefreshToken(value: string): void {
    this.storageService.setItem('refresh-token', value);
  }

  #removeStoredRefreshToken(): void {
    this.storageService.removeItem('refresh-token');
  }

  decode(): any {
    const token = this.token();
    if (!token) {
      return null;
    }

    const data = jwtDecode(token) as any;
    data.token = token; // Add original token inside object, to keep trace

    return data;
  }
  //endregion

  //region Subscribe
  #subscribeToken() {
    toObservable(this.token)
      .subscribe((value) => {
        if (!value || !this.stayLogged()) {
          return;
        }

        this.#storeToken(value);
      });
  }

  #subscribeRefreshToken() {
    toObservable(this.refreshToken)
      .subscribe((value) => {
        if (!value || !this.stayLogged()) {
          return;
        }

        this.#storeRefreshToken(value);
      });
  }

  #subscribeStayLogged() {
    toObservable(this.stayLogged)
      .subscribe((value) => {
        if (value) {
          this.#setStayLogged('true');
        } else {
          this.#removeStayLogged();
        }
      });
  }
  //endregion
}
