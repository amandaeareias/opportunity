import { Action } from '@ngrx/store';

import { Volunteer } from '../data/models/volunteer.model';
import { NGO } from '../data/models/ngo.model';

export enum ActionTypes {
  GOOGLE_LOGIN_SUCCESS = '[User] Authed in with Google',
  GOOGLE_LOGIN_FAILURE = '[User] Authentification failed',
  USER_LOGOUT_PENDING = '[User] Request user sign out',
  USER_LOGOUT_SUCCESS = '[User] User logs out',
  USER_LOGOUT_FAILURE = '[User] Firebase signout err',
  GET_USER_PENDING = '[User] Request user info from DB',
  GET_USER_SUCCESS = '[User] Load user info from DB to state',
  UPDATE_USER_PENDING = '[User] Request user update',
  UPDATE_USER_SUCCESS = '[User] Update request was successfull',
  GET_USER_LOCATION_PENDING = '[User] Get approx user location',
  GET_USER_LOCATION_SUCCESS = '[User] Receive data of user location',
}

export class GOOGLE_LOGIN_SUCCESS implements Action {
  readonly type = ActionTypes.GOOGLE_LOGIN_SUCCESS;
}

export class GOOGLE_LOGIN_FAILURE implements Action {
  readonly type = ActionTypes.GOOGLE_LOGIN_FAILURE;
}

export class USER_LOGOUT_PENDING implements Action {
  readonly type = ActionTypes.USER_LOGOUT_PENDING;
}

export class USER_LOGOUT_SUCCESS implements Action {
  readonly type = ActionTypes.USER_LOGOUT_SUCCESS;
}

export class USER_LOGOUT_FAILURE implements Action {
  readonly type = ActionTypes.USER_LOGOUT_FAILURE;

  constructor(public payload: Error) {}
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

export class UPDATE_USER_PENDING implements Action {
  readonly type = ActionTypes.UPDATE_USER_PENDING;

  constructor(public payload: { id: string, isNgo: boolean, data: any }) {}
}

export class UPDATE_USER_SUCCESS implements Action {
  readonly type = ActionTypes.UPDATE_USER_SUCCESS;

  constructor(public payload: any) {}
}

export class GET_USER_LOCATION_PENDING implements Action {
  readonly type = ActionTypes.GET_USER_LOCATION_PENDING;
}

export class GET_USER_LOCATION_SUCCESS implements Action {
  readonly type = ActionTypes.GET_USER_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export type UserActions = GOOGLE_LOGIN_SUCCESS
  | GOOGLE_LOGIN_FAILURE
  | USER_LOGOUT_PENDING
  | USER_LOGOUT_SUCCESS
  | USER_LOGOUT_FAILURE
  | GET_USER_PENDING
  | GET_USER_SUCCESS
  | UPDATE_USER_PENDING
  | UPDATE_USER_SUCCESS
  | GET_USER_LOCATION_PENDING
  | GET_USER_LOCATION_SUCCESS;
