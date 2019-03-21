import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { getUserState, UserState } from './user/user.reducers';
import { navbarUIStateSelector } from './ui/ui.reducers';
import { LoginWithGoogle_SUCCESS, CheckUserIfExisting } from './user/user.actions';
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

    this.auth.authState.subscribe(authResponse => {
      if (authResponse) {
        this.store.dispatch(new LoginWithGoogle_SUCCESS());
        if (!this.user.isLoggedIn) {
          this.store.dispatch(new CheckUserIfExisting({
            username: authResponse.email,
            displayName: authResponse.displayName,
            photoURL: authResponse.photoURL,
            isNgo: this.parseNgoUIState(this.navbarUIState),
            isComplete: true
          }));
        }
      }
      /* No else case, as it's fine to keep default state if no auth */
    });
  }

  /* @TODO: Move helper functions to the dedicated service */
  parseNgoUIState(uiState: string): boolean {
    return /^NGO/i.test(uiState);
  }

}

