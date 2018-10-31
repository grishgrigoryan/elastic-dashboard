import {combineReducers} from 'redux';
import {browse}            from './browse';
import {session}         from './session';
import {entities}         from './entities';
import {StoreState}      from '../store/state';


export default combineReducers({
    browse,
    entities,
    session,
});