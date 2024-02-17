import { inject, Injectable, Signal } from '@angular/core';
import { TokenService } from '@shared/token/token.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type TokenResponse = { token: string, refresh: string };

export type LoginPayload = { username: string, password: string, stayLogged: boolean };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenService: TokenService = inject(TokenService);
  readonly hasToken: Signal<boolean> = this.tokenService.hasToken;
  readonly isLogged: Signal<boolean> = this.tokenService.hasToken;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly refreshToken: Signal<string | null> = this.tokenService.refreshToken;

  login(credentials: LoginPayload): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`api/login`, credentials).pipe(
      tap((response) => {
        this.tokenService.setStayLogged(credentials.stayLogged);
        this.storeTokens(response);
      }),
    );
  }

  refresh(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`api/token`, { refresh: this.refreshToken() }, { headers: {
      'X-Access-Token': this.tokenService.token()!,
    } }).pipe(
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
