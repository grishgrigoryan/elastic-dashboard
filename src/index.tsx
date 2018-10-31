/// <reference types="parse" />

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
  Parse.initialize('KQEi9xr2OZZ5RFmfQTCUaJB0JoZUxbE5H6mgwGng', '3qbWEr513fbmoQIafSm2fU6PbC1eNwXxM0rws2Gp');
  Parse.serverURL = 'https://parseapi.back4app.com/';
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
