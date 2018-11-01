import * as React            from 'react';
import {WithRouter}          from "../decorators/WithRouter";
import {getApplications}     from "../selectors/session";
import {Application}         from "../store/state";
import {StoreState}          from "../store/state";
import {AppBarItem}          from "./AppBarItem";
import {RouteComponentProps} from 'react-router';
import {ApplicationSelector} from "./ApplicationSelector";
import {Connected}           from '../decorators/Connected';

@WithRouter
@Connected
export class AppBar extends React.Component<AppBarProps, AppBarState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {applications: getApplications(state)}
    })
  }

  onApplicationChange = (app: Application) => {
    this.props.history.push(`/apps/${app.id}/config`);
  };

  render() {

    const {match} = this.props;
    return <div className={'duiAppBar'}>
      <ApplicationSelector
        applications={this.model.applications}
        selectedApplication={match.params.appId}
        onApplicationChange={this.onApplicationChange}
      />
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
    