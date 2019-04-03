import { ActionTypes, UIActions } from './ui.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface NavBarState {
  loadingState: boolean;
  uiState: string;
}

export interface UIState {
  navbar: NavBarState;
  global: { displayApp: boolean };
}

export const initialState: UIState = {
  navbar: {
    loadingState: false,
    uiState: 'init',
  },
  global: {
    displayApp: true,
  }
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

    case ActionTypes.TOGGLE_GLOBAL_PLACEHOLDER:
      return {
        ...state,
        global: {
          displayApp: !state.global.displayApp,
        }
      }

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
  (state: NavBarState) => state.loadingState,
);

export const navbarUIStateSelector = createSelector(
  navbarComponentSelector,
  (state: NavBarState) => state.uiState,
);

export const globalUISelector = createSelector(
  getUIState,
  (state: UIState) => state.global,
);

export const globalDisplaySelector = createSelector(
  globalUISelector,
  (state: { displayApp: boolean }) => state.displayApp,
);
