export interface Application {
    id: number,
    name: string,
}

export interface SessionState {
    auth: boolean,
    username: 'grishgrigoryan',
    applications?: Array<Application>,
}

export interface BrowseState {
    message: string
    selectedApplication?: number
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
        auth: true,
        username:"grishgrigoryan",
        applications: [
            { id: 1, name: 'First Application' },
            { id: 2, name: 'Second Application' },
            { id: 3, name: 'Third Application' },
        ]
    },
    browse: {
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