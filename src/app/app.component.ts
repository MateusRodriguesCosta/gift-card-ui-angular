import { Component } from '@angular/core';
import { GiftCardTransactionsComponent } from './components/dashboard/gift-card-transactions/gift-card-transactions.component';
import { GiftCardOverviewComponent } from './components/dashboard/gift-card-overview/gift-card-overview.component';

@Component({
  selector: 'app-root',
  imports: [GiftCardTransactionsComponent, GiftCardOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
