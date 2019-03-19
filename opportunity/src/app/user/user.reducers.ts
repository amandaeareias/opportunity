import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActionTypes, UserActions } from './user.actions';

export interface UserState {
  isNgo: boolean;
  isLoggedIn: boolean;
  isRegistered: boolean;
  isAuthed: boolean;
  user: {
    displayName?: string;
    photoURL?: string;
    logInEmail?: string;
  };
}

export const initialState: UserState = {
  isNgo: false,
  isLoggedIn: false,
  isRegistered: false,
  isAuthed: false,
  user: {
    displayName: null,
    photoURL: null,
    logInEmail: null,
  },
};

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case ActionTypes.LoginWithGoogle_SUCCESS:
      return {
        ...state,
        isAuthed: true,
      };

    case ActionTypes.LoginWithGoogle_FAIL:
    case ActionTypes.Logout:
      return initialState;

    case ActionTypes.FetchUserDetails:
      return state;

    case ActionTypes.LoadUserDetails:
      const { displayName, photoURL, logInEmail, isNgo, isRegistered } = action.payload;
      return {
        ...state,
        isNgo,
        isRegistered,
        isLoggedIn: true,
        user: {
          displayName,
          photoURL,
          logInEmail,
        }
      };

    default:
      return state;
  }
}


/* User selectors */

export const getUserState = createFeatureSelector<UserState>('user');

export const isUserNgoSelector = createSelector(
  getUserState,
  (state: UserState) => state.isNgo,
);

export const isUserAuthedSelector = createSelector(
  getUserState,
  (state: UserState) => state.isAuthed,
);

export const isUserLoggedInSelector = createSelector(
  getUserState,
  (state: UserState) => state.isLoggedIn,
);

export const isUserRegisteredSelector = createSelector(
  getUserState,
  (state: UserState) => state.isRegistered,
);

export const userDetailsSelector = createSelector(
  getUserState,
  (state: UserState) => state.user,
);

export const userDisplayNameSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string, logInEmail: string, photoURL: string }) => state.displayName,
);

export const userEmailSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string, logInEmail: string, photoURL: string }) => state.logInEmail,
);

export const userPhotoUrlSelector = createSelector(
  userDetailsSelector,
  (state: { displayName: string, logInEmail: string, photoURL: string }) => state.photoURL,
);