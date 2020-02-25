import {Component, Input, OnInit} from '@angular/core';
import {GiftService} from '../../services/gift.service';
import {Gift} from '../../models/gift.model';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
 @Input() gift: Gift;
  constructor() {
  }

  ngOnInit() {
  }

  buttonClicked(gift: Gift) {
    gift.stock = gift.stock - 1;
  }

  layout(gift: Gift) {
    if (gift.stock === 0) {
      return {color: 'red'};
    }
  }
}
