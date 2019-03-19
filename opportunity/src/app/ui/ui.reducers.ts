import { ActionTypes, UIActions } from './ui.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UIState {
  navbar: {
    loadingState: boolean,
    uiState: string,
  };
}

export const initialState: UIState = {
  navbar: {
    loadingState: false,
    uiState: 'init',
  },
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case ActionTypes.UpdateLoadingState:
      if (action.payload) {
        const { component, loadingState } = action.payload;
        const componentState = {};
        componentState[component] = {
          ...state[component],
          loadingState
        };
        console.log(componentState);
        return {
          ...state,
          ...componentState,
        };
      }
      return state;

    case ActionTypes.UpdateUIState:
      if (action.payload) {
        const { component, uiState } = action.payload;
        const componentState = {};
        componentState[component] = {
          ...state[component],
          uiState
        };
        return {
          ...state,
          ...componentState,
        };
      }
      return state;

    default:
      return state;
  }
}

export const getUIState = createFeatureSelector<UIState>('ui');

export const navbarComponentSelector = createSelector(
  getUIState,
  (state: UIState) => state.navbar,
);

export const navbarLoadingStateSelector = createSelector(
  navbarComponentSelector,
  (state: { loadingState: boolean, uiState: string }) => state.loadingState,
);

export const navbarUIStateSelector = createSelector(
  navbarComponentSelector,
  (state: { loadingState: boolean, uiState: string }) => state.uiState,
);
