import * as React            from 'react';
import {Route}               from 'react-router';
import {Switch}              from 'react-router';
import {RouteComponentProps} from 'react-router';
import {WithRouter}          from "../decorators/WithRouter";
import {NavBarItem}          from "./NavBarItem";


@WithRouter
export class NavBar extends React.Component<NavBarProps, NavBarState> {
  render() {
    const {match} = this.props
    return (
      <Switch>
        <Route path={"/browser"}>
          <div className={'duiNavBar'}>
            <NavBarItem to={`/browser/users`}>Browser users</NavBarItem>
            <NavBarItem to={`/browser/admins`}>Browser admins</NavBarItem>
          </div>
        </Route>
        {/*<Route path={match.url + "/config"}>*/}
        {/*<React.Fragment>*/}
        {/*<NavBarItem to={`${match.url}/config/users`}>config users</NavBarItem>*/}
        {/*<NavBarItem to={`${match.url}/config/session`}>config admins</NavBarItem>*/}
        {/*</React.Fragment>*/}
        {/*</Route>*/}
        <Route path={"/job"}>
          <div className={'duiNavBar'}>
            <NavBarItem to={`/job/all`}>Job new</NavBarItem>
            <NavBarItem to={`/job/status`}>Job last</NavBarItem>
          </div>
        </Route>
      </Switch>
    )
  }
}

export interface NavBarProps extends Partial<RouteComponentProps<any>> {
}

export interface NavBarState {
}
    