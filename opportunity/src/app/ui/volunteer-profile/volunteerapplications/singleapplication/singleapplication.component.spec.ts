import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleapplicationComponent } from './singleapplication.component';

describe('SingleapplicationComponent', () => {
  let component: SingleapplicationComponent;
  let fixture: ComponentFixture<SingleapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
