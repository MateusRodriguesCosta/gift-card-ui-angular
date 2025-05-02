import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
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
    BehaviorSubject,
    catchError,
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    of,
    startWith,
    switchMap,
    tap
} from 'rxjs';
import { GiftCard } from '../../../shared/model/gift-card.model';
import { Tooltip } from 'primeng/tooltip';

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
        Tooltip
    ],
    templateUrl: 'gift-card-overview.component.html',
    host: { class: 'layout-card' },
    styleUrl: 'gift-card-overview.component.scss'
})
export class GiftCardOverviewComponent implements OnInit {
    searchControl = new FormControl<string>('', {nonNullable: true});
    private lazyLoad$ = new BehaviorSubject<TableLazyLoadEvent>({ first: 0, rows: 10 });
    rows$!: Observable<GiftCard[]>;
    totalRecords = 0;
    loading = false;
    pageSize = 10;

    constructor(private giftCardService: GiftCardService) {}

    ngOnInit() {
        const search$ = this.searchControl.valueChanges.pipe(
            startWith(this.searchControl.value),
            debounceTime(300),
            distinctUntilChanged(),
        );

        this.rows$ = combineLatest([this.lazyLoad$, search$]).pipe(
            tap(() => this.loading = true),
            switchMap(([event, term]) =>
                this.giftCardService.getGiftCards(
                    (event.first ?? 0) / (event.rows ?? this.pageSize),
                    event.rows ?? this.pageSize,
                    term
                ).pipe(
                    tap(page => this.totalRecords = page.totalElements),
                    map(page => page.content),
                    catchError(() => {
                        this.totalRecords = 0;
                        return of([]);
                    })
                )
            ),
            tap(() => this.loading = false),
        );
    }

    loadData(event: TableLazyLoadEvent): void {
        this.lazyLoad$.next(event);
    }

    onClickEditCard(event: Event) {}
    onClickCheckCard(event: Event) {}

    protected readonly DEFAULT_CURRENCY_CODE = DEFAULT_CURRENCY_CODE;
}
