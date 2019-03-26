import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { FirebaseCrudService } from '../../data/services/firebase.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  ngos;
  opportunities;

  displayNgoListOnHP = {
    'margin-top': '50px',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '100vw',
    'overflow': 'scroll'
  }

  constructor(
    private service: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.getNgosByCategory('All')
    this.getOpportunitiesByCategories('All')
  }

  categoryChanged(event) {
    this.getNgosByCategory(event)
    this.getOpportunitiesByCategories(event)
  }

  getNgosByCategory(category) {
    if (!category || category == 'All') {
      this.service.getMany('ngos').subscribe(ngos => this.ngos = ngos)
    } else {
      this.service.getMany('ngos', (ref) => ref.where('category', '==', category)).subscribe(ngos => this.ngos = ngos)
    }
  }

  getOpportunitiesByCategories(category) {
    if (!category || category == 'All') {
      this.service.getMany('opportunities').subscribe(opportunities => this.opportunities = opportunities)
    } else {
      this.service.getMany('opportunities', (ref) => ref.where('category', '==', category)).subscribe(opportunities => this.opportunities = opportunities)
    }

  }

}

