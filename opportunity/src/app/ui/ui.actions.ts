import { Action } from '@ngrx/store';

export enum ActionTypes {
  UpdateLoadingState = '[UI] Update loading state of component',
  UpdateUIState = '[UI] Update UI state of the component',
  TOGGLE_GLOBAL_PLACEHOLDER = '[UI] Toggle global placeholder'
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

export class TOGGLE_GLOBAL_PLACEHOLDER implements Action {
  readonly type = ActionTypes.TOGGLE_GLOBAL_PLACEHOLDER;
}

export type UIActions = UpdateLoadingState | UpdateUIState | TOGGLE_GLOBAL_PLACEHOLDER;
