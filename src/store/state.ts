import {IconType} from "@elastic/eui";

export type Normalized<T> = {
  [id: string]: T
}

export interface Application {
  id: string
  name: string,
  masterKey: string
  serverURL: string
  applicationId: string
  iconType: IconType
}

export type Applications = Normalized<Application>

export interface Schema {
  className: string
  fields: {
    [name: string]: {type:"String" | "Date" | "ACL" | "Boolean" | "Object"}
  }
  classLevelPermissions: {
    find: any;
    get: any;
    create: any;
    update: any;
    delete: any;
    addField: any;
  }
  indexes: any
}

export type Schemas = Normalized<Schema>

export interface SessionState {
  user?: any
  applications?: Applications,
  selectedApplicationId?: string
}

export interface BrowseState {
  message: string
  loading: boolean
}

export interface EntitiesState {
  [className: string]: Entity,
}

export interface Entity {
  byId?: any
  ids?: Array<any>,
  browse?: {
    totalPages?: number,
    fetching?:boolean,
    message?:string,
    [k: string]: any
  }
  [k: string]: any
}

export interface AppState {
  initialized: boolean
  schemas: Schemas
}

export interface StoreState {
  session: SessionState
  browse: BrowseState,
  app: AppState,
  entities: EntitiesState
}


const initialState: StoreState = {
  session: {
    user: null,
    applications: {},
    selectedApplicationId: null,
  },
  app: {
    initialized: false,
    schemas: {},
  },
  browse: {
    loading: false,
    message: 'INITIAL MESSAGE'
  },
  entities: {}

};
export {initialState}