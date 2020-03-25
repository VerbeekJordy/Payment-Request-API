import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEffectiveComponent } from './reset-password-effective.component';

describe('ResetPasswordEffectiveComponent', () => {
  let component: ResetPasswordEffectiveComponent;
  let fixture: ComponentFixture<ResetPasswordEffectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordEffectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordEffectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
