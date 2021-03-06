import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './components/app/app.component';
import {GiftListComponent} from './components/gift-list/gift-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GiftItemComponent} from './components/gift-item/gift-item.component';
import {FilterComponent} from './components/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartComponent} from './components/cart/cart.component';
import {ConfirmPaymentComponent} from './components/confirm-payment/confirm-payment.component';
import {RegularCheckoutComponent} from './components/regular-checkout/regular-checkout.component';
import {ProductService} from './services/product.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AuthGuard} from './helpers/auth.guard';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatMenuModule, MatButtonModule} from '@angular/material';
import { LogoutComponent } from './components/logout/logout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderComponent } from './components/order/order.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { TransactionComponent } from './components/transaction/transaction.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {CommonModule} from '@angular/common';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {NgSelectModule} from '@ng-select/ng-select';
import {ClipboardModule} from 'ngx-clipboard';
import {ResetPasswordViewComponent} from './components/reset-password-view/reset-password-view.component';
import { ResetPasswordEffectiveComponent } from './components/reset-password-effective/reset-password-effective.component';
import { RegisterViewComponent } from './components/register-view/register-view.component';
import { OrderItemComponent } from './components/order-item/order-item.component';



@NgModule({
  declarations: [
    AppComponent,
    GiftListComponent,
    GiftItemComponent,
    FilterComponent,
    CartComponent,
    ConfirmPaymentComponent,
    RegularCheckoutComponent,
    LogoutComponent,
    OrderHistoryComponent,
    OrderComponent,
    TransactionComponent,
    OrderDetailComponent,
    LoginViewComponent,
    ResetPasswordViewComponent,
    ResetPasswordEffectiveComponent,
    RegisterViewComponent,
    OrderItemComponent
  ],
  imports: [
    MatMenuModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    CommonModule,
    StorageServiceModule,
    NgSelectModule,
    ClipboardModule,
    ClipboardModule
  ],
  providers: [ProductService,
    JwtInterceptor,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
