import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCheckoutComponent } from './regular-checkout.component';

describe('RegularCheckoutComponent', () => {
  let component: RegularCheckoutComponent;
  let fixture: ComponentFixture<RegularCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
