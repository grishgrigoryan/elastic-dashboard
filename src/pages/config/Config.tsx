import * as React            from 'react';
import {EuiEmptyPrompt}      from '@elastic/eui';
import {EuiButton}           from '@elastic/eui';
import {EuiButtonEmpty}      from '@elastic/eui';
import {RouteComponentProps} from 'react-router';
import {StoreState}          from "../../store/state";
import {getApplications}     from "../../selectors/session";
import {Connected}           from "../../decorators/Connected";
import {WithRouter}          from "../../decorators/WithRouter";

@WithRouter
@Connected
export class Config extends React.Component<ConfigProps, ConfigState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {applications: getApplications(state)}
    })
  }

  render() {
    const {match: {params: {appId}}} = this.props;
    const activeApplication = this.model.applications.find(({id}) => (id == parseInt(appId)))
    return (
      <EuiEmptyPrompt
        title={<h2>Application name/id :{activeApplication.name}/ {appId}</h2>}
        actions={[
          <EuiButton color="primary" fill>Harvest spice</EuiButton>,
          <EuiButtonEmpty color="danger">Sabotage all spice fields</EuiButtonEmpty>,
        ]}
      />
    )
  }
}

export interface ConfigProps extends Partial<RouteComponentProps<{ appId: string }>> {
}

export interface ConfigState {
}
    