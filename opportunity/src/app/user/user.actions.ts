import { Action } from '@ngrx/store';

import { Volunteer } from '../data/models/volunteer.model';
import { NGO } from '../data/models/ngo.model';

export enum ActionTypes {
  GOOGLE_LOGIN_SUCCESS = '[User] Authed in with Google',
  GOOGLE_LOGIN_FAILURE = '[User] Authentification failed',
  USER_LOGOUT = '[User] Log user out',
  GET_USER_PENDING = '[User] Request user info from DB',
  GET_USER_SUCCESS = '[User] Load user info from DB to state',
}

export class GOOGLE_LOGIN_SUCCESS implements Action {
  readonly type = ActionTypes.GOOGLE_LOGIN_SUCCESS;
}

export class GOOGLE_LOGIN_FAILURE implements Action {
  readonly type = ActionTypes.GOOGLE_LOGIN_FAILURE;
}

export class USER_LOGOUT implements Action {
  readonly type = ActionTypes.USER_LOGOUT;
}

export class GET_USER_PENDING implements Action {
  readonly type = ActionTypes.GET_USER_PENDING;

  constructor(public payload: {
    isNgo: boolean,
    logInEmail: string,
    photoURL: string,
    displayName: string,
  }) {}
}

export class GET_USER_SUCCESS implements Action {
  readonly type = ActionTypes.GET_USER_SUCCESS;

  constructor(public payload: { user: Volunteer | NGO , isNgo: boolean }) {}
}

export type UserActions = GOOGLE_LOGIN_SUCCESS
  | GOOGLE_LOGIN_FAILURE
  | USER_LOGOUT
  | GET_USER_PENDING
  | GET_USER_SUCCESS;
