import { ActionTypes, ActionsUnion } from './user.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  user: any;
  isNgo: boolean;
}

export const initialState = {
  user: null,
  isNgo: null
};

export function userReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.MarkAsNgo:
      return {
        ...state,
        isNgo: action.payload
      };

    case ActionTypes.UpdateUserDetails:
      let user = null;
      if (action.payload) {
        const { displayName, email, photoURL } = action.payload;
        user = {
          displayName,
          email,
          photoURL
        };
      }
      return { ...state, user };

    case ActionTypes.Logout:
      return { ...state, user: null, isNgo: null };
    // case ActionTypes.GetUserDetails:
    // const { displayName, email, photoURL } = action.payload;
    // return {
    //   ...state,
    //   user: {
    //     displayName,
    //     email,
    //     photoURL
    //   }
    // };
    // const ActionTypes.GoogleLogin :
    // return {...state, user}
    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<UserState>('user');

export const isNgoSelector = createSelector(
  getUserState,
  (state: UserState) => state.isNgo
);

export const userSelector = createSelector(
  getUserState,
  (state: UserState) => state.user
);
