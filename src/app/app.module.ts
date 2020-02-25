import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { AddGiftComponent } from './components/add-gift/add-gift.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InmemoryDataService } from './services/inmemory-data.service';
import { GiftService } from './services/gift.service';
import { HttpClientModule } from '@angular/common/http';
import { GiftItemComponent } from './components/gift-item/gift-item.component';
import { FilterComponent } from './components/filter/filter.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GiftListComponent,
    AddGiftComponent,
    GiftItemComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InmemoryDataService),
    FormsModule
  ],
  providers: [GiftService, InmemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
