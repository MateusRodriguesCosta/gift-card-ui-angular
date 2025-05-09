import { Component, OnInit } from '@angular/core';
import { GiftCardOverviewComponent } from '../dashboard/gift-card-overview/gift-card-overview.component';
import { AuthenticationService } from '../../security/services/authentication.service';
import { AuthenticationTokenService } from '../../security/services/authentication-token.service';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [
    GiftCardOverviewComponent,
    RouterOutlet,
    Menu,
    Drawer,
    Button
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public visible = true;
  protected menuItems: MenuItem [] = [
    { label: 'New', icon: 'pi pi-plus' },
    { label: 'Search', icon: 'pi pi-search' }
  ];

  constructor(protected authenticationService: AuthenticationService, protected authenticationTokenService: AuthenticationTokenService) {}

  ngOnInit() {
    if (!this.authenticationTokenService.isLoggedIn) this.authenticationService.login("user", "user123").subscribe();
  }

}
