import {createSelector} from 'reselect'
import {StoreState}     from "../store/state";

const getEntities = (state: StoreState) => state.entities;

