import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GiftListComponent} from '../components/gift-list/gift-list.component';
import {ConfirmPaymentComponent} from '../components/confirm-payment/confirm-payment.component';
import {RegularCheckoutComponent} from '../components/regular-checkout/regular-checkout.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {RegisterComponent} from '../components/register/register.component';
import {ResetRequestComponent} from '../components/reset-request/reset-request.component';
import {ResetComponent} from '../components/reset/reset.component';
import {OrderHistoryComponent} from '../components/order-history/order-history.component';
import {TransactionComponent} from '../components/transaction/transaction.component';
import {OrderDetailComponent} from '../components/order-detail/order-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: GiftListComponent},
  {path: 'confirmation', component: ConfirmPaymentComponent},
  {path: 'checkout', component: RegularCheckoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover', component: ResetRequestComponent},
  {path: 'reset/:guid', component: ResetComponent},
  {path: 'orders', component: OrderHistoryComponent},
  {path: 'orders/detail/:id', component: OrderDetailComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

