import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  currentUserValue(): string {
    return this.currentUser;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>('https://localhost:8080/login', {
        username,
        password
      })
      .pipe(
        map(token => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // DECODE JWT
          this.currentUser = token.token;
          localStorage.setItem('currentUser', token.token);
          return token.token;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getRoleUrl(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'admin/home';
      case 'ROLE_CLEANER':
        return 'cleaner/home';
      case 'ROLE_USER':
        return 'employee/home';
    }
  }
}
