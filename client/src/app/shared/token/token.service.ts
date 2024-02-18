import { computed, effect, inject, Injectable, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { Global } from '@shared/global/global';
import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private storageService = inject(StorageService);

  stayLogged = this.#buildStayLogged();
  #token = this.#buildToken();
  token = this.#token.asReadonly();
  #refreshToken = this.#buildRefreshToken();
  refreshToken = this.#refreshToken.asReadonly();
  hasToken = computed(() => {
    return Global.isPopulated(this.token());
  });

  readonly decodedToken: Signal<JwtPayload | null> = computed(() => {
    const token = this.token();
    if (!token) {
      return null;
    }

    return jwtDecode(token);
  });

  constructor() {
    this.#subscribeToken();
    this.#subscribeRefreshToken();
    this.#subscribeStayLogged();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  setToken(value: string | null): void {
    this.#token.set(value);
  }

  setRefreshToken(value: string | null): void {
    this.#refreshToken.set(value);
  }

  setStayLogged(value: boolean): void {
    this.stayLogged.set(value);
  }

  tokenIsExpired(): boolean {
    const decoded: JwtPayload | null = this.decodedToken();
    if (!decoded) {
      return false;
    }

    return (decoded.exp! * 1000) < new Date().getTime();
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

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  #subscribeToken() {
    effect(() => {
      const value = this.token();

      if (!value || untracked(() => !this.stayLogged())) {
        return;
      }

      this.#storeToken(value);
    });
  }

  #subscribeRefreshToken() {
    effect(() => {
      const value = this.refreshToken();

      if (!value || untracked(() => !this.stayLogged())) {
        return;
      }

      this.#storeRefreshToken(value);
    });
  }

  #subscribeStayLogged() {
    effect(() => {
      const value = this.stayLogged();
      if (value) {
        this.#setStayLogged('true');
      } else {
        this.#removeStayLogged();
      }
    });
  }
}
