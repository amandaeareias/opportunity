import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, first } from 'rxjs/operators';

import { ActionTypes, ReturnUserWithCompletionStatus } from './user.actions';
import { LoginService } from './user-auth/login.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private auth: LoginService,
  ) {}


  @Effect()
  fetchUserData$ = this.actions$
    .pipe(
      ofType(ActionTypes.CheckUserIfExisting),
      /* TODO: Implement db.getUserData$. Using a mock instead */
      switchMap(({ payload }) => {
        const { username, photoURL, displayName, isNgo } = payload;
        return this.auth.checkIfUserExists({
          username,
          photoURL,
          displayName,
        }, isNgo)
        /* Pipe result of registerUser to get only the first response */
        /* This fixes a bug of double-response triggered by real-time DB */
        /* @TODO: Add catchError logic instead of returning EMPTY */
          .pipe(
            first(),
            map(({ user, isNgo }) => new ReturnUserWithCompletionStatus({ user, isNgo })),
            catchError(() => EMPTY),
          );
      })
    );

}
