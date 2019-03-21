import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { Store } from '@ngrx/store';
import { UserState, getUserState } from 'src/app/user/user.reducers';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { Volunteer } from 'src/app/data/models/volunteer.model';

@Component({
  selector: 'app-volunteer-signup',
  templateUrl: './volunteer-signup.component.html',
  styleUrls: ['./volunteer-signup.component.css']
})
export class VolunteerSignupComponent implements OnInit {
  userData: Volunteer;
  constructor(
    private dialogRef: MatDialogRef<VolunteerSignupComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private snackBar: MatSnackBar,
    private db: FirebaseCrudService,
    private userStore: Store<UserState>
  ) {}

  volunteerProfile = new FormGroup({
    nameForm: new FormControl('', [Validators.minLength(2)]),
    aboutForm: new FormControl('', [Validators.minLength(20)]),
    dateOfBirthForm: new FormControl('')
  });

  ngOnInit() {}

  close(): void {
    this.dialogRef.close(false);
  }

  async submitVolunteer() {
    const volunteerExtraFields = this.volunteerProfile.value;
    const formResult = {
      name: volunteerExtraFields.nameForm,
      about: volunteerExtraFields.aboutForm,
      dateOfBirth: volunteerExtraFields.dateOfBirthForm
    };
    this.userStore.select(getUserState).subscribe(data => {
      const googleAuthData = data.user;
      this.userData = { ...googleAuthData, ...formResult };
    });

    if (this.volunteerProfile.valid) {
      await this.db.createVolunteer(this.userData);
      this.dialogRef.close(true);
      this.snackBar.open('You just joined our opprtunities network!', 'close', {
        duration: 4000
      });
    } else {
      console.log('form invalid');
    }
  }
}
