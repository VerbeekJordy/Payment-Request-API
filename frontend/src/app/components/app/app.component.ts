import {Component, HostListener, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
  }
}
