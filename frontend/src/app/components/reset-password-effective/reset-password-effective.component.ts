import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetService} from '../../services/reset.service';
import {ResetModel} from '../../models/reset.model';

@Component({
  selector: 'app-reset-password-effective',
  templateUrl: './reset-password-effective.component.html',
  styleUrls: ['./reset-password-effective.component.scss']
})
export class ResetPasswordEffectiveComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  guid: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private resetService: ResetService,
    private route: ActivatedRoute
  ) {}

  get f() {
    return this.resetForm.controls;
  }

  ngOnInit() {
    this.guid = this.route.snapshot.params.guid;
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]]
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
    this.resetService.resetPassword(new ResetModel(this.resetForm.get('password').value, this.guid))
      .subscribe(() => {
        this.toastr.success('Wachtwoord is aangepast!', '');
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000); // 5s
      });
  }
}
