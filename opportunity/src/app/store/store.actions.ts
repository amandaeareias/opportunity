import { Action } from '@ngrx/store';

export enum ActionTypes {
  MarkAsNgo = '[NavBar Component] Login as NGO',
  AddUserDetails = '[NavBar Component] Populate User',
}

export class MarkAsNgo implements Action {
  readonly type = ActionTypes.MarkAsNgo;

  constructor(public payload: boolean) {}
}

export class AddUserDetails implements Action {
  readonly type = ActionTypes.AddUserDetails;

  constructor(public payload: { email: string; displayName: string; photoUrl: string }) {}
}

export type ActionsUnion = MarkAsNgo | AddUserDetails;