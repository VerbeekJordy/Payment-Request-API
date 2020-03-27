import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DbConnection {
// tslint:disable-next-line:variable-name
private _connection = 'https://paymentrequestapi.elision.zone';

  get connection(): string {
    return this._connection;
  }

  set connection(value: string) {
    this._connection = value;
  }
}
