import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { InmemoryDataService } from './services/inmemory-data.service';
import { GiftService } from './services/gift.service';
import { HttpClientModule } from '@angular/common/http';
import { GiftItemComponent } from './components/gift-item/gift-item.component';
import { FilterComponent } from './components/filter/filter.component';
import {FormsModule} from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';
import { RegularCheckoutComponent } from './components/regular-checkout/regular-checkout.component';
import {ProductService} from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    GiftListComponent,
    GiftItemComponent,
    FilterComponent,
    CartComponent,
    ConfirmPaymentComponent,
    RegularCheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GiftService, ProductService, InmemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
