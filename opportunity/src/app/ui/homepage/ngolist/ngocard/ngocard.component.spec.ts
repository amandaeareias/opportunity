import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgocardComponent } from './ngocard.component';

describe('NgocardComponent', () => {
  let component: NgocardComponent;
  let fixture: ComponentFixture<NgocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
