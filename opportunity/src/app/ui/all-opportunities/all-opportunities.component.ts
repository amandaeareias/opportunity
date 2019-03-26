import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from '../../data/services/firebase.service'

@Component({
  selector: 'app-all-opportunities',
  templateUrl: './all-opportunities.component.html',
  styleUrls: ['./all-opportunities.component.css']
})
export class AllOpportunitiesComponent implements OnInit {

  opportunities;

  constructor(
    private service: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.getOpportunities()
  }

  getOpportunities() {
    this.service.getMany('opportunities').subscribe(opportunities => this.opportunities = opportunities)
  }

}
