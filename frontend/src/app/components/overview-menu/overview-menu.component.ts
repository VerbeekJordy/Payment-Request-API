import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview-menu',
  templateUrl: './overview-menu.component.html',
  styleUrls: ['./overview-menu.component.css']
})
export class OverviewMenuComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.router.events.subscribe( () => {
      if (this.authenticationService.currentUser != null) {
        this.loggedIn = true;
      }
    });
  }

  ngOnInit(): void {
  }

}
