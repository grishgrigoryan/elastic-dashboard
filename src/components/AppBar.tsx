import * as React                  from 'react';
import {changeSelectedApplication} from "../actions/SessionActions";
import {WithRouter}                from "../decorators/WithRouter";
import {getSelectedApplication}    from "../selectors/session";
import {getSelectedApplicationId}  from "../selectors/session";
import {getApplications}           from "../selectors/session";
import {Application}               from "../store/state";
import {StoreState}                from "../store/state";
import {AppBarItem}                from "./AppBarItem";
import {RouteComponentProps}       from 'react-router';
import {ApplicationSelector}       from "./ApplicationSelector";
import {Connected}                 from '../decorators/Connected';

@WithRouter
@Connected
export class AppBar extends React.Component<AppBarProps, AppBarState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        applications: getApplications(state),
        selectedApp: getSelectedApplication(state),
        selectedAppId: getSelectedApplicationId(state)
      }
    })
  }

  @Connected
  get actions() {
    return Connected.actions({changeSelectedApplication})
  }

  onApplicationChange = (application: Application) => {
    this.actions.changeSelectedApplication(application);
    this.props.history.push(`/config`);
  };

  render() {
    return <div className={'duiAppBar'}>
      <ApplicationSelector
        applications={this.model.applications}
        selectedApplication={this.model.selectedApp}
        onApplicationChange={this.onApplicationChange}
      />
      <AppBarItem to={`/browser`} iconType={'addDataApp'}/>
      <AppBarItem to={`/job`} iconType={'dashboardApp'}/>
      <AppBarItem to={`/config`} iconType={'devToolsApp'}/>
    </div>
  }
}

export interface AppBarProps extends Partial<RouteComponentProps<any>> {
}

export interface AppBarState {
}
    