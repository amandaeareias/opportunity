import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNgoComponent } from './settings-ngo.component';

describe('SettingsNgoComponent', () => {
  let component: SettingsNgoComponent;
  let fixture: ComponentFixture<SettingsNgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsNgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
