import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './volunteer-signup/volunteer-signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {}

  // TODO: remove this code. Is for testing purpose only
  // this step will be included after the validation check for new users
  openDialogNGO(registrationData) {
    this.dialog.open(NgoSignupComponent, {
      data: {
        filename: registrationData ? registrationData.name : ''
      }
    });
  }

  openDialogVolunteer(registrationData) {
    this.dialog.open(VolunteerSignupComponent, {
      data: {
        filename: registrationData ? registrationData.name : ''
      }
    });
  }

}

