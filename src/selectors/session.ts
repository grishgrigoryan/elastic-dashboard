import {createSelector} from 'reselect'
import {StoreState}     from "../store/state";

const getSession = (state: StoreState) => state.session;


export const getSelectedApplicationId = createSelector([getSession], (session) => {
  return session.selectedApplicationId
});
export const getApplications = createSelector([getSession], (session) => {
  return session.applications
});

export const getSelectedApplication = createSelector([getSelectedApplicationId, getApplications], (id, application) => {
  return application[id]
});
export const getUser = createSelector([getSession], (session) => {
  return session.user
});