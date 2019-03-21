import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'

@Component({
  selector: 'app-edit-opportunity',
  templateUrl: './edit-opportunity.component.html',
  styleUrls: ['./edit-opportunity.component.css']
})
export class EditOpportunityComponent implements OnInit {

  updateOpportunityForm = new FormGroup({
    name: new FormControl(this.opportunity.name, Validators.required),
    about: new FormControl(this.opportunity.about, Validators.required),
    location: new FormControl(this.opportunity.location, Validators.required),
    prerequisites: new FormControl(this.opportunity.prerequisites),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private dialog: MatDialogRef<EditOpportunityComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    if(this.updateOpportunityForm.valid) {
      console.log('implement update opportunity function/db')
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.dialog.close()
    }
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