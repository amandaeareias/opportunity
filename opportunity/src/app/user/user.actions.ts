import { Action } from "@ngrx/store";
import { Volunteer } from "../data/models/volunteer.model";
import { NGO } from "../data/models/ngo.model";

export enum ActionTypes {
  LoginWithGoogle_SUCCESS = "[User] Authed in with Google",
  LoginWithGoogle_FAIL = "[User] Authentification failed",
  Logout = "[User] Log user out",
  // request user details from DB (on every auth event: login, register or isAuth check)
  CheckUserIfExisting = "[User] Request user info from login service and check against DB",
  //
  ReturnUserWithCompletionStatus = "[User] Load information with user completion status and DB info",
  // RegisterUser = "[User] Registration : NGO | Volunteer"
}

export class LoginWithGoogle_SUCCESS implements Action {
  readonly type = ActionTypes.LoginWithGoogle_SUCCESS;
}

export class LoginWithGoogle_FAIL implements Action {
  readonly type = ActionTypes.LoginWithGoogle_FAIL;
}

// export class Register implements Action {
//   readonly type = ActionTypes.RegisterUser;
//   constructor(public payload: {isComplete:boolean}) {}

// }

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class CheckUserIfExisting implements Action {
  readonly type = ActionTypes.CheckUserIfExisting;

  constructor(
    public payload: {
      isNgo: boolean;
      username: string;
      photoURL: string;
      displayName: string;
    }
  ) {}
}

export class ReturnUserWithCompletionStatus implements Action {
  readonly type = ActionTypes.ReturnUserWithCompletionStatus;

  constructor(public payload: { user: Volunteer | NGO; isNgo: boolean }) {}
}

export type UserActions =
  | LoginWithGoogle_SUCCESS
  | LoginWithGoogle_FAIL
  | Logout
  | CheckUserIfExisting
  | ReturnUserWithCompletionStatus;
  // | Register;
