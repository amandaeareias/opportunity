import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'


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
    @Inject(MAT_DIALOG_DATA) public currentUser,
    private fbService: FirebaseCrudService,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }

  formSubmit() {
    if (this.settingsForm.valid) {
      this.fbService.updateVolunteer(this.currentUser.user.id, this.settingsForm.value)
        .then(res => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3000,
          });
          this.dialog.close()
        })
        .catch(e => console.log('Not possible to submit, error: ', e))
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
