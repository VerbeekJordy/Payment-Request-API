import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Array<Order>;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersBySessionUserList().subscribe(data => this.orders = data);
    this.orderService.getOrdersBySessionUserList().subscribe(data => console.log(data));
  }

}
