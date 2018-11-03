import {Actions}       from "../actions"
import {union}         from "../helpers/array";
import {EntitiesState} from "../store/state";
import {initialState}  from "../store/state";


export function entities(state: EntitiesState = initialState.entities, action: Actions): EntitiesState {
  switch (action.type) {
    case Actions.errorMessageEntity.type: {
      let {message,className} = action.payload;
      let entity = state[className] || {byId:{},ids:[],browse:{}};
      entity.browse = {...entity.browse, message};
      return {
        ...state, [className]: {...entity}
      }
    }
    case Actions.fetchingEntity.type: {
      let {fetching,className} = action.payload;
      let entity = state[className] || {byId:{},ids:[],browse:{}};
      entity.browse = {...entity.browse, fetching};
      return {
        ...state, [className]: {...entity}
      }
    }
    case Actions.updateEntity.type: {
      let {className, byId, ids} = action.payload;
      let entity = state[className] || {byId:{},ids:[],browse:{}};
      entity.byId = {...entity.byId, ...byId};
      entity.ids = union([...entity.ids, ...ids]);
      return {
        ...state, [className]: {...entity}
      }
    }
  }
  return state;
}