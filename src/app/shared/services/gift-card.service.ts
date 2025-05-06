import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftCard } from '../interfaces/gift-card.interface';
import { Page } from '../interfaces/page.interface';


@Injectable({
    providedIn: 'root'
})
export class GiftCardService {
    private baseUrl = 'http://localhost:8080/api/v1/giftcards';

    constructor(private http: HttpClient) {}

    getGiftCards(page: number, size: number, filter: string): Observable<Page<GiftCard>> {
        let params = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('filter', filter);

        return this.http.get<Page<GiftCard>>(this.baseUrl, {params});
    }

    createGiftCard(giftCard: GiftCard): Observable<GiftCard> {
        return this.http.post<GiftCard>(this.baseUrl, giftCard);
    }
    
    checkGiftCardValidity(token: string): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + `/isValid/${token}`);
    }
}