import {createSelector} from 'reselect'
import {StoreState}     from "../store/state";

const getSession = (state: StoreState) => state.session;
export const getApplications = createSelector([getSession], (session) => {
  return session.applications
});