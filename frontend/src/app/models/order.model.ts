import {Product} from './product.model';

export class Order {
  products: Product[];
  createdAt: string;
  id: string;

  constructor(products: Product[], createdAt: string, id: string) {
    this.products = products;
    this.createdAt = createdAt;
    this.id = id;
  }
}
