import {Middleware, Action, AnyAction} from "redux";

export interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;

    <R>(thunkAction: ThunkAction<R, S, E, A>): R;
}

export type ThunkAction<R, S, E, A extends Action> = (
    dispatch: ThunkDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
) => R;

export type ThunkMiddleware<S = {}, A extends Action = AnyAction, E = undefined> = Middleware<ThunkDispatch<S, E, A>, S, ThunkDispatch<S, E, A>>;


function createThunkMiddleware(extraArgument?: any): ThunkMiddleware {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const thunk: any = createThunkMiddleware();


export default thunk;