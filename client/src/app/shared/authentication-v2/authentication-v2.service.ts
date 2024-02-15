import { inject, Injectable, Signal } from '@angular/core';
import { TokenService } from '@shared/token/token.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type TokenResponse = { token: string, refresh: string };

export type LoginPayload = { username: string, password: string, stayLogged: boolean };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationV2Service {
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly refreshToken: Signal<string | null> = this.tokenService.refreshToken;

  login(credentials: LoginPayload): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`api/login`, credentials).pipe(
      tap((response) => {
        this.storeTokens(response);
      }),
    );
  }

  refresh(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`api/token`, { refresh: this.refreshToken() }).pipe(
      tap((response) => {
        this.storeTokens(response);
      }),
    );
  }

  logout(): void {
    this.tokenService.reset();
  }

  private storeTokens(response: TokenResponse): void {
    this.tokenService.setToken(response.token);
    this.tokenService.setRefreshToken(response.refresh);
  }
}
