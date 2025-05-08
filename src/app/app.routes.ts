import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'cards-overview',
                loadComponent: () =>
                    import('./components/dashboard/gift-card-overview/gift-card-overview.component')
                        .then(c => c.GiftCardOverviewComponent),
            },
            {
                path: 'transactions',
                loadComponent: () =>
                    import('./components/dashboard/gift-card-transactions/gift-card-transactions.component')
                        .then(c => c.GiftCardTransactionsComponent),
            }
        ]
    }
];
