import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../models/order.model';

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

  getOrdersBySessionUserList(): Observable<Order[]> {
    return this.http
      .get<any>(this.BASE_API_URL)
      .pipe(map(res => this.parseData(res)));
  }

  parseData(json: any): Order[] {
    return Object.keys(json).map(key => {
      const order = new Order(json[key].products);
      let test: Product;
      order.products.forEach(product => test = product);
      return order;
    });
  }
}
