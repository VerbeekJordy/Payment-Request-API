import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../models/order.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  total = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.orderService.getOrderById(this.route.snapshot.params.id)
      .pipe(tap(data => data.products.forEach(product => this.total = +this.total + +product.price)))
      .subscribe(data => this.order = data);
  }

}
