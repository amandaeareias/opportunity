import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../snackbar/snackbar.component'

@Component({
  selector: 'app-create-opportunity',
  templateUrl: './create-opportunity.component.html',
  styleUrls: ['./create-opportunity.component.css']
})
export class CreateOpportunityComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  prerequisitesList: string[] = []

  createOpportunityForm = new FormGroup({
    name: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });

  constructor(
    private dialog: MatDialogRef<CreateOpportunityComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    if (this.createOpportunityForm.valid) {
      const newOpportunity = {
        name: this.createOpportunityForm.value.name,
        about: this.createOpportunityForm.value.about,
        location: this.createOpportunityForm.value.location,
        prerequisites: this.prerequisitesList,
      }
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.dialog.close(newOpportunity);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.prerequisitesList.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(value: string): void {
    const index = this.prerequisitesList.indexOf(value);
    if (index >= 0) {
      this.prerequisitesList.splice(index, 1);
    }
  }

}