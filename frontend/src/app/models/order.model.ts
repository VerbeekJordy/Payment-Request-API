import {Product} from './product.model';
import {PaymentDto} from './payment.model';

export class Order {
  products: Product[];
  paymentDto: PaymentDto;
  createdAt: string;
  id: string;

  constructor(products: Product[], payment: PaymentDto, createdAt: string, id: string) {
    this.products = products;
    this.paymentDto = payment;
    this.createdAt = createdAt;
    this.id = id;
  }
}
