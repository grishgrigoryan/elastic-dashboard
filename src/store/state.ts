export interface SessionState {
    auth: boolean,
}

export interface DataState {
    message: string
}

export interface StoreState {
    session: SessionState
    data: DataState
}

const initialState: StoreState = {
    session: { auth: false },
    data: {
        message: 'INITIAL MESSAGE'
    },

};
export {initialState}