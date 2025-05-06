import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
    HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthenticationTokenService } from '../services/authentication-token.service';
import { AuthenticationResponse } from '../interfaces/authentication-response.interface';

export const AuthenticationJwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const tokenService = inject(AuthenticationTokenService);
    const accessToken = tokenService.accessToken;

    if (accessToken) {
        const clonedRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } });
        return next(clonedRequest);
    } else {
        return next(request);
    }
};

export const UnauthorizedErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthenticationService);
    const tokenService = inject(AuthenticationTokenService);

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized && !request.url.includes('auth/refresh-token')) {
                if (tokenService.accessToken) return authService.refreshToken().pipe(
                    switchMap((refreshResult: AuthenticationResponse) => {
                        tokenService.saveAccessToken(refreshResult.accessToken);
                        const clonedRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${refreshResult.accessToken}` } });
                        return next(clonedRequest);
                    }),
                    catchError((error) => {
                        if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
                            tokenService.clearTokens();
                        }
                        return throwError(() => error);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};