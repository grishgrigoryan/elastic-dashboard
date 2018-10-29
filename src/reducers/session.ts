import {Actions}      from "../actions"
import {SessionState} from '../store/state';
import {initialState} from '../store/state';

export function session(state: SessionState = initialState.session, action: Actions): SessionState {
    return state;
}