import { Component, DEFAULT_CURRENCY_CODE, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { GiftCardService } from '../../../shared/services/gift-card.service';
import {
    catchError,
    debounceTime,
    delay,
    distinctUntilChanged,
    finalize,
    of,
    startWith,
    Subject,
    takeUntil,
    tap
} from 'rxjs';
import { GiftCard } from '../../../shared/interfaces/gift-card.interface';
import { Tooltip } from 'primeng/tooltip';
import { EditCardDialogComponent } from './edit-card-dialog/edit-card-dialog.component';
import { GiftCardOverviewDataSource } from '../../../shared/datasources/gift-card-overview.datasource';

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
        ReactiveFormsModule,
        Tooltip,
        EditCardDialogComponent
    ],
    templateUrl: 'gift-card-overview.component.html',
    host: { class: 'layout-card' },
    styleUrl: 'gift-card-overview.component.scss'
})
export class GiftCardOverviewComponent implements OnInit, OnDestroy {

    protected searchControl = new FormControl<string>('', {nonNullable: true});
    protected pageSize = 10;
    protected showEditDialog = false;
    protected blockingUnblockingMap: Record<string, boolean> = {};
    private destroy$ = new Subject<void>();

    constructor(
        private giftCardService: GiftCardService,
        protected dataSource: GiftCardOverviewDataSource
    ) {}

    ngOnInit() {
        this.dataSource.loadPage(0, this.pageSize, this.searchControl.value);
        this.searchControl.valueChanges.pipe(
            startWith(this.searchControl.value),
            debounceTime(300),
            distinctUntilChanged(),
            tap(term => this.dataSource.setFilter(term)),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onLazyLoad(event: TableLazyLoadEvent) {
        const page = (event.first ?? 0) / (event.rows ?? this.pageSize);
        const size = (event.rows ?? this.pageSize);
        this.dataSource.setPage(page, size);
    }

    onClickBlockUnblockCard(giftCard: GiftCard) {
        this.blockingUnblockingMap[giftCard.token] = true;
        this.giftCardService.checkGiftCardValidity(giftCard.token).pipe(
            tap((result) => {
                console.log(giftCard, result);
            }),
            delay(5000),
            catchError(error => {
                console.log(error);
                return of(null);
            }),
            finalize(() => {
                this.blockingUnblockingMap[giftCard.token] = false;
            })
        ).subscribe();
    }
    onClickEditCard() {
        this.showEditDialog = true;
    }
    protected readonly DEFAULT_CURRENCY_CODE = DEFAULT_CURRENCY_CODE;
}
