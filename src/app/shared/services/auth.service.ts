import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {
    }

    private readonly baseUrl: string = 'http://localhost:8080/auth';

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password })
            .pipe(tap(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
            }));
    }

    refreshToken(): Observable<AuthResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http.post<AuthResponse>(`${this.baseUrl}/refresh-token`, {}, { headers: { Authorization: `Bearer ${refreshToken}` }})
            .pipe(tap(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
            })
        );
    }

    get accessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
}