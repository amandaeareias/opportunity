import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { HomepageComponent } from '../homepage.component'

@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {

  opportunities;

  constructor(
    private fbService: FirebaseCrudService,
    private homePage: HomepageComponent,
  ) { }

  ngOnInit() {
    this.homePage.cast.subscribe(category => this.getOpportunities(category))
  }

  getOpportunities(category) {
    this.fbService.getMany('opportunities').subscribe(opportunities => {
      this.opportunities = opportunities;
    })
  }

}
