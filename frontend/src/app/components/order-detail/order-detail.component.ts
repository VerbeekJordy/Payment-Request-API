import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Product} from '../../models/product.model';
import {CartComponent} from '../cart/cart.component';
import {OrderConverter} from '../../converters/order.converter';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  products: Array<Product>;
  cartComponent: CartComponent;
  total = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router,
              private service: OrderService, private converter: OrderConverter) {
  }

  ngOnInit(): void {
    this.orderService.getOrderById(this.route.snapshot.params.id)
      .pipe(tap(data => data.products.forEach(product => this.total = +this.total + +product.price)))
      .subscribe(data => this.products = data.products);
  }

  quickBuyClicked() {
    this.cartComponent = new CartComponent(this.router, this.service, this.converter);
    this.cartComponent.products = this.products;
    this.cartComponent.payButtonClicked();
  }

}
