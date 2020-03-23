import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {ResetService} from '../../services/reset.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.css']
})
export class ResetRequestComponent implements OnInit {
  form: FormGroup;

  constructor(private resetService: ResetService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required])
    });
  }

  submit(form): void {
    this.resetService.resetPasswordByToken(form.value.email);
    this.router.navigateByUrl('/home');
  }

}
