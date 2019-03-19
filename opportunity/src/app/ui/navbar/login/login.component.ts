import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdateLoadingState, UpdateUIState } from '../../ui.actions';
import { UIState } from '../../ui.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private store: Store<UIState>
  ) {}

  loginGoogle(isNgo: boolean) {
    this.store.dispatch(new UpdateLoadingState({
      component: 'navbar',
      loadingState: true,
    }));
    this.store.dispatch(new UpdateUIState({
      component: 'navbar',
      uiState: isNgo ? 'NGO_SIGNIN' : 'VOL_SIGNIN',
    }));
  }
}
