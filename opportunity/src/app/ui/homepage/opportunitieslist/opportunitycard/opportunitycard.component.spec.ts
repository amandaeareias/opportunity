import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitycardComponent } from './opportunitycard.component';

describe('OpportunitycardComponent', () => {
  let component: OpportunitycardComponent;
  let fixture: ComponentFixture<OpportunitycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
