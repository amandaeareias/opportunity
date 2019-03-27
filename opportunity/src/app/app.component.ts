import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getUserState, UserState } from './user/user.reducers';
import { navbarUIStateSelector } from './ui/ui.reducers';
import { GOOGLE_LOGIN_SUCCESS, GET_USER_PENDING, GET_USER_LOCATION_PENDING } from './user/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private me: UserState;
  private navbarUIState: string;
  private userStateSubscription: Subscription;
  private authStateSubscription: Subscription;
  private uiStateSubscription: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.userStateSubscription = this.store.select(getUserState)
      .subscribe(user => {
        this.me = user;
        if (!user.location) {
          this.store.dispatch(new GET_USER_LOCATION_PENDING());
        }
      });

    this.uiStateSubscription = this.store.select(navbarUIStateSelector)
      .subscribe(navbarUIState => this.navbarUIState = navbarUIState);

    this.authStateSubscription = this.auth.authState.subscribe(authResponse => {
      if (authResponse) {
        this.store.dispatch(new GOOGLE_LOGIN_SUCCESS());
        if (!this.me.isLoggedIn) {
          this.store.dispatch(new GET_USER_PENDING({
            logInEmail: authResponse.email,
            displayName: authResponse.displayName,
            photoURL: authResponse.photoURL,
            isNgo: this.parseNgoUIState(this.navbarUIState),
          }));
        }
      }
    });
  }

  /* Being responsible developers, we unsubscribe all subscriptions */
  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
    this.uiStateSubscription.unsubscribe();
  }

  /* @TODO: Move helper functions to the dedicated service */
  parseNgoUIState(uiState: string): boolean {
    return /^NGO/i.test(uiState);
  }

}

