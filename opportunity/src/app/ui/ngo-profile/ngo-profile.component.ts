import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateOpportunityComponent} from './create-opportunity/create-opportunity.component';

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCreateOpportunity() {
    this.dialog.open(CreateOpportunityComponent);
  }

}
