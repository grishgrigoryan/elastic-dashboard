import {Actions}      from "../actions"
import {AppState}     from "../store/state";
import {initialState} from "../store/state";


export function app(state: AppState = initialState.app, action: Actions): AppState {
  switch (action.type) {
    case Actions.updateSchemas.type: {
      return {...state, ...action.payload}
    }
    case Actions.deleteSchemaData.type: {
      let schemas = state.schemas;
      delete schemas[action.payload.className];
      return {...state, ...{schemas}}
    }
    case Actions.initialized.type: {
      return {...state, ...action.payload}
    }
  }
  return state;
}