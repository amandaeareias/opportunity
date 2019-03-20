import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-opportunity',
  templateUrl: './create-opportunity.component.html',
  styleUrls: ['./create-opportunity.component.css']
})
export class CreateOpportunityComponent implements OnInit {

  createOpportunityForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    preRequisites: new FormControl(''),
  });

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  formSubmit() {
    console.log(this.createOpportunityForm.value);
    this.dialog.closeAll();
  }

}
