import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetService} from '../../services/reset.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetModel} from '../../models/reset.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  guid: string;

  constructor(private resetService: ResetService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.guid = this.route.snapshot.params.guid;
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required])
    });
  }

  submit(form): void {
    this.resetService.resetPassword(new ResetModel(form.value.password, this.guid));
    this.router.navigateByUrl('/home');
  }
}
