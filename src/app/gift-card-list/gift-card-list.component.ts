import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCard } from './model/gift-card.model';
import { GiftCardService } from './service/gift-card.service';

@Component({
  selector: 'app-gift-card-list',
  standalone: true,
  templateUrl: './gift-card-list.component.html',
  styleUrl: './gift-card-list.component.scss'
})
export class GiftCardListComponent implements OnInit {
  giftCards: GiftCard[] = [];
  giftCardForm: FormGroup;

  constructor(
    private giftCardService: GiftCardService,
    private fb: FormBuilder
  ) {
    this.giftCardForm = this.fb.group({
      code: ['', Validators.required],
      balance: [0, Validators.required],
      status: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGiftCards();
  }

  loadGiftCards(): void {
    this.giftCardService.getGiftCards().subscribe(data => {
      this.giftCards = data;
    });
  }

  onSubmit(): void {
    if (this.giftCardForm.valid) {
      this.giftCardService.createGiftCard(this.giftCardForm.value).subscribe(newCard => {
        this.giftCards.push(newCard);
        this.giftCardForm.reset();
      });
    }
  }

}
