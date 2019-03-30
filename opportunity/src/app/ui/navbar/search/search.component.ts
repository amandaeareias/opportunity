import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { NGO } from 'src/app/data/models/ngo.model';
import { Opportunity } from 'src/app/data/models/opportunity.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  private dbNgosSubscription: Subscription;
  private dbOpportunitiesSubscription: Subscription;
  public newPath: string;
  public ngos: NGO[];
  public opportunities: Opportunity[];

  displayNgoListOnHP = {
    'margin-top': '50px',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '100vw',
    'overflow': 'scroll'
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe((routeParams: Params) => {
        this.newPath = routeParams.path;
        this.checkPath();
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription && this.routeParamsSubscription.unsubscribe();
    this.dbNgosSubscription && this.dbNgosSubscription.unsubscribe();
    this.dbOpportunitiesSubscription && this.dbOpportunitiesSubscription.unsubscribe();
  }

  checkPath() {
    if (this.newPath.length < 1) {
      this.router.navigate(['']);
    } else {
      this.dbNgosSubscription = this.db.search('ngos', 'name', this.newPath)
        .subscribe((result: NGO[]) => {
          this.ngos = result;
        })
      this.dbOpportunitiesSubscription = this.db.search('opportunities', 'name',this.newPath)
        .subscribe((result: Opportunity[]) => {
          this.opportunities = result;
        })
    }
  }

}
