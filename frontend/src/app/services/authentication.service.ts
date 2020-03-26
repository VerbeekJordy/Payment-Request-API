import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  currentUserValue(): string {
    return this.currentUser;
  }

  currentEmail(): string {
    return localStorage.getItem('user');
  }

  register(email: string, password: string, fullName: string) {
    return this.http
      .post<any>('http://localhost:8080/register', {
        email,
        password,
        fullName
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<any>('http://localhost:8080/login', {
        email,
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
    localStorage.removeItem(('email'));
    this.currentUser = null;
  }

  getRoleUrl(role: string): string {
    switch (role) {
      case 'ROLE_USER':
        return 'admin/home';
    }
  }
}
