import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVolunteerComponent } from './settings-volunteer.component';

describe('SettingsVolunteerComponent', () => {
  let component: SettingsVolunteerComponent;
  let fixture: ComponentFixture<SettingsVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
