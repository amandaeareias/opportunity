import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Volunteer } from 'src/app/data/models/volunteer.model';
import { NGO } from 'src/app/data/models/ngo.model';

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent {

  public formData: FormGroup = new FormGroup({
    name: new FormControl(this.currentUser ? this.currentUser.name : ''),
    about: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser: Volunteer | NGO,
    private dialogRef: MatDialogRef<VolunteerSignupComponent>,
    private snackBar: MatSnackBar,
  ) {
  }

  close() {
    this.dialogRef.close();
  }

  submitVolunteer() {
    const { name, about, dateOfBirth } = this.formData.value;
    const data = {
      name,
      about,
      dateOfBirth,
    };

    if (this.formData.valid) {
      this.dialogRef.close(data);
      this.snackBar.open('Thanks for signing up!', 'close', {
        duration: 3000
      });
    }
  }
}
