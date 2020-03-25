import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GiftListComponent} from '../components/gift-list/gift-list.component';
import {ConfirmPaymentComponent} from '../components/confirm-payment/confirm-payment.component';
import {RegularCheckoutComponent} from '../components/regular-checkout/regular-checkout.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {RegisterComponent} from '../components/register/register.component';
import {OrderHistoryComponent} from '../components/order-history/order-history.component';
import {TransactionComponent} from '../components/transaction/transaction.component';
import {OrderDetailComponent} from '../components/order-detail/order-detail.component';
import {LoginViewComponent} from '../components/login-view/login-view.component';
import {ResetPasswordViewComponent} from '../components/reset-password-view/reset-password-view.component';
import {ResetPasswordEffectiveComponent} from '../components/reset-password-effective/reset-password-effective.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: GiftListComponent},
  {path: 'confirmation', component: ConfirmPaymentComponent},
  {path: 'checkout', component: RegularCheckoutComponent},
  {path: 'login', component: LoginViewComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover', component: ResetPasswordViewComponent},
  {path: 'reset/:guid', component: ResetPasswordEffectiveComponent},
  {path: 'orders', component: OrderHistoryComponent},
  {path: 'orders/detail/:id', component: OrderDetailComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'test', component: ResetPasswordEffectiveComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

