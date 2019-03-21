import { Action } from '@ngrx/store';
import { Volunteer } from '../data/models/volunteer.model';
import { NGO } from '../data/models/ngo.model';

export enum ActionTypes {
  LoginWithGoogle_SUCCESS = '[User] Authed in with Google',
  LoginWithGoogle_FAIL = '[User] Authentification failed',
  Logout = '[User] Log user out',
  // request user details from DB (on every auth event: login, register or isAuth check)
  CheckUserIfExisting = '[User] Request user info from login service and check against DB',
  ReturnUserWithCompletionStatus = '[User] Load information with user completion status and DB info',
  UserRegistrationSuccessful = '[User] Registration mark isComplete as true for : NGO | Volunteer ',
  UserRegistrationFailed = '[User]  Registration mark isComplete as false for : NGO | Volunteer '

}

export class LoginWithGoogle_SUCCESS implements Action {
  readonly type = ActionTypes.LoginWithGoogle_SUCCESS;
}

export class LoginWithGoogle_FAIL implements Action {
  readonly type = ActionTypes.LoginWithGoogle_FAIL;
}

export class UserRegistrationSuccessful implements Action {
  readonly type = ActionTypes.UserRegistrationSuccessful;
}

export class UserRegistrationFailed implements Action {
  readonly type = ActionTypes.UserRegistrationFailed;
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class CheckUserIfExisting implements Action {
  readonly type = ActionTypes.CheckUserIfExisting;

  constructor(
    public payload: {
      isNgo: boolean;
      isComplete: boolean;
      username: string;
      photoURL: string;
      displayName: string;
    }
  ) {}
}

export class ReturnUserWithCompletionStatus implements Action {
  readonly type = ActionTypes.ReturnUserWithCompletionStatus;

  constructor(public payload: { user: Volunteer | NGO; isNgo: boolean, isComplete: boolean }) {}
}

export type UserActions =
  | LoginWithGoogle_SUCCESS
  | LoginWithGoogle_FAIL
  | Logout
  | CheckUserIfExisting
  | ReturnUserWithCompletionStatus
  |UserRegistrationFailed
  | UserRegistrationSuccessful;
