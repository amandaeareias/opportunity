import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service'

import { NGO } from 'src/app/data/models/ngo.model';
import { Opportunity } from 'src/app/data/models/opportunity.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  private _ngoCache: NGO[] = [];
  private _opportunityCache: Opportunity[] = [];
  private ngosSubscription: Subscription;
  private opportunitiesSubscription: Subscription;
  public ngos: NGO[];
  public opportunities: Opportunity[];
  /* Pass css styles to NGOList Component */
  public displayNgoListOnHP: any = {
    'margin-top': '50px',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '100vw',
    'overflow': 'scroll'
  };

  constructor(
    private db: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.ngosSubscription = this.db.getMany('ngos')
      .subscribe((ngos: any) => {
        this._ngoCache = ngos;
        this.ngos = ngos;
      });
    
    this.opportunitiesSubscription = this.db.getMany('opportunities')
      .subscribe((opportunities: any) => {
        this._opportunityCache = opportunities;
        this.opportunities = opportunities;
      });
  }

  ngOnDestroy() {
    this.ngosSubscription.unsubscribe();
    this.opportunitiesSubscription.unsubscribe();
  }

  onCategoryChange(category: string): void {
    this.filterByCategory(category);
  }

  filterByCategory(category: string): void {
    if (category !== 'All') {
      this.ngos = this._ngoCache.filter(ngo => ngo && ngo.category === category);
      this.opportunities = this._opportunityCache.filter(opportunity => opportunity && opportunity.category === category);
    } else {
      this.ngos = this._ngoCache;
      this.opportunities = this._opportunityCache;
    }
  }
}

