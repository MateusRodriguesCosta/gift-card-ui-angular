import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  AuthenticationJwtInterceptor,
  UnauthorizedErrorInterceptor
} from './security/interceptors/authentication-jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.p-dark' },
      },
      ripple: true,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
        withInterceptors([AuthenticationJwtInterceptor, UnauthorizedErrorInterceptor]),
        withFetch()
    )
  ],
};
