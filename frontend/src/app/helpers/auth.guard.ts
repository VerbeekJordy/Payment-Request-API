import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUser;
    // Check currentuser if token expired
    if (currentUser != null) {
      // logged in so return true
      // check Role
      const currentRole = this.getDecodedAccessToken(currentUser).scopes;
      if (route.data.roles && route.data.roles.indexOf(currentRole) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  getDecodedAccessToken(token: string): any {
    return jwt_decode(token);
  }
}
