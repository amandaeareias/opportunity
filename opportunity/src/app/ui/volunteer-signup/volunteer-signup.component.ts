import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent {
  constructor(
    private dialogRef: MatDialogRef<VolunteerSignupComponent>,
    private snackBar: MatSnackBar
  ) {}

  formData = new FormGroup({
    nameForm: new FormControl('', [
      Validators.minLength(2),
    ]),
    aboutForm: new FormControl('', [
      Validators.minLength(20),
    ]),
    dateOfBirthForm: new FormControl('')
  });

  close() {
    this.dialogRef.close(null);
  }

  submitVolunteer() {
    const { nameForm, aboutForm, dateOfBirthForm } = this.formData.value;
    const data = {
      name: nameForm,
      about: aboutForm,
      dateOfBirth: dateOfBirthForm
    };
    
    if (this.formData.valid) {
      this.dialogRef.close(data);
      this.snackBar.open('Thanks for signing up!', 'close', {
        duration: 3000
      });
    }
  }
}
