import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { userDetailsSelector } from '../../user/user.reducers'

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent implements OnInit {

  currentUser;
  formData;

  constructor(
    private dialogRef: MatDialogRef<VolunteerSignupComponent>,
    private snackBar: MatSnackBar,
    private store: Store<any>,
  ) {
  }

  ngOnInit() {
    this.getUser()
  }

  createFormData() {
    this.formData = new FormGroup({
      nameForm: new FormControl(this.currentUser.name),
      aboutForm: new FormControl(''),
      dateOfBirthForm: new FormControl('')
    });
  }

  getUser() {
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        this.currentUser = user;
        this.createFormData()
      })
  }

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
