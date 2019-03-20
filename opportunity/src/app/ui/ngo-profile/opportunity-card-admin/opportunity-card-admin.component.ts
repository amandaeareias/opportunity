import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-card-admin',
  templateUrl: './opportunity-card-admin.component.html',
  styleUrls: ['./opportunity-card-admin.component.css']
})
export class OpportunityCardAdminComponent implements OnInit {

  @Input() opportunity;
  constructor() { }

  ngOnInit() {
  }

  x() {
    console.log(this.opportunity)
  }

}
