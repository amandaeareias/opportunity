import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { UserState } from 'src/app/user/user.reducers';

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent {

  public formData: FormGroup = new FormGroup({
    name: new FormControl(this.currentUser.user ? this.currentUser.user.name : ''),
    about: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser: UserState,
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
