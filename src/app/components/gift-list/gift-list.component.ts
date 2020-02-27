import {Component, OnInit} from '@angular/core';
import {GiftService} from '../../services/gift.service';
import {Gift} from '../../models/gift.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  gifts: Array<Gift>;
  cartItems: Array<Gift> = [];

  constructor(private service: GiftService) {
  }

  ngOnInit() {
    this.service.getGifts('').subscribe(data => this.gifts = data);
  }

  eventSearch(event: string) {
    console.log(event);
    this.service.getGifts(event).subscribe(data => this.gifts = data);
  }

  eventParent(event: Gift) {
    this.cartItems.push(event);
  }
}

