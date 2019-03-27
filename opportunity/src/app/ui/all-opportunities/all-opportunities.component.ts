import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import { Opportunity } from 'src/app/data/models/opportunity.model';

@Component({
  selector: 'app-all-opportunities',
  templateUrl: './all-opportunities.component.html',
  styleUrls: ['./all-opportunities.component.css']
})
export class AllOpportunitiesComponent implements OnInit {
  private dbSubscription: Subscription;
  public opportunities: Opportunity[];

  constructor(
    private db: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.db.getMany('opportunities')
      .subscribe((opportunities: any) => {
        this.opportunities = opportunities
      });
  }

  ngOnDestroy() {
    this.dbSubscription.unsubscribe();
  }
}
