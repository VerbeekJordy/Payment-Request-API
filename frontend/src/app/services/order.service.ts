import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  BASE_API_URL = 'http://localhost:8080/order';

  constructor(private http: HttpClient) {
  }

  addOrder(products: Array<string>) {
    return this.http
      .post<any>(this.BASE_API_URL, {
        products
      }).subscribe();
  }
}
