import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-opportunity',
  templateUrl: './edit-opportunity.component.html',
  styleUrls: ['./edit-opportunity.component.css']
})
export class EditOpportunityComponent implements OnInit {

  updateOpportunityForm = new FormGroup({
    name: new FormControl(this.opportunity.name),
    about: new FormControl(this.opportunity.about),
    location: new FormControl(this.opportunity.location),
    prerequisites: new FormControl(this.opportunity.prerequisites),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private dialog: MatDialogRef<EditOpportunityComponent>,
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    console.log(this.updateOpportunityForm.value)
    //implement updateOpportunity here
  }

  cancel() {
    this.dialog.close()
  }

  deleteOpportunity() {
    let confirmation = confirm("Are you sure you want to delete this opportunity?");
    if(confirmation) {
      console.log('delete here')
      this.dialog.close()
    }
  }

}