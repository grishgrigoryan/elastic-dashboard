import * as React               from 'react';
import {EuiEmptyPrompt}         from '@elastic/eui';
import {EuiButton}              from '@elastic/eui';
import {EuiButtonEmpty}         from '@elastic/eui';
import {RouteComponentProps}    from 'react-router';
import {getSelectedApplication} from "../../selectors/session";
import {StoreState}             from "../../store/state";
import {Connected}              from "../../decorators/Connected";
import {WithRouter}             from "../../decorators/WithRouter";

@WithRouter
@Connected
export class Config extends React.Component<ConfigProps, ConfigState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {selectedApp: getSelectedApplication(state)}
    })
  }

  render() {
    const {selectedApp} = this.model;
    return (
      <EuiEmptyPrompt
        title={<h2>Application name/id :{selectedApp.name}</h2>}
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
    