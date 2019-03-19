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
      switchMap((action) => of({
        isNgo: true,
        isRegistered: false,
        displayName: 'Igor Snitkin',
        logInEmail: 'igor@snitkin.com',
        photoURL: 'http://linktomyphoto.com',
      }) // this.db.getUserData$(action.payload)
        .pipe(
          map(userDetails => new LoadUserDetails(userDetails)),
          catchError(() => EMPTY)
        )
      )
    );

  constructor(
    private actions$: Actions,
    private db: FirebaseCrudService
  ) {}

}
