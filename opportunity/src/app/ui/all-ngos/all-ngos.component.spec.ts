import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNgosComponent } from './all-ngos.component';

describe('AllNgosComponent', () => {
  let component: AllNgosComponent;
  let fixture: ComponentFixture<AllNgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
