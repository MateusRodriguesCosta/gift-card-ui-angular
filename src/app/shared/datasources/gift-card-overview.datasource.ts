import { Injectable } from '@angular/core';
import { GiftCard } from '../interfaces/gift-card.interface';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { Page } from '../interfaces/page.interface';
import { GiftCardService } from '../services/gift-card.service';

@Injectable({ providedIn: 'root' })
export class GiftCardOverviewDataSource implements DataSource<GiftCard> {
    private emptyPage = {
        content: [],
        number: 0,
        size: 0,
        totalPages: 0,
        totalElements: 0};

    private pageSubject = new BehaviorSubject<Page<GiftCard>>(this.emptyPage);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public data$ = this.pageSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.pageSubject.pipe(map(p => p.totalElements));

    private pageIndex = 0;
    private pageSize = 10;
    private filterTerm = '';

    constructor(private giftCardService: GiftCardService) {}

    connect(): Observable<GiftCard[]> {
        return this.data$.pipe(map(p => p.content));
    }
    disconnect(): void {
        this.pageSubject.complete();
        this.loadingSubject.complete();
    }

    loadPage(pageIndex: number, pageSize: number, filter: string) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.filterTerm = filter;

        this.loadingSubject.next(true);
        this.giftCardService
            .getGiftCards(this.pageIndex, pageSize, filter)
            .pipe(finalize(() => this.loadingSubject.next(false)))
            .subscribe({
                next: page => this.pageSubject.next(page),
                error: () => this.pageSubject.next(this.emptyPage)
            });
    }

    setFilter(term: string) {
        this.loadPage(0, this.pageSize, term);
    }

    setPage(index: number, size: number) {
        this.loadPage(index, size, this.filterTerm);
    }
}