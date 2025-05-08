import { Component, OnInit } from '@angular/core';
import { GiftCardTransactionsComponent } from '../dashboard/gift-card-transactions/gift-card-transactions.component';
import { GiftCardOverviewComponent } from '../dashboard/gift-card-overview/gift-card-overview.component';
import { AuthenticationService } from '../../security/services/authentication.service';
import { AuthenticationTokenService } from '../../security/services/authentication-token.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    GiftCardTransactionsComponent,
    GiftCardOverviewComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(protected authenticationService: AuthenticationService, protected authenticationTokenService: AuthenticationTokenService) {}

  ngOnInit() {
    if (!this.authenticationTokenService.accessToken) this.authenticationService.login("user", "user123").subscribe();
  }

}
