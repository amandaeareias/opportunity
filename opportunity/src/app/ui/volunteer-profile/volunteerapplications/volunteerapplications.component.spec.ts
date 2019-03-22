import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerapplicationsComponent } from './volunteerapplications.component';

describe('VolunteerapplicationsComponent', () => {
  let component: VolunteerapplicationsComponent;
  let fixture: ComponentFixture<VolunteerapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
