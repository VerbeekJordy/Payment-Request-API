import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  savedMail = '';
  currentUserRole: string;


  test: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser != null) {
      // Check wich role and then navigate
      this.currentUserRole = this.getDecodedAccessToken(
        this.authenticationService.currentUser
      ).scopes;
      this.router.navigate([
        this.authenticationService.getRoleUrl(this.currentUserRole)
      ]);
      this.authenticationService.logout();
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['']
    });
    // check if there is saved email
    this.savedMail = this.getSavedEmail();
    if (this.savedMail != null) {
      const user = {email: this.savedMail, password: '', rememberMe: true};
      this.loginForm.setValue(user);
    }
  }

  // easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error('Fill in the email and password', null, {
        positionClass: 'toast-bottom-center'
      });
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.rememberMe();
          this.currentUserRole = this.getDecodedAccessToken(data).scopes;
          this.loading = false;
          this.router.navigate([
            this.authenticationService.getRoleUrl(this.currentUserRole)
          ]);
        },
        error => {
          this.loading = false;
          this.toastr.error('Failed to login', 'Wrong Password', {
            positionClass: 'toast-bottom-center'
          });
          this.rememberMe();
        }
      );
  }

  rememberMe() {
    if (this.loginForm.get('rememberMe').value) {
      localStorage.setItem('savedEmail', this.loginForm.get('email').value);
    } else {
      localStorage.removeItem('savedEmail');
    }
  }

  getSavedEmail(): string {
    return localStorage.getItem('savedEmail');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
