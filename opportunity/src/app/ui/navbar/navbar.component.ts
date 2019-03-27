import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, Subject, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap, delay } from 'rxjs/operators';

import { GeocodeService } from 'src/app/data/services/google-maps/geocode.service';

import { getUserState, UserState } from 'src/app/user/user.reducers'
import { USER_LOGOUT_PENDING, UPDATE_USER_PENDING } from 'src/app/user/user.actions';

import { SettingsNgoComponent } from './settings/settings-ngo/settings-ngo.component'
import { SettingsVolunteerComponent } from './settings/settings-volunteer/settings-volunteer.component'
import { NgoSignupComponent } from '../ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from '../volunteer-signup/volunteer-signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public keyUp$ = new Subject<KeyboardEvent>();
  public currentUser: UserState;
  public searchPath: string;
  private userStateSubscription: Subscription;
  private signupFormSubscription: Subscription;
  private ipLocationSubscription: Subscription;
  private keyUpSubscription: Subscription;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private router: Router,
    private maps: GeocodeService,
  ) {}

  ngOnInit() {
    this.userStateSubscription = this.store.select(getUserState).subscribe(user => {
      this.currentUser = user;
      /* Account for the case when user is null */
      if (user.user) {
        if (!user.user.isComplete) {
          const dialogRef = this.openSignUpForm(user.isNgo ? NgoSignupComponent : VolunteerSignupComponent);

          this.signupFormSubscription = dialogRef.afterClosed()
            .subscribe((data = {}) => {
              if (user.isNgo) {
                this.ipLocationSubscription = this.maps.getLocation(data.contact.address)
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
    this.keyUpSubscription = this.keyUp$
      .pipe(
        map((e:any) => e.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        mergeMap(searchValue => of(searchValue)
          .pipe(
            delay(100),
          )),
      ).subscribe(() => {
        this.keyUpSearch();
      })
  }

  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
    this.signupFormSubscription.unsubscribe();
    this.ipLocationSubscription.unsubscribe();
    this.keyUpSubscription.unsubscribe();
  }

  logOut() {
    this.store.dispatch(new USER_LOGOUT_PENDING());
    this.router.navigate(['']);
  }

  openSettings() {
    if(this.currentUser.isNgo){
      this.dialog.open(SettingsNgoComponent, { data: this.currentUser })
    } else {
      this.dialog.open(SettingsVolunteerComponent, { data: this.currentUser })
    }
  }

  openSignUpForm(component) {
    return this.dialog.open(component, { disableClose: true, data: this.currentUser.user });
  }

  keyUpSearch() {
    this.router.navigate(['/search', this.searchPath]);
  }

  updateProfile(id, isNgo, data) {
    this.store.dispatch(new UPDATE_USER_PENDING({
      id,
      isNgo,
      data,
    }));
  }
}