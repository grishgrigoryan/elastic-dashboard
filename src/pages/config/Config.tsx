import * as React       from 'react';
import {EuiEmptyPrompt} from '@elastic/eui';
import {EuiButton}      from '@elastic/eui';
import {EuiButtonEmpty} from '@elastic/eui';

export class Config extends React.Component<ConfigProps, ConfigState> {

  render() {
    return (
      <EuiEmptyPrompt
        title={<h2>Dynamically configure your app</h2>}
        actions={[
          <EuiButton color="primary" fill>Harvest spice</EuiButton>,
          <EuiButtonEmpty color="danger">Sabotage all spice fields</EuiButtonEmpty>,
        ]}
      />
    )
  }
}

export interface ConfigProps {
}

export interface ConfigState {
}
    