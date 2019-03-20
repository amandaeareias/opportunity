import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

import { FirebaseCrudService } from '../../../data/services/firebase.service'

export interface Fruit {
  name: string;
}

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

  constructor(private dialog: MatDialog,
    private service: FirebaseCrudService,
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
    this.dialog.closeAll();
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

  remove(fruit: string): void {
    const index = this.prerequisitesList.indexOf(fruit);
    if (index >= 0) {
      this.prerequisitesList.splice(index, 1);
    }
  }

}