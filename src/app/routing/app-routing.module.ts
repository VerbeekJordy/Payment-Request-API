import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GiftListComponent} from '../components/gift-list/gift-list.component';
import {AddGiftComponent} from '../components/add-gift/add-gift.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: GiftListComponent},
  {path: 'add', component: AddGiftComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

