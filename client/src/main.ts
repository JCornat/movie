import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import routes from '@app/routes';

import { AppComponent } from '@app/app.component';
import { provideAppConfig } from '@shared/config/config.provider';
import { environment } from './environments/environment';
import { provideCustomTitleStrategy } from '@shared/custom-title-strategy/title-strategy';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAppConfig(),
    provideCustomTitleStrategy(),
  ],
}).catch((error: Error) => console.error(error));
