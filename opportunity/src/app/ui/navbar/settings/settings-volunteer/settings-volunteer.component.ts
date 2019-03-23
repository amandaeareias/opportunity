import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { UPDATE_USER_PENDING, USER_LOGOUT_PENDING } from 'src/app/user/user.actions';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';


@Component({
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent {

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private db: FirebaseCrudService,
    private snackBar: MatSnackBar,
  ) {}

  formSubmit() {
    if (this.settingsForm.valid) {
      this.store.dispatch(new UPDATE_USER_PENDING({
        id: this.currentUser.user.id,
        isNgo: this.currentUser.isNgo,
        data: { ...this.settingsForm.value },
      }));
      this.dialog.close();
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
    }
  }

  deleteProfile() {
    let confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.dialog.close();
      this.store.dispatch(new USER_LOGOUT_PENDING());
      this.db.deleteVolunteer(this.currentUser.user.id);
    }
  }

}
