import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OpportunityComponent } from '../../../ngo-profile/opportunity/opportunity.component';

@Component({
  selector: 'app-opportunitycard',
  templateUrl: './opportunitycard.component.html',
  styleUrls: ['./opportunitycard.component.css']
})
export class OpportunitycardComponent implements OnInit {

  @Input() opportunity;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // console.log('xxx: ', this.opportunity)
  }

  openOpportunity() {
    this.dialog.open(OpportunityComponent, {data: this.opportunity});
  }

}
