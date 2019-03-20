import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {getUserState } from '../../user/user.reducers'


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

  constructor(private store: Store<UIState>) {}

  ngOnInit() {
    this.componentUIState$ = this.store.select(navbarUIStateSelector);
    this.componentLoadingState$ = this.store.select(navbarLoadingStateSelector);
    this.store.select(getUserState).subscribe(user => this.currentUser = user)
  }

  logOut() {
    console.log('logging out')
  }
}