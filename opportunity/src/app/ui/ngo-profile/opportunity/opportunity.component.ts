import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { inject } from '@angular/core/testing';


@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  @Input()dialogConfig;

  constructor(
    private dialogRef: MatDialogRef<OpportunityComponent>,
    @Inject(MAT_DIALOG_DATA) public opportunity
  ) { }

  ngOnInit() {
    console.log('xx', this.opportunity)
  }

}
