import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from 'src/app/data/services/firebase.service'
import { Opportunity } from 'src/app/data/models/opportunity.model';
import { Application } from 'src/app/data/models/application.model';

import { NGOapplicationsComponent } from '../ngoapplications/ngoapplications.component';

@Component({
  selector: 'app-opportunity-card-admin',
  templateUrl: './opportunity-card-admin.component.html',
  styleUrls: ['./opportunity-card-admin.component.css']
})
export class OpportunityCardAdminComponent implements OnInit, OnDestroy {
  @Input()
  public opportunity: Opportunity;
  private dbApplicationsSubscription: Subscription;
  public applications: Application[];
  
  constructor(
    private db: FirebaseCrudService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.db.getAllApplicationsOfOpportunity(this.opportunity.id)
      .subscribe((result: any) => {
        this.applications = result;
      });
  }

  ngOnDestroy() {
    this.dbApplicationsSubscription && this.dbApplicationsSubscription.unsubscribe();
  }

  seeApplicants(event) {
    event.stopPropagation();
    this.dialog.open(NGOapplicationsComponent, { data: this.applications });
  }

}