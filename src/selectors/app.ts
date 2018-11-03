import {createSelector} from 'reselect'
import {StoreState}     from "../store/state";

const getApp = (state: StoreState) => state.app;
export const getSchemas = createSelector([getApp],(app)=>{
  return app.schemas

})
export const getEntityNames = createSelector([getSchemas], (schemas) => {
  return Object.keys(schemas)
});
