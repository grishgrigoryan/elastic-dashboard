import {combineReducers} from 'redux';
import {app}             from "./app";
import {browse}          from './browse';
import {session}         from './session';
import {entities}        from './entities';
import {reducer as form} from 'redux-form'


export default combineReducers({
  browse,
  app,
  entities,
  session,
  form
});