import {Actions}      from "../actions"
import {initialState} from "../store/state";
import {BrowseState}    from "../store/state";


export function browse(state: BrowseState = initialState.browse, action: Actions): BrowseState {
    switch (action.type) {
        case Actions.updateMessage.type: {
            return { ...state, ...action.payload }
        }
    }
    return state;
}