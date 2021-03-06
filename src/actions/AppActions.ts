import {Schemas} from "../store/state";
import {Actions} from "./index";

declare namespace Parse {
  class Schema extends Object {
    static all(): Promise<Array<any>>;

    delete(): Promise<any>;

    save(): Promise<any>;

    update(): Promise<any>;

    get(): Promise<Schema>;

    deleteField(fieldName: string): any
  }
}

export function initialized() {
  return {initialized: true}
}

export function updateSchemas(schemas: Schemas) {
  return {schemas}
}


export function deleteSchemaData(className) {
  return {className}
}

export const fetchSchemas = () => {
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

export const createSchema = (name: string) => {
  return async (dispatch: any, getState: any) => {
    await new Parse.Schema(name).save();
  }
};
export const deleteSchema = (name: string) => {
  return async (dispatch: any, getState: any) => {
    await new Parse.Schema(name).delete();
    dispatch(Actions.deleteSchemaData(name));
  }
};
export const addField = (className: string, fieldName: string, type: any, targetClass?: string) => {
  return async (dispatch: any, getState: any) => {
    const schema = await new Parse.Schema(className);
    schema[`add${type}`](fieldName, targetClass);
    await schema.update();
  }
};
export const deleteField = (className: string, fieldName: string) => {
  return async (dispatch: any, getState: any) => {
    const schema = await new Parse.Schema(className);
    schema.deleteField(fieldName);
    await schema.update();
  }
};