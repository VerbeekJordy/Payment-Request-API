import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Order} from '../models/order.model';
import {PaymentDto} from '../models/payment.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  BASE_API_URL = 'http://localhost:8080/order';

  constructor(private http: HttpClient) {
  }

  addOrder(products: Array<string>, paymentDto: PaymentDto) {
    return this.http
      .post<any>(this.BASE_API_URL, {
        paymentDto,
        products
      }).subscribe();
  }

  getOrdersBySessionUserList(): Observable<Order[]> {
    return this.http
      .get<any>(this.BASE_API_URL)
      .pipe(map(res => this.parseData(res)));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http
      .get<Order>(this.BASE_API_URL + '/' + orderId);
  }

  parseData(json: any): Order[] {
    return Object.keys(json).map(key => {
      const order = new Order(json[key].products, json[key].paymentDto, json[key].createdAt, json[key].id);
      return order;
    });
  }
}
