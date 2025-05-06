import { inject } from '@angular/core';
import { AuthResponse, AuthService } from '../services/auth.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
    HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const AuthJwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const accessToken = authService.accessToken;

    if (accessToken) {
        const clonedRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } });
        return next(clonedRequest);
    } else {
        return next(request);
    }
};

export const UnauthorizedErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized && !request.url.includes('auth/refresh-token')) {
                const token = authService.accessToken;
                if (token) return authService.refreshToken().pipe(
                    switchMap((refreshResult: AuthResponse) => {
                        authService.accessToken = refreshResult.accessToken;
                        const clonedRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${refreshResult.accessToken}` } });
                        return next(clonedRequest);
                    }),
                    catchError((error) => {
                        return throwError(() => error);
                    })
                );
            }
            return throwError(() => new Error('Unauthorized Exception'));
        })
    );
};