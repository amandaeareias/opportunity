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
import { MappingService } from './data/services/mapping.service';

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
    public mapper: MappingService,
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
          this.store.dispatch(new FetchUserDetails({
            logInEmail: authResponse.email,
            displayName: authResponse.displayName,
            photoURL: authResponse.photoURL,
            isNgo: this.parseNgoUIState(this.navbarUIState),
          }));
        }
      }
      /* No else case, as it's fine to keep default state if no auth */
    });

    //TO BE DELETED

    this.db.deleteVolunteer('U7PosfvVXPLelZZe3vkm');
    // console.log("here")
    // this.db.createApplication(this.mapper.mapApplicationInputToProps({
    //   volunteerId: 'A4oCTZQRm90E7G5SwuFG',
    //   opportunityId: '09sgwsfd4DHFLEjFBjpQ',
    //   text: 'please, let it work',
    // }));
    // this.db.createOpportunity(this.mapper.mapOpportunityInputToProps({
    //   id: 'zB1wkI6n9yhfBhGwSPNX',
    //   name: 'Igor Snitkin',
    //   image: 'photo',
    // }, {
    //   name: 'English for kids',
    //   about: 'Something',
    //   location: 'Somewhere',
    //   prerequisites: ['English', 'kids'],
    // }));
  }

  /* @TODO: Move helper functions to the dedicated service */
  parseNgoUIState(uiState: string): boolean {
    return /^NGO/i.test(uiState);
  }

}

