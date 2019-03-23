import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActionTypes, UserActions } from './user.actions';
import { Volunteer } from '../data/models/volunteer.model';
import { NGO } from '../data/models/ngo.model';

export interface UserState {
  isNgo: boolean;
  isLoggedIn: boolean;
  isAuthed: boolean;
  user: Volunteer | NGO;
  location: any;
}

export const initialState: UserState = {
  user: null,
  isNgo: false,
  isLoggedIn: false,
  isAuthed: false,
  location: null,
};

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case ActionTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthed: true,
      };

    case ActionTypes.GOOGLE_LOGIN_FAILURE:
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return initialState;

    case ActionTypes.GET_USER_SUCCESS:
      const { user, isNgo } = action.payload;
      return {
        ...state,
        user,
        isNgo,
        isLoggedIn: true,
      };
    
    case ActionTypes.UPDATE_USER_SUCCESS:
      const userData = {
        ...state.user,
        ...action.payload,
      };

      return {
        ...state,
        user: userData,
      };
    
    case ActionTypes.GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      }

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

export const userDetailsSelector = createSelector(
  getUserState,
  (state: UserState) => state.user,
);

export const isUserCompleteSelector = createSelector(
  userDetailsSelector,
  (state: Volunteer | NGO) => state.isComplete,
);


export const userDisplayNameSelector = createSelector(
  userDetailsSelector,
  (state: Volunteer | NGO) => state.name,
);

export const userEmailSelector = createSelector(
  userDetailsSelector,
  (state: Volunteer | NGO) => state.username,
);

export const userPhotoUrlSelector = createSelector(
  userDetailsSelector,
  (state: Volunteer | NGO) => state.image,
);
