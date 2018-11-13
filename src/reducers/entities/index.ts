import {combineReducers} from 'redux';

//
// export default combineReducers({
//   byId,
//   ids,
// });

import {Actions}       from "../../actions"
import {union}         from "../../helpers/array";
import {EntitiesState} from "../../store/state";
import {initialState}  from "../../store/state";


function ids(state: any = [], ids: any): any {
  return union([...state, ...ids]);
}

function byIds(state: any = {}, byId: any): any {
  return {...state, ...byId};
}

function browse(browse: any = {}, payload): any {
  return {...browse, ...payload}
}

export function entities(state: EntitiesState = initialState.entities, action: Actions): EntitiesState {
  switch (action.type) {
    case Actions.errorMessageEntity.type:
    case Actions.updatePagination.type:
    case Actions.updateTableIds.type:
    case Actions.updateExpandedRowMop.type:
    case Actions.updateSortField.type:
    case Actions.updateModal.type:
    case Actions.updateItemModalForm.type:
    case Actions.fetchingEntity.type: {
      let {className, ...payload} = action.payload;
      let entity = state[className] || {byId: {}, ids: [], browse: {}};
      entity.browse = browse(entity.browse, payload);
      return {
        ...state, [className]: {...entity}
      }
    }
    case Actions.updateEntity.type: {
      let {className} = action.payload;
      let entity = state[className] || {byId: {}, ids: [], browse: {}};
      entity.byId = byIds(entity.byId, action.payload.byId);
      entity.ids = ids(entity.ids, action.payload.ids);
      return {
        ...state, [className]: {...entity}
      }
    }
    case Actions.updateEntityItemData.type: {
      let {className, byId} = action.payload;
      let entity = state[className] || {byId: {}, ids: [], browse: {}};
      entity.byId = byIds(entity.byId, byId);
      entity.ids = ids(entity.ids, Object.keys(byId));
      return {
        ...state, [className]: {...entity}
      }
    }
    case Actions.deleteEntityItemData.type: {
      let {className, objectId} = action.payload;
      let entity = state[className] || {byId: {}, ids: [], browse: {}};
      delete entity.byId[objectId];
      entity.byId = {...entity.byId};
      entity.browse.tableIds = entity.browse.tableIds.filter((id) => (id != objectId));
      entity.ids = entity.ids.filter((id) => id != objectId);
      return {
        ...state, [className]: {...entity}
      }
    }
  }
  return state;
}