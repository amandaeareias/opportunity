import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSignupComponent } from './volunteer-signup.component';

describe('VolunteerSignupComponent', () => {
  let component: VolunteerSignupComponent;
  let fixture: ComponentFixture<VolunteerSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
