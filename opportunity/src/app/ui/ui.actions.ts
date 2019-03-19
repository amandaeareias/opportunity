import { Action } from '@ngrx/store';

export enum ActionTypes {
  UpdateLoadingState = '[UI] Update loading state of component',
  UpdateUIState = '[UI] Update UI state of the component',
}

export class UpdateLoadingState implements Action {
  readonly type = ActionTypes.UpdateLoadingState;
  constructor(public payload: {
    component: string,
    loadingState: boolean,
  }) {}
}

export class UpdateUIState implements Action {
  readonly type = ActionTypes.UpdateUIState;
  constructor(public payload: {
    component: string,
    /* TODO: MAKE CENTRALIZED UI STATES TYPE */
    uiState: string,
  }) {}
}

export type UIActions = UpdateLoadingState | UpdateUIState;
