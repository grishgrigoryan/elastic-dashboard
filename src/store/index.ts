import reducers          from '../reducers';
import {createStore}     from 'redux';
import {applyMiddleware} from 'redux';

import {compose}    from 'redux';
import thunk        from "../middlewares/thunk";
import {StoreState} from './state';
import {Actions}    from "../actions";


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: 'parse-dashboard', actionsBlacklist: ['REDUX_STORAGE_SAVE']
        }) : compose;

export const store = createStore<StoreState, Actions, any, any>(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
