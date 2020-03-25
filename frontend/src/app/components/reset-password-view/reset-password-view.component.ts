import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {ResetService} from '../../services/reset.service';

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './reset-password-view.component.html',
  styleUrls: ['./reset-password-view.component.scss']
})
export class ResetPasswordViewComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  guid: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private resetService: ResetService
  ) {}

  get f() {
    return this.resetForm.controls;
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      const options = { positionClass: 'toast-bottom-center', timeOut: 3000 };
      this.toastr.warning('Vul een email address', '', options);
      return;
    }
    this.loading = true;
    this.resetService.resetPasswordByToken(this.resetForm.get('email').value)
      .subscribe(() => {
        this.toastr.success('Mail opgestuurd!', '');
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000); // 5s
      });
  }
}
