import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {LogoutComponent} from '../logout/logout.component';

@Component({
  selector: 'app-overview-menu',
  templateUrl: './overview-menu.component.html',
  styleUrls: ['./overview-menu.component.css']
})
export class OverviewMenuComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.authenticationService.currentUser != null) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    });

  }

  ngOnInit(): void {
  }

}
