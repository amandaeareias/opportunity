import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, EMPTY, combineLatest } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import {
  GoogleLogin,
  ActionTypes,
  MarkAsNgo,
  UpdateUserDetails
} from "./user.actions";
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap
} from "rxjs/operators";
import { UserState, isNgoSelector } from "./user.reducers";
import { FirebaseCrudService } from "../services/firebase.service";
import { NGO, NgoCollection } from "../models/ngo.model";
import { Volunteer, VolunteerCollection } from "../models/volunteer.model";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private firebaseAuth: AngularFireAuth,
    private store: Store<UserState>,
    private firebaseCrudService: FirebaseCrudService
  ) {}

  @Effect() onGoogleLogin$: Observable<Action> = this.actions$.pipe(
    ofType<GoogleLogin>(ActionTypes.GoogleLogin),
    map(action => action.payload),
    switchMap(isNgo => {
      this.loginWithGoogle();
      // check user role type

      // check in the volunteer/NGO DB if user exist

      // if yes redirect the user to register step

      // else welcome user
      return of(new MarkAsNgo(isNgo));
    })
  );

  @Effect() onUpdateUserDetails$: Observable<
    Action | never
  > = this.actions$.pipe(
    ofType<UpdateUserDetails>(ActionTypes.UpdateUserDetails),
    tap(() => console.log("hit onUpdateUserDetails")),
    map(action => action.payload.email),
    switchMap(email => {
      return combineLatest(
        this.firebaseCrudService
          .getMany<NGO>(NgoCollection, ref =>
            ref.where("username", "==", email)
          )
          .valueChanges(),

        this.firebaseCrudService
          .getMany<Volunteer>(VolunteerCollection, ref =>
            ref.where("username", "==", email)
          )
          .valueChanges()
      ).pipe(
        map(([ngoData, volunteerData]) => {
          // if (ngoData.length && volunteerData)
          if (ngoData.length > 0) {
            return { isNgo: true };
          } else if (volunteerData.length > 0) {
            return { isNgo: false };
          }
          return null;
        })
      );
    }),
    withLatestFrom(this.store.select(isNgoSelector)),
    switchMap(([user, isNgo]) => {
      if (!user && isNgo === null) {
        console.log("user not exist but is logged in");
        return EMPTY;
      }
      if (user) {
        console.log("user exist");
        return of(new MarkAsNgo(user.isNgo));
      } else {
        if (isNgo) {
          console.log("navigate to registration as NGO");
        } else {
          console.log("navigate to registration as Volunteer");
        }
        return EMPTY;
      }
    }),
    catchError(error => {
      console.log("Not logged in");
      return EMPTY;
    })
  );

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
