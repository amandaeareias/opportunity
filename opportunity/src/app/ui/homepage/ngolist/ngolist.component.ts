import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { HomepageComponent } from '../homepage.component'

@Component({
  selector: 'app-ngolist',
  templateUrl: './ngolist.component.html',
  styleUrls: ['./ngolist.component.css']
})
export class NgolistComponent implements OnInit {

  @Input() ngos;

  constructor(
    private service: FirebaseCrudService,
    private homePage: HomepageComponent,
  ) { }

  ngOnInit() {
  }

}