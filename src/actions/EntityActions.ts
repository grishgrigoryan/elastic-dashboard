import {Actions} from "./index";


export const updateEntity = (className: string, {byId, ids}) => {
  return {className, byId, ids}
};
export const updateEntityItemData = (className: string, {objectId, ...data}) => {
  let byId = {[objectId]: {...data, objectId}};
  return {className, byId}
};
export const deleteEntityItemData = (className: string, objectId) => {
  return {className, objectId}
};
export const fetchingEntity = (className: string, fetching: boolean) => {
  return {fetching, className}
};
export const errorMessageEntity = (className: string, message: string) => {
  return {message, className}
};
export const updatePagination = (className: string, payload) => {
  return {className, ...payload}
};

export const updateTableIds = (className: string, tableIds: Array<any>) => {
  return {className, tableIds}
};

export const removeFromTableIds = (className: string, objectId) => {
  return {className, objectId}
};

export const updateSortField = (className: string, sort) => {
  return {className, sort}
};

export const updateItemModalForm = (className: string, itemModalForm) => {
  return {className, itemModalForm}
};
export const updateModal = (className: string, modal) => {
  return {className, modal}
};

export const updateExpandedRowMop = (className: string, expandedRowMop) => {
  return {className, expandedRowMop}
};


export const fetchEntity = (className: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
  return async (dispatch: any) => {
    let query = new Parse.Query(className);
    if (pageIndex) {
      query.skip(pageIndex * pageSize);
    }
    if (pageSize) {
      query.limit(pageSize);
    }
    if (sortField) {
      sortDirection === 'asc' ? query.ascending(sortField) : query.descending(sortField);
    }
    let result = await query.find();
    let byId = result.reduce((normalized, {id: objectId, attributes}) => {
      normalized[objectId] = {...{objectId}, ...attributes};
      return normalized;
    }, {});
    let ids = Object.keys(byId);
    dispatch(Actions.updateEntity(className, {byId, ids}));
    return {byId, ids}
  }
};

export const fetchTableData = (className: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
  return async (dispatch: any) => {
    try {
      dispatch(Actions.fetchingEntity(className, true));
      const {ids} = await dispatch(fetchEntity(className, pageIndex, pageSize, sortField, sortDirection));
      let totalItemCount = await new Parse.Query(className).count();
      dispatch(Actions.updateTableIds(className, ids));
      dispatch(Actions.updatePagination(className, {pageIndex, pageSize, totalItemCount}));
      dispatch(Actions.updateSortField(className, {field: sortField, direction: sortDirection}));
      return true
    } catch (e) {
      dispatch(Actions.errorMessageEntity(className, e.message));
    } finally {
      dispatch(Actions.fetchingEntity(className, false));
    }
  }
};

export const updateEntityItem = (className: string, payload) => {
  return async (dispatch: any) => {
    let item;
    if (payload.objectId) {
      let query = new Parse.Query(className);
      item = await query.get(payload.objectId)
    }
    const Clazz = Parse.Object.extend(className);
    item = new Clazz();
    await item.save(payload);
    dispatch(Actions.updateEntityItemData(className, item.toJSON()));
    return item.toJSON();
  }
};
export const deleteEntityItem = (className: string, objectId: string) => {
  return async (dispatch: any) => {
    let item;
    let query = new Parse.Query(className);
    item = await query.get(objectId);
    await item.destroy();
    dispatch(Actions.deleteEntityItemData(className, objectId));
    return item
  }
};