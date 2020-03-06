import {Component, OnInit} from '@angular/core';
import {GiftService} from '../../services/gift.service';
import {Gift} from '../../models/gift.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  gifts: Array<Gift>;
  cartItems: Array<Gift> = [];
  title: string;

  constructor(private service: GiftService, private titleService: Title) {
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

