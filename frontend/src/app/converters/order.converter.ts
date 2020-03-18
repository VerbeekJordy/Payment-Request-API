import {Product} from '../models/product.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class OrderConverter {
  skus: Array<string> = [];

  productToStringArray(products: Array<Product>) {
    this.skus = [];
    products.forEach((value) => {
      this.skus.push(value.skuId);
    });
    return this.skus;
  }
}
