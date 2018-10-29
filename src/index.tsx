import * as React      from 'react';
import {render}        from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App}           from './App';
import {Provider}      from 'react-redux';
import {store}         from './store';
import './index.scss'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
    }
}


export async function main() {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

main().catch(console.error);
