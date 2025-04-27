import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<{token:string}>('http://localhost:8080/auth/login', { username, password })
            .pipe(tap(res => localStorage.setItem('token', JSON.stringify(res))));
    }
    get token(): string | null {
        return localStorage.getItem('token');
    }
}