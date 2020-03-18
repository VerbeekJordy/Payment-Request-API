import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/product.model';
import {CartComponent} from '../cart/cart.component';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {OrderConverter} from '../../converters/order.converter';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
  @Input() product: Product;
  @Output() childValueChange = new EventEmitter();
  cartComponent: CartComponent;
  present = (window as any).PaymentRequest;
  width: number;

  constructor(private router: Router, private service: OrderService, private converter: OrderConverter) {
  }

  ngOnInit() {
    if (!this.present) {
      this.width = 100;
    }
  }

  buttonClicked(gift: Product) {
    this.childValueChange.emit(gift);
  }

  quickBuyClicked(gift: Product) {
    this.cartComponent = new CartComponent(this.router, this.service, this.converter);
    this.cartComponent.products = [];
    this.cartComponent.products.push(gift);
    this.cartComponent.payButtonClicked();
  }
}
