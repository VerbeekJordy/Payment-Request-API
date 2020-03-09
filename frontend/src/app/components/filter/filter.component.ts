import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  search: string;
  @Output() childValueChange = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  toParent(test: string) {
    this.childValueChange.emit(test);
  }
}
