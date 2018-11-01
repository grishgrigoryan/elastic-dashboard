import * as React            from 'react';
import {WithRouter}          from "../decorators/WithRouter";
import {AppBarItem}          from "./AppBarItem";
import {RouteComponentProps} from 'react-router';

@WithRouter
export class AppBar extends React.Component<AppBarProps, AppBarState> {
  render() {
    const {match} = this.props;
    return <div className={'duiAppBar'}>
      <AppBarItem to={`${match.url}/browser`} iconType={'addDataApp'}/>
      <AppBarItem to={`${match.url}/job`} iconType={'dashboardApp'}/>
      <AppBarItem to={`${match.url}/config`} iconType={'devToolsApp'}/>
    </div>
  }
}

export interface AppBarProps extends Partial<RouteComponentProps<any>> {
}

export interface AppBarState {
}
    