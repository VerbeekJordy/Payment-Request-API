import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetModel} from '../models/reset.model';
import {DbConnection} from '../helpers/database.helper';

@Injectable({providedIn: 'root'})
export class ResetService {
  BASE_API_URL = this.connection.connection + '/';

  constructor(private http: HttpClient, private connection: DbConnection) {
  }

  resetPasswordByToken(email: string) {
    return this.http
      .post<string>(this.BASE_API_URL + 'token',
        email
      );
  }

  resetPassword(resetModel: ResetModel) {
    return this.http
      .post<ResetModel>(this.BASE_API_URL + 'reset',
        resetModel
      );
  }
}
