import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftCard } from '../model/gift-card.model';


@Injectable({
    providedIn: 'root'
})
export class GiftCardService {
    private baseUrl = 'http://localhost:8080/api/v1/giftcards';

    constructor(private http: HttpClient) {}

    get giftCards$(): Observable<GiftCard[]> {
        return this.http.get<GiftCard[]>(this.baseUrl);
    }

    createGiftCard(giftCard: GiftCard): Observable<GiftCard> {
        return this.http.post<GiftCard>(this.baseUrl, giftCard);
    }
}