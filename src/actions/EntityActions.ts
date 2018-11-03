import {Actions} from "./index";


export const updateEntity = (className: string, {byId, ids}) => {
  return {className, byId, ids}
};
export const fetchingEntity = (className: string, fetching: boolean) => {
  return {fetching,className}
};
export const errorMessageEntity = (className: string, message: string) => {
  return {message,className}
}


export const fetchEntity = (className: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
  return async (dispatch: any) => {
    try{
      dispatch(Actions.fetchingEntity(className, true));
      let result = await new Parse.Query(className).find();
      let byId = result.reduce((normalized, {id: objectId, attributes}) => {
        normalized[objectId] = {...{objectId}, ...attributes};
        return normalized;
      }, {});
      let ids = Object.keys(byId);
      dispatch(Actions.updateEntity(className, {byId, ids}));
      return true
    }catch (e) {
      dispatch(Actions.errorMessageEntity(className, e.message));
    }finally {
      dispatch(Actions.fetchingEntity(className, false));
    }
  }
}

