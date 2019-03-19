import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {OpportunityComponent} from '../../../ngo-profile/opportunity/opportunity.component';

@Component({
  selector: 'app-opportunitycard',
  templateUrl: './opportunitycard.component.html',
  styleUrls: ['./opportunitycard.component.css']
})
export class OpportunitycardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openOpportunity() {
    this.dialog.open(OpportunityComponent);
  }

}
