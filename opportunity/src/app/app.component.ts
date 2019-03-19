import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { getUserState, UserState } from './user/user.reducers';
import { navbarUIStateSelector } from './ui/ui.reducers';
import { LoginWithGoogle_SUCCESS, FetchUserDetails } from './user/user.actions';
import { NgoSignupComponent } from './ui/ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './ui/volunteer-signup/volunteer-signup.component';

import { FirebaseCrudService } from './data/services/firebase.service';
import { NGO } from './data/models/ngo.model';

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
    public dialog: MatDialog,
    public db: FirebaseCrudService,
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
      if (q && !this.user.isLoggedIn) {
        console.log('catch me');
        this.store.dispatch(new FetchUserDetails({
          logInEmail: q.email,
          displayName: q.displayName,
          photoURL: q.photoURL,
          isNgo: this.parseNgoUIState(this.navbarUIState),
        }));
      }
    });
  }

  parseNgoUIState(uiState: string): boolean {
    console.log(uiState, /^NGO/i.test(uiState));
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

