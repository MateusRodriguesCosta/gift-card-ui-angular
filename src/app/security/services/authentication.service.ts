import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationTokenService } from './authentication-token.service';
import { AuthenticationResponse } from '../interfaces/authentication-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private authenticationTokenService: AuthenticationTokenService) {
    }

    private readonly baseUrl: string = 'http://localhost:8080/auth';

    login(username: string, password: string): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`, { username, password })
            .pipe(tap(res => this.authenticationTokenService.saveTokens(res.accessToken, res.refreshToken)));
    }

    refreshToken(): Observable<AuthenticationResponse> {
        const refreshToken = this.authenticationTokenService.refreshToken;
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}/refresh-token`, {}, { headers: { Authorization: `Bearer ${refreshToken}` }})
            .pipe(tap(res => this.authenticationTokenService.saveTokens(res.accessToken, res.refreshToken)));
    }
}