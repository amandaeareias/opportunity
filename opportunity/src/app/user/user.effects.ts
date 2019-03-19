import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ActionTypes, LoadUserDetails } from './user.actions';
import { FirebaseCrudService } from '../data/services/firebase.service';

@Injectable()
export class UserEffects {

  @Effect()
  fetchUserData$ = this.actions$
    .pipe(
      ofType(ActionTypes.FetchUserDetails),
      /* TODO: Implement db.getUserData$. Using a mock instead */
      switchMap(({ payload }) => {
        const { logInEmail, photoURL, displayName, isNgo } = payload;
        return this.db.registerUser({
          logInEmail,
          photoURL,
          displayName,
        }, isNgo)
          .pipe(
            map(({ user, isNgo }) => new LoadUserDetails({ user, isNgo })),
            catchError(() => EMPTY)
          )
      })
    );

  constructor(
    private actions$: Actions,
    private db: FirebaseCrudService
  ) {}

}
