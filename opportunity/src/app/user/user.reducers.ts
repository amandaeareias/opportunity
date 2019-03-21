import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ActionTypes, UserActions } from "./user.actions";

export interface UserState {
  isNgo: boolean;
  isLoggedIn: boolean;
  isComplete: boolean;
  isAuthed: boolean;
  user: {
    displayName?: string;
    photoURL?: string;
    username: string;
  };
}

export const initialState: UserState = {
  isNgo: null,
  isLoggedIn: null,
  isComplete: null,
  isAuthed: null,
  user: {
    displayName: null,
    photoURL: null,
    username: null
  }
};

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case ActionTypes.LoginWithGoogle_SUCCESS:
      return {
        ...state,
        isAuthed: true
      };

    case ActionTypes.LoginWithGoogle_FAIL:
    case ActionTypes.Logout:
      return initialState;

    case ActionTypes.CheckUserIfExisting:
      return state;

    case ActionTypes.ReturnUserWithCompletionStatus:
      const { user, isNgo } = action.payload;
      return {
        ...state,
        isNgo,
        isComplete: user.isComplete,
        isLoggedIn: true,
        user
      };

    // case ActionTypes.RegisterUser:
    //   const isComplete = action.payload;
    //   return {
    //     ...state,
    //     isComplete: true
    //   };

    default:
      return state;
  }
}

/* User selectors */

export const getUserState = createFeatureSelector<UserState>("user");

export const isUserNgoSelector = createSelector(
  getUserState,
  (state: UserState) => state.isNgo
);

export const isUserAuthedSelector = createSelector(
  getUserState,
  (state: UserState) => state.isAuthed
);

export const isUserLoggedInSelector = createSelector(
  getUserState,
  (state: UserState) => state.isLoggedIn
);

export const isUserCompleteSelector = createSelector(
  getUserState,
  (state: UserState) => state.isComplete
);

export const userDetailsSelector = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const userDisplayNameSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string; username: string; photoURL: string }) =>
    state.displayName
);

export const userEmailSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string; username: string; photoURL: string }) =>
    state.username
);

export const userPhotoUrlSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string; username: string; photoURL: string }) =>
    state.photoURL
);
