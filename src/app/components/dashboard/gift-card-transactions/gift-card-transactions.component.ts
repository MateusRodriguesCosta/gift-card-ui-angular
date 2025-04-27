import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gift-card-transactions',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: 'gift-card-transactions.component.html',
  host: {
    class: 'layout-card col-item-2',
  },
  styleUrl: 'gift-card-transactions.component.scss'
})
export class GiftCardTransactionsComponent {
  
  transactions = [
    {
      icon: 'pi-shopping-cart',
      text: 'New order #1123',
      time: '2 minutes ago',
      color: 'pink',
    },
    {
      icon: 'pi-user-plus',
      text: 'New customer registered',
      time: '15 minutes ago',
      color: 'green',
    },
    {
      icon: 'pi-check-circle',
      text: 'Payment processed',
      time: '25 minutes ago',
      color: 'blue',
    },
    {
      icon: 'pi-inbox',
      text: 'Inventory updated',
      time: '40 minutes ago',
      color: 'yellow',
    },
  ];
}
