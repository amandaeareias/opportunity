import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {getUserState } from '../../user/user.reducers'
import { SettingsNgoComponent } from './settings/settings-ngo/settings-ngo.component'
import { SettingsVolunteerComponent } from './settings/settings-volunteer/settings-volunteer.component'
import { MatDialog } from '@angular/material/dialog';

import {
  UIState,
  navbarUIStateSelector,
  navbarLoadingStateSelector
} from '../ui.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  componentUIState$: Observable<string>;
  componentLoadingState$: Observable<boolean>;
  currentUser;

  constructor(private store: Store<UIState>,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.componentUIState$ = this.store.select(navbarUIStateSelector);
    this.componentLoadingState$ = this.store.select(navbarLoadingStateSelector);
    this.store.select(getUserState).subscribe(user => this.currentUser = user)
  }

  logOut() {
    console.log('logging out')
  }

  openSettings() {
    if(this.currentUser.isNgo){
      this.dialog.open(SettingsNgoComponent, {data: this.currentUser})
    } else {
      this.dialog.open(SettingsVolunteerComponent, {data: this.currentUser})

    }
  }
}