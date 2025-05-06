import { Component, OnInit } from '@angular/core';
import { GiftCardTransactionsComponent } from './components/dashboard/gift-card-transactions/gift-card-transactions.component';
import { GiftCardOverviewComponent } from './components/dashboard/gift-card-overview/gift-card-overview.component';
import { AuthenticationService } from './security/services/authentication.service';
import { AuthenticationTokenService } from './security/services/authentication-token.service';

@Component({
  selector: 'app-root',
  imports: [GiftCardTransactionsComponent, GiftCardOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(protected authenticationService: AuthenticationService, protected authenticationTokenService: AuthenticationTokenService) {}

  ngOnInit() {
    if (!this.authenticationTokenService.accessToken) this.authenticationService.login("user", "user123").subscribe();
  }
}
