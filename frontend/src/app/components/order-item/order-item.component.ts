import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() product: Product;

  constructor() {
  }

  ngOnInit(): void {
  }

}
