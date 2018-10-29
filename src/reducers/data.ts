import {Actions}      from "../actions"
import {initialState} from "../store/state";
import {DataState}    from "../store/state";


export function data(state: DataState = initialState.data, action: Actions): DataState {
    switch (action.type) {
        case Actions.updateMessage.type: {
            return { ...state, ...action.payload }
        }
    }
    return state;
}