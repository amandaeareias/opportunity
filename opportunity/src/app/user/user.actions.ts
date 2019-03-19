import { Action } from '@ngrx/store';
import { Volunteer } from '../data/models/volunteer.model';
import { NGO } from '../data/models/ngo.model';

export enum ActionTypes {
  LoginWithGoogle_SUCCESS = '[User] Authed in with Google',
  LoginWithGoogle_FAIL = '[User] Authentification failed',
  Logout = '[User] Log user out',
  FetchUserDetails = '[User] Request user info from DB',
  LoadUserDetails = '[User] Load information about user from DB',
}

export class LoginWithGoogle_SUCCESS implements Action {
  readonly type = ActionTypes.LoginWithGoogle_SUCCESS;
}

export class LoginWithGoogle_FAIL implements Action {
  readonly type = ActionTypes.LoginWithGoogle_FAIL;
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class FetchUserDetails implements Action {
  readonly type = ActionTypes.FetchUserDetails;

  constructor(public payload: {
    isNgo: boolean,
    logInEmail: string,
    photoURL: string,
    displayName: string,
  }) {}
}

export class LoadUserDetails implements Action {
  readonly type = ActionTypes.LoadUserDetails;

  constructor(public payload: { user: Volunteer | NGO , isNgo: boolean }) {}
}

export type UserActions = LoginWithGoogle_SUCCESS
  | LoginWithGoogle_FAIL
  | Logout
  | FetchUserDetails
  | LoadUserDetails;
