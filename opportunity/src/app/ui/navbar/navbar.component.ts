import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  constructor(private store: Store<UIState>) {}

  ngOnInit() {
    this.componentUIState$ = this.store.select(navbarUIStateSelector);
    this.componentLoadingState$ = this.store.select(navbarLoadingStateSelector);
  }
}
