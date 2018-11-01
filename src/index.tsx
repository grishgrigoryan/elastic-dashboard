/// <reference types="parse" />
import * as React      from 'react';
import {render}        from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Switch}        from 'react-router-dom';
import {Route}         from 'react-router-dom';
import {Redirect}      from 'react-router-dom';
import {Provider}      from 'react-redux';
import {Login}         from "./pages/Login";
import {AuthRoute}     from "./routes/AuthRoute";
import {store}         from './store';
import './index.scss'
import {App}           from './pages/App';


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
        <Switch>
          <Route path='/login' component={Login}/>;
          <AuthRoute path='/apps/:appId' component={App}/>;
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

main().catch(console.error);
