import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'

@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {

  opportunities;

  constructor(
    private fbService: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.getOpportunities()
  }

  getOpportunities() {
    this.fbService.getMany('opportunities').subscribe(opportunities => {
      this.opportunities = opportunities;
    })
  }

}
