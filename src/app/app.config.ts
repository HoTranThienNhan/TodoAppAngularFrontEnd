import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { authInterceptor } from './services/interceptor/auth.interceptor';
import { I18nPluralPipe } from '@angular/common';
import { AlertSharedService } from './services/shared/alert/alert.shared.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    AuthService,
    AlertSharedService,
    provideAnimations(),
    I18nPluralPipe
  ]
};
