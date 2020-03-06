import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  products: Array<Product>;
  productsInput: Array<Product> = [];
  productItems: Array<Product> = [];
  title: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProductsList().subscribe(data => this.products = data);
    this.productService.getProductsList().subscribe(data => this.productsInput = data);
  }

  eventSearch(event: string) {
    this.products = this.productsInput.filter((product: Product) => product.titleNl.match(event));
  }

  eventParent(event: Product) {
    this.productItems.push(event);
  }
}
