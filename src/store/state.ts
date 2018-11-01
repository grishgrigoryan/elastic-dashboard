import {IconType} from "@elastic/eui";

export type Normalized<T> = {
  [id: string]: T
}


export interface Application {
  name: string,
  masterKey: string
  iconType: IconType
}

export type Applications = Normalized<Application>

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


  user: Entity,

  [k: string]: any
}

export interface Entity {
  byId: any
  ids: Array<any>,
  browse: {
    totalPages?: number
  }

  [k: string]: any
}

export interface StoreState {
  session: SessionState
  browse: BrowseState,
  entities: EntitiesState
}

const initialState: StoreState = {
  session: {
    user: null,
    applications: {},
    selectedApplicationId: null,
  },
  browse: {
    loading: false,
    message: 'INITIAL MESSAGE'
  },
  entities: {
    user: {
      byId: {},
      ids: [],
      browse: {}
    },
  }

};
export {initialState}