import { Component, OnInit } from '@angular/core';
import { GiftCardTransactionsComponent } from './components/dashboard/gift-card-transactions/gift-card-transactions.component';
import { GiftCardOverviewComponent } from './components/dashboard/gift-card-overview/gift-card-overview.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [GiftCardTransactionsComponent, GiftCardOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(protected authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.accessToken) this.authService.login("user", "user123").subscribe();
  }
}
