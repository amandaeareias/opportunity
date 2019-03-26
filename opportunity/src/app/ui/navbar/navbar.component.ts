import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { getUserState } from '../../user/user.reducers'
import { USER_LOGOUT_PENDING, UPDATE_USER_PENDING } from '../../user/user.actions';

import { SettingsNgoComponent } from './settings/settings-ngo/settings-ngo.component'
import { SettingsVolunteerComponent } from './settings/settings-volunteer/settings-volunteer.component'
import { NgoSignupComponent } from '../ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from '../volunteer-signup/volunteer-signup.component';

import {
  navbarUIStateSelector,
  navbarLoadingStateSelector
} from '../ui.reducers';
import { GeocodeService } from 'src/app/data/services/google-maps/geocode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  componentUIState$: Observable<string>;
  componentLoadingState$: Observable<boolean>;
  currentUser;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private maps: GeocodeService,
  ) {}

  ngOnInit() {
    this.componentUIState$ = this.store.select(navbarUIStateSelector);
    this.componentLoadingState$ = this.store.select(navbarLoadingStateSelector);
    this.store.select(getUserState).subscribe(user => {
      this.currentUser = user;
      /* Account for the case when user is null */
      if (user.user) {
        if (!user.user.isComplete) {
          const dialogRef = this.openSignUpForm(user.isNgo ? NgoSignupComponent : VolunteerSignupComponent);

          dialogRef.afterClosed()
            .subscribe((data = {}) => {
              if (user.isNgo) {
                this.maps.getLocation(data.contact.address)
                  .subscribe(res => {
                    this.updateProfile(
                      user.user.id,
                      user.isNgo,
                      { ...data, isComplete: true, location: res }
                    );
                  });
              } else {
                this.updateProfile(
                  this.currentUser.user.id,
                  this.currentUser.isNgo,
                  { ...data, isComplete: true }
                );
              }
            });
        }
      }
    });
  }

  logOut() {
    this.store.dispatch(new USER_LOGOUT_PENDING());
  }

  openSettings() {
    if(this.currentUser.isNgo){
      this.dialog.open(SettingsNgoComponent, {data: this.currentUser})
    } else {
      this.dialog.open(SettingsVolunteerComponent, {data: this.currentUser})
    }
  }

  openSignUpForm(component) {
    return this.dialog.open(component, { disableClose: true });
  }

  updateProfile(id, isNgo, data) {
    this.store.dispatch(new UPDATE_USER_PENDING({
      id,
      isNgo,
      data,
    }));
  }
}