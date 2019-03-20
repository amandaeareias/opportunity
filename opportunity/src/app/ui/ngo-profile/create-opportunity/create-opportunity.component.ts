import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

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
    name: new FormControl(''),
    about: new FormControl(''),
    location: new FormControl('')
  });

  constructor(
    private dialog: MatDialogRef<CreateOpportunityComponent>
    ) { }

  ngOnInit() {
  }

  formSubmit() {
    const newOpportunity = {
      name: this.createOpportunityForm.value.name,
      about: this.createOpportunityForm.value.about,
      location: this.createOpportunityForm.value.location,
      prerequisites: this.prerequisitesList,
    }
    this.dialog.close(newOpportunity);
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