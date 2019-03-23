import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { Store } from '@ngrx/store';
import { UPDATE_USER_PENDING, USER_LOGOUT_PENDING } from 'src/app/user/user.actions';


@Component({
  selector: 'app-settings-ngo',
  templateUrl: './settings-ngo.component.html',
  styleUrls: ['./settings-ngo.component.css']
})
export class SettingsNgoComponent {

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about, Validators.required),
    address: new FormControl(this.currentUser.user.contact.address, Validators.required),
    phone: new FormControl(this.currentUser.user.contact.phone, Validators.required),
    website: new FormControl(this.currentUser.user.contact.website),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private db: FirebaseCrudService,
    private dialog: MatDialogRef<SettingsNgoComponent>,
    private snackBar: MatSnackBar,
  ) {}

  formSubmit() {
    if (this.settingsForm.valid) {
      const data = {
        name: this.settingsForm.value.name,
        about: this.settingsForm.value.about,
        contact: {
          address: this.settingsForm.value.address,
          phone: this.settingsForm.value.phone,
          website: this.settingsForm.value.website,
        }
      };

      this.store.dispatch(new UPDATE_USER_PENDING({
        id: this.currentUser.user.id,
        isNgo: this.currentUser.isNgo,
        data,
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
      this.db.deleteNGO(this.currentUser.user.id);
    }
  }

}