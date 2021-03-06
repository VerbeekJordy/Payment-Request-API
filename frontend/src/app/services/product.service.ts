import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Product} from '../models/product.model';
import {DbConnection} from '../helpers/database.helper';

@Injectable()
export class ProductService {
  BASE_API_URL = this.connection.connection + '/product/';

  constructor(private http: HttpClient, private connection: DbConnection) {
  }

  // Api Calls
  // Get All Products
  getProductsList(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.BASE_API_URL)
      .pipe(map(res => this.parseData(res)));
  }

  parseData(json: any): Product[] {
    return Object.keys(json).map(key => {
      const product = new Product(
        json[key].titleNl,
        json[key].titleEn,
        json[key].price,
        json[key].imageUrl,
        json[key].skuId
      );
      return product;
    });
  }
}
