import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideConfig } from './core/config/config';
import { LocalStorageToken } from './core/injection-tokens/local-storage.token';
import { apiRewriteInterceptor } from './core/interceptors/api-rewrite/api-rewrite.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([apiRewriteInterceptor])),
    provideConfig(),
    {
      provide: LocalStorageToken,
      useValue: window.localStorage,
    },
  ],
};
