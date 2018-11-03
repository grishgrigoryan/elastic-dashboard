import {Schemas}      from "../store/state";
import {Actions}      from "./index";

export function initialized() {
  return {initialized: true}
}
export function updateSchemas(schemas: Schemas) {
  return {schemas}
}

export function fetchSchemas() {
  return async (dispatch: any, getState: any) => {
    let result = await Parse.Schema.all();
    let schemas: Schemas = result.reduce((normalized, schema) => {
      normalized[schema.className] = schema;
      return normalized;
    }, {});
    dispatch(Actions.updateSchemas(schemas));
    return true;
  }
}