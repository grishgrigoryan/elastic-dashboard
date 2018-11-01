import * as React            from 'react';
import {Route}               from 'react-router-dom';
import {Redirect}            from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import {Connected}           from "../decorators/Connected";
import {getUser}             from "../selectors/session";
import {StoreState}          from "../store/state";


@Connected
export class AuthRoute extends React.PureComponent<any, any> {


  @Connected
  get model() {
    return Connected.state((state: StoreState) => {
      return {sessionUser: getUser(state)}
    })
  }

  renderRoute = (renderProps: RouteComponentProps<any>) => {
    const {component: Component} = this.props;
    if (!this.model.sessionUser) {
      return <Redirect
        to={{
          pathname: `/login`,
          state: {
            from: location.pathname || '/'
          }
        }}
      />
    }
    return (
      <Component {...renderProps} />
    );
  };

  render() {
    const {
      component,
      redirectPath,
      ...rest
    } = this.props
    return <Route {...rest} render={this.renderRoute}/>;
  }
}