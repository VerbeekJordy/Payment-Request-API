import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../models/order.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;
  total = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.order.products.forEach(product => this.total = +this.total + +product.price);
  }

}