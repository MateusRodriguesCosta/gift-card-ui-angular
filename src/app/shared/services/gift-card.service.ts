import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftCard } from '../model/gift-card.model';
import { Page } from '../interface/page.interface';


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
}