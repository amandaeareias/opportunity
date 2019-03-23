import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  });

  prerequisitesList: string[] = this.opportunity.prerequisites;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private dialog: MatDialogRef<EditOpportunityComponent>,
    private snackBar: MatSnackBar,
    private fbService: FirebaseCrudService,
  ) { }

  ngOnInit() {

  }

  formSubmit() {
    if (this.updateOpportunityForm.valid) {
      let newOpp = {
        ...this.updateOpportunityForm.value,
        prerequisites: this.prerequisitesList
      }
      this.fbService.updateOpportunity(this.opportunity.id, newOpp)
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
    console.log(this.opportunity)
    let confirmation = confirm("Are you sure you want to delete this opportunity?");
    if (confirmation) {
      this.fbService.deleteOpportunity(this.opportunity.id, this.opportunity.ngo.id)
      this.dialog.close()
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