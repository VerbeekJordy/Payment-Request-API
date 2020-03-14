import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewMenuComponent } from './overview-menu.component';

describe('OverviewMenuComponent', () => {
  let component: OverviewMenuComponent;
  let fixture: ComponentFixture<OverviewMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
