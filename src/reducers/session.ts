import {Actions}      from "../actions"
import {SessionState} from '../store/state';
import {initialState} from '../store/state';

export function session(state: SessionState = initialState.session, action: Actions): SessionState {
  switch (action.type) {
    case Actions.updateSessionUser.type: {
      return {...state, ...action.payload}
      }
    case Actions.changeSelectedApplicationId.type: {
      return {...state, ...action.payload}
      }
    case Actions.updateApplications.type: {
      return {...state, ...action.payload}
      }
  }
  return state;
}