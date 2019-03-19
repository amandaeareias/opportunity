import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityCardAdminComponent } from './opportunity-card-admin.component';

describe('OpportunityCardAdminComponent', () => {
  let component: OpportunityCardAdminComponent;
  let fixture: ComponentFixture<OpportunityCardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityCardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
