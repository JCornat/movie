import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AUTHENTICATION_REQUIRED_CONTEXT } from '@shared/authentication-required.context';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import { inject } from '@angular/core';
import { TokenService } from '@shared/token/token.service';
import { Observable, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(AUTHENTICATION_REQUIRED_CONTEXT)) {
    return next(req);
  }

  const authService: AuthenticationService = inject(AuthenticationService);
  if (!authService.hasToken()) {
    throw new Error('Unauthenticated');
  }

  const tokenService: TokenService = inject(TokenService);
  const token = tokenService.token()!;
  const tokenIsExpired = tokenService.tokenIsExpired();
  if (tokenIsExpired) {
    return authService.refresh().pipe(
      switchMap(({ token }) => addTokenToRequest(token, req, next)),
    );
  }

  return addTokenToRequest(token, req, next);
};

function addTokenToRequest(token: string, req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const clone = req.clone({
    headers: req.headers.append('X-Access-Token', token),
  });

  return next(clone);
}
