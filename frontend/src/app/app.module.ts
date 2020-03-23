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
import {OrderService} from './services/order.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AuthGuard} from './helpers/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {OverviewMenuComponent} from './components/overview-menu/overview-menu.component';
import {MatMenuModule, MatButtonModule} from '@angular/material';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { ResetComponent } from './components/reset/reset.component';



@NgModule({
  declarations: [
    AppComponent,
    GiftListComponent,
    GiftItemComponent,
    FilterComponent,
    CartComponent,
    ConfirmPaymentComponent,
    RegularCheckoutComponent,
    LoginComponent,
    OverviewMenuComponent,
    LogoutComponent,
    RegisterComponent,
    ResetRequestComponent,
    ResetComponent
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
  ],
  providers: [ProductService,
    JwtInterceptor,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
