import {combineReducers} from 'redux';
import {data}            from './data';
import {session}         from './session';
import {StoreState}      from '../store/state';


export default combineReducers({
    data,
    session,
});