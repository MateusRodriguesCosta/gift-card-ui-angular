import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationTokenService {
    public readonly ACCESS_TOKEN_KEY: string = 'accessToken';
    public readonly REFRESH_TOKEN_KEY: string = 'refreshToken';

    public saveAccessToken(accessToken: string): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    }

    public saveTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    public get accessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    public get refreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    clearTokens(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
}