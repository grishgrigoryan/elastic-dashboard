import {Actions}       from "../actions"
import {EntitiesState} from "../store/state";
import {initialState}  from "../store/state";


export function entities(state: EntitiesState = initialState.entities, action: Actions): EntitiesState {

    return state;
}