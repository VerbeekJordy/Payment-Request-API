import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gift} from '../../models/gift.model';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
  @Input() gift: Gift;
  @Output() childValueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  buttonClicked(gift: Gift) {
    this.childValueChange.emit(gift);
  }
}
