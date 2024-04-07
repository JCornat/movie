import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import routes from '@app/routes';

import { AppComponent } from '@app/app.component';
import { provideAppConfig } from '@shared/config/config.provider';
import { environment } from './environments/environment';
import { provideCustomTitleStrategy } from '@shared/custom-title-strategy/title-strategy';
import { apiRewriteInterceptor } from '@shared/interceptors/api-rewrite/api-rewrite.interceptor';
import { tokenInterceptor } from '@shared/interceptors/token/token.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([apiRewriteInterceptor, tokenInterceptor]),
    ),
    provideAppConfig(),
    provideCustomTitleStrategy(),
  ],
}).catch((error: Error) => console.error(error));
