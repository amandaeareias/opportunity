import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  ActionTypes,
  GET_USER_SUCCESS,
  USER_LOGOUT_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_USER_LOCATION_SUCCESS,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
} from './user.actions';
import { LoginService } from './user-auth/login.service';
import { FirebaseCrudService } from '../data/services/firebase.service';
import { IpGeoLocationService } from './ipgeolocation/ipgeolocation.service';
import { TOGGLE_GLOBAL_PLACEHOLDER } from '../ui/ui.actions';

@Injectable()
export class UserEffects {

  @Effect()
  fetchUserData$ = this.actions$
    .pipe(
      ofType(ActionTypes.GET_USER_PENDING),
      switchMap(({ payload }) => {
        const { logInEmail, photoURL, displayName, isNgo } = payload;
        return this.auth.registerUser({
          logInEmail,
          photoURL,
          displayName,
        }, isNgo)
        /* Pipe result of registerUser to get only the first response */
        /* This fixes a bug of double-response triggered by real-time DB */
        /* @TODO: Add catchError logic instead of returning EMPTY */
          .pipe(
            first(),
            map(({ user, isNgo }) => new GET_USER_SUCCESS({ user, isNgo })),
            // catchError((err) => new GET_USER_FAILURE(err)),
          );
      })
    );

  @Effect()
  userLogout$ = this.actions$
    .pipe(
      ofType(ActionTypes.USER_LOGOUT_PENDING),
      switchMap(() => {
        return from(this.auth.signOut())
          .pipe(
            map(() => new USER_LOGOUT_SUCCESS()),
            // catchError((err) => new USER_LOGOUT_FAILURE(err)),
          )
      }),
    );

  @Effect()
  updateUser$ = this.actions$
    .pipe(
      ofType(ActionTypes.UPDATE_USER_PENDING),
      switchMap(({ payload }) => {
        const { id, isNgo, data } = payload;
        console.log('payload: ', payload)
        const update$ = isNgo ? from(this.db.updateNGO(id, data)) : from(this.db.updateVolunteer(id, data));
        return update$
          .pipe(
            map(() => {
              console.log('data: ', data)
              return new UPDATE_USER_SUCCESS(data)}),
          )
      }),
    );

  @Effect()
  getUserLocation = this.actions$
    .pipe(
      ofType(ActionTypes.GET_USER_LOCATION_PENDING),
      switchMap(() => {
        return this.ipGeoLocation.getLocation()
          .pipe(
            map((data) => new GET_USER_LOCATION_SUCCESS(data)),
          )
      }),
    );

  @Effect()
  deleteUserLogout = this.actions$
    .pipe(
      ofType(ActionTypes.DELETE_USER_LOGOUT),
      switchMap((action: any) => {
        return from(this.auth.signOut())
          .pipe(
            map(() => {
              this.store.dispatch(new USER_LOGOUT_SUCCESS());
              this.store.dispatch(new TOGGLE_GLOBAL_PLACEHOLDER());
              return new DELETE_USER_PENDING(action.payload);
            }),
          )
      }),
    );

  @Effect()
  deleteUser = this.actions$
    .pipe(
      ofType(ActionTypes.DELETE_USER_PENDING),
      switchMap((action: any) => {
        const subscription$ = action.payload.isNgo
          ? of(this.db.deleteNGO(action.payload.id))
          : of(this.db.deleteVolunteer(action.payload.id));
        return subscription$
          .pipe(
            map(() => {
              this.store.dispatch(new TOGGLE_GLOBAL_PLACEHOLDER());
              return new DELETE_USER_SUCCESS();
            }),
          )
      }),
    );

  constructor(
    private actions$: Actions,
    private auth: LoginService,
    private db: FirebaseCrudService,
    private ipGeoLocation: IpGeoLocationService,
    private store: Store<any>,
  ) {}

}
