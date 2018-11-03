import * as React            from 'react';
import {Route}               from 'react-router';
import {Switch}              from 'react-router';
import {RouteComponentProps} from 'react-router';
import {Actions}             from "../actions";
import {fetchSchemas}        from "../actions/AppActions";
import {Connected}           from "../decorators/Connected";
import {WithRouter}          from "../decorators/WithRouter";
import {getEntityNames}      from "../selectors/app";
import {StoreState}          from "../store/state";
import {NavBarItem}          from "./NavBarItem";
import {EuiButton}           from '@elastic/eui';
import {EuiFlexItem}         from '@elastic/eui';


@WithRouter
@Connected
export class NavBar extends React.Component<NavBarProps, NavBarState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {entities: getEntityNames(state)}
    })
  }

  @Connected
  get actions() {
    return Connected.actions({fetchSchemas})
  }

  render() {
    const {match} = this.props;
    const {entities} = this.model;
    return (
      <Switch>
        <Route path={"/browser"}>
          <div className={'duiNavBar'}>
            {entities.map((entityName, index) => (
              <NavBarItem key={index} to={`/browser/${entityName}`}>{entityName}</NavBarItem>)
            )}
              <EuiButton fill={true} onClick={this.actions.fetchSchemas} >Refresh</EuiButton>
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
    