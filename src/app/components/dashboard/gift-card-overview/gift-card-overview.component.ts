import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { GiftCardService } from '../../../shared/services/gift-card.service';
import { Observable } from 'rxjs';
import { GiftCard } from '../../../shared/model/gift-card.model';

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
        ReactiveFormsModule
    ],
    templateUrl: 'gift-card-overview.component.html',
    host: { class: 'layout-card',},
    styleUrl: 'gift-card-overview.component.scss',
})
export class GiftCardOverviewComponent implements OnInit {
    searchControl = new FormControl('');
    giftCards$!: Observable<GiftCard[]>;
    selectedGiftCard!: GiftCard;

    constructor(private giftCardService: GiftCardService) {}

    ngOnInit() {
        this.giftCards$ = this.giftCardService.giftCards$;
    }

    protected readonly DEFAULT_CURRENCY_CODE = DEFAULT_CURRENCY_CODE;
}
