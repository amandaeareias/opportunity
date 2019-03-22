import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGOapplicationsComponent } from './ngoapplications.component';

describe('NGOapplicationsComponent', () => {
  let component: NGOapplicationsComponent;
  let fixture: ComponentFixture<NGOapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NGOapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGOapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
