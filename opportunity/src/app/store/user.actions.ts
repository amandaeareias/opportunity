import { Action } from "@ngrx/store";

export enum ActionTypes {
  MarkAsNgo = "[Auth] Login as NGO",
  UpdateUserDetails = "[Auth] Populate User",

  GoogleLogin = "[Auth] Login with Google Account",
  Logout = "[Auth] Logout",
  LoginError = "[Auth] Login Error",
  GetUser = "[Auth] Get User From DB"
}

export class MarkAsNgo implements Action {
  readonly type = ActionTypes.MarkAsNgo;

  constructor(public payload: boolean) {}
}

export class UpdateUserDetails implements Action {
  readonly type = ActionTypes.UpdateUserDetails;

  constructor(
    public payload: { email: string; displayName: string; photoURL: string }
  ) {}
}

export class GetUser implements Action {
  readonly type = ActionTypes.GetUser;

  constructor(
    public payload: { email: string; displayName: string; photoURL: string }
  ) {}
}

export class GoogleLogin implements Action {
  readonly type = ActionTypes.GoogleLogin;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;

  constructor(public payload: any) {}
}

export class LoginError implements Action {
  readonly type = ActionTypes.LoginError;

  constructor(public payload: any) {}
}
export type ActionsUnion = MarkAsNgo | GetUser | UpdateUserDetails;
