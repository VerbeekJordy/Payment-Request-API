import {Component, Input, OnInit} from '@angular/core';
import {Gift} from '../../models/gift.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() gifts: Array<Gift>;
  count: number;


  constructor() {
  }

  ngOnInit() {
  }

  removeItemFromCart(gift: Gift) {
    this.count = 0;
    while (gift.id !== this.gifts[this.count].id) {
      this.count++;
    }
    this.gifts.splice(this.count, 1);
  }

}
