import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { getUserState, UserState } from './user/user.reducers';
import { navbarUIStateSelector } from './ui/ui.reducers';
import { LoginWithGoogle_SUCCESS, FetchUserDetails } from './user/user.actions';
import { NgoSignupComponent } from './ui/ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './ui/volunteer-signup/volunteer-signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user: UserState;
  private navbarUIState: string;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<any>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.select(getUserState)
      .subscribe(user => this.user = user);

    this.store.select(navbarUIStateSelector)
      .subscribe(navbarUIState => this.navbarUIState = navbarUIState);

    this.auth.authState.subscribe(q => {
      if (q) {
        this.store.dispatch(new LoginWithGoogle_SUCCESS());
      }
      if (q && !this.user.isRegistered) {
        this.store.dispatch(new FetchUserDetails({
          logInEmail: q.email,
          isNgo: this.parseNgoUIState(this.navbarUIState),
        }));
      }
    });
  }

  parseNgoUIState(uiState: string): boolean {
    return /^NGO/i.test(uiState);
  }

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

