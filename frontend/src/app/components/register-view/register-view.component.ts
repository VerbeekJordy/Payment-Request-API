import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  savedMail = '';
  currentUserRole: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser != null) {
      // Check wich role and then navigate
      this.router.navigate([
        this.authenticationService.getRoleUrl(this.currentUserRole)
      ]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // check if there is saved email
  }
  // easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error('Fill in the fullname, email and password', null, {
        positionClass: 'toast-bottom-center'
      });
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.f.email.value, this.f.password.value, this.f.name.value)
      .pipe(first())
      .subscribe(
        data => {setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000); },
        error => {
          this.loading = false;
          this.toastr.error('Failed to login', 'Wrong Password', {
            positionClass: 'toast-bottom-center'
          });
        }
      );
  }
}
