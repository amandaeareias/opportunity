import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent implements OnInit {
  isValid = true;
  constructor(
    private dialogRef: MatDialogRef<VolunteerSignupComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}


  volunteerProfile = new FormGroup({
    nameForm: new FormControl('', [
      Validators.minLength(2)
    ]),
    aboutForm: new FormControl('', [
      Validators.minLength(20)
    ]),
    dateOfBirthForm: new FormControl('', [Validators.required])
  });

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }

  submitVolunteer() {
    const volunteerExtraFields = this.volunteerProfile.value;
    const formResult = {
      name: volunteerExtraFields.nameForm,
      about: volunteerExtraFields.aboutForm,
      dateOfBirth: volunteerExtraFields.dateOfBirthForm
    };
    console.log(formResult, 'user log');
  }
}
