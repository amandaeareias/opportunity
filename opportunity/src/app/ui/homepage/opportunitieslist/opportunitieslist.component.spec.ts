import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitieslistComponent } from './opportunitieslist.component';

describe('OpportunitieslistComponent', () => {
  let component: OpportunitieslistComponent;
  let fixture: ComponentFixture<OpportunitieslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitieslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
