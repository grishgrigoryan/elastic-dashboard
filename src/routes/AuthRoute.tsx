import * as React            from 'react';
import {Route}               from 'react-router-dom';
import {Redirect}            from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import {Connected}           from "../decorators/Connected";
import AuthLayout            from '../layouts/AuthLayout';
import {StoreState}          from "../store/state";


export class AuthRoute extends React.PureComponent<any, any> {
  render() {
    console.info(this.props);
    const { component: Component, props = {}, location = {} } = this.props;
    //const { match: { params: { applicationId } } } = renderProps;
    //console.log(applicationId);
    //let found = this.model.applications.filter((application) => application.id == applicationId);
    if (!Parse.User.current()) {
      return <Redirect
        to={{
          pathname: `/login`,
          state: {
            from: location.pathname || '/'
          }
        }}
      />
    } else {
      return <Component {...props} />;
    }
  }
}