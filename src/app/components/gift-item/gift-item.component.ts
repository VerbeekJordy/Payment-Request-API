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
  test: CartComponent;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  buttonClicked(gift: Gift) {
    this.childValueChange.emit(gift);
  }

  quickBuyClicked(gift: Gift) {
    this.test = new CartComponent(this.router);
    this.test.gifts = [];
    this.test.gifts.push(gift);
    this.test.payButtonClicked();
  }
}
