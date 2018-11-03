import {Actions}      from "../actions"
import {AppState}     from "../store/state";
import {initialState} from "../store/state";


export function app(state: AppState = initialState.app, action: Actions): AppState {
  switch (action.type) {
    case Actions.updateSchemas.type: {
      return {...state, ...action.payload}
    }
    case Actions.initialized.type: {
      return {...state, ...action.payload}
    }
  }
  return state;
}