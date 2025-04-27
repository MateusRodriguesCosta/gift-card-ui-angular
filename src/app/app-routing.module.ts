import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftCardListComponent } from './gift-card-list/gift-card-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/giftcards', pathMatch: 'full' },
  { path: 'giftcards', component: GiftCardListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
