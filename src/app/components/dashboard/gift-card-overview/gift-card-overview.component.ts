import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { GiftCardService } from '../../../shared/services/gift-card.service';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';

interface GiftCard {
    id: number;
    token: string;
    cardNumber: string;
    balance: number;
    currency: string;
    region: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'LOST' | 'STOLEN' | 'CANCELLED';
    expiryDate: Date;
    issueDate: Date;
}
@Component({
    selector: 'gift-card-overview',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        FormsModule,
        TableModule,
        TagModule,
        RatingModule,
    ],
    templateUrl: 'gift-card-overview.component.html',
    host: { class: 'layout-card',},
    styleUrl: 'gift-card-overview.component.scss',
})
export class GiftCardOverviewComponent implements OnInit {

    selectedGiftCard!: GiftCard;

    giftCards: GiftCard[] = [
        {
            id: 12345,
            token: 'Electronics',
            balance: 2499,
            status: 'ACTIVE',
            cardNumber: '',
            currency: '',
            region: '',
            expiryDate: new Date(),
            issueDate: new Date()
        },
        {
            id: 54321,
            token: 'Accessories',
            balance: 49,
            status: 'CANCELLED',
            cardNumber: '',
            currency: '',
            region: '',
            expiryDate: new Date(),
            issueDate: new Date()
        }
    ];

    searchQuery = '';

    loading = false;

    filteredGiftCards: any = [];

    constructor(private giftCardService: GiftCardService,
                private authService: AuthService,) {}

    ngOnInit() {
        this.filteredGiftCards = [...this.giftCards];
        this.giftCardService.giftCards$.pipe(
            tap((giftCards) => {
                console.log(giftCards);
            })
        ).subscribe()
    }

    searchGiftCards = () => {
        this.loading = true;
        this.filteredGiftCards = this.giftCards.filter(
            (giftcard) =>
                giftcard.token.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                giftcard.cardNumber.includes(this.searchQuery.toLowerCase()) ||
                giftcard.status.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        setTimeout(() => {
            this.loading = false;
        }, 300);
    };
}
