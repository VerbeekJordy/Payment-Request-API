import {Product} from './product.model';

export class Order {
  products: Product[];


  constructor(products: Product[]) {
    this.products = products;
  }
}
