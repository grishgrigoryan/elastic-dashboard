/// <reference types="parse" />
import './types';
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
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>;
          <AuthRoute path='/' component={App}/>;
          <Redirect to='/config'/>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

main().catch(console.error);
