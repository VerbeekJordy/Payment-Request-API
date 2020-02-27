import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GiftListComponent} from '../components/gift-list/gift-list.component';
import {ConfirmPaymentComponent} from '../components/confirm-payment/confirm-payment.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: GiftListComponent},
  {path: 'confirmation', component: ConfirmPaymentComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

