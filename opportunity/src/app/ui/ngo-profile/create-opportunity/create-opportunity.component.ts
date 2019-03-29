import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../snackbar/snackbar.component'

import { MappingService } from '../../../data/services/mapping.service'
import { FirebaseCrudService } from '../../../data/services/firebase.service'

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
    location: new FormControl(this.currentUser.location.formattedAddress, Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentUser,
    private dialog: MatDialogRef<CreateOpportunityComponent>,
    private snackBar: MatSnackBar,
    private mappingService: MappingService,
    private fbService: FirebaseCrudService,
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
      const data = this.mappingService.mapOpportunityInputToProps(this.currentUser, newOpportunity)
      this.fbService.createOpportunity(data)
      this.dialog.close();
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