import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { HomepageComponent } from '../homepage.component'

@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {

  @Input() opportunities;

  constructor(
    private fbService: FirebaseCrudService,
    private homePage: HomepageComponent,
  ) { }

  ngOnInit() {
  }

}
