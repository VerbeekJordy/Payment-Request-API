import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gift} from '../../models/gift.model';
import {CartComponent} from '../cart/cart.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
  @Input() gift: Gift;
  @Output() childValueChange = new EventEmitter();
  cartComponent: CartComponent;
  test = (window as any).PaymentRequest;
  width: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.test) {
      this.width = 80;
    } else {
      this.width = 100;
    }
  }

  buttonClicked(gift: Gift) {
    this.childValueChange.emit(gift);
  }

  quickBuyClicked(gift: Gift) {
    this.cartComponent = new CartComponent(this.router);
    this.cartComponent.gifts = [];
    this.cartComponent.gifts.push(gift);
    this.cartComponent.payButtonClicked();
  }
}
