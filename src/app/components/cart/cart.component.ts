import { Component, OnInit } from '@angular/core';
import {Gift} from '../../models/gift.model';
import {GiftService} from '../../services/gift.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  gifts: Array<Gift>;

  constructor(private service: GiftService) { }

  ngOnInit() {
    this.service.getGifts('').subscribe(data => this.gifts = data);
  }

}
