import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { LocalStorageToken } from './core/injection-tokens/local-storage.token';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    {
      provide: LocalStorageToken,
      useValue: window.localStorage,
    },
  ],
};
