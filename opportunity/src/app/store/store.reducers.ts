import { ActionTypes, ActionsUnion } from './store.actions';

export interface State {
  user: any;
  isNgo: boolean;
}

export const initialState = {
  user: null,
  isNgo: false,
};

export function storeReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.MarkAsNgo:
      return {
        ...state,
        isNgo: action.payload,
      };

    case ActionTypes.AddUserDetails:
      const { displayName, email, photoUrl } = action.payload;
      return {
        ...state,
        user: {
          displayName,
          email,
          photoUrl 
        }
      };

    default:
      return state;
  }
}