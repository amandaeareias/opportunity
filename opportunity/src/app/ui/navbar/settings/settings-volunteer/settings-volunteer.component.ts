import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { UPDATE_USER_PENDING } from 'src/app/user/user.actions';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';


@Component({
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent implements OnInit {

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private fbService: FirebaseCrudService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }

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
    let confirmation = confirm("Are you sure you want to delegite this account?");
    if (confirmation) {
      //implement log-out!!
      this.fbService.deleteVolunteer(this.currentUser.user.id)
    }
  }

}
