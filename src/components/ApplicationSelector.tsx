import * as React                from 'react';
import {Application}             from "../store/state";
import {EuiFlyout}               from '@elastic/eui';
import {EuiFlyoutHeader}         from '@elastic/eui';
import {EuiTitle}                from '@elastic/eui';
import {EuiIcon}                 from '@elastic/eui';
import {EuiFlyoutBody}           from '@elastic/eui';
import {EuiFlexItem}             from '@elastic/eui';
import {EuiCard}                 from '@elastic/eui';
import {EuiKeyPadMenuItemButton} from '@elastic/eui';
import {IconType}                from '@elastic/eui';

const iconMapping = {
  1: "logoBeats",
  2: "logoCloud",
  3: "logoKibana",
  4: "logoXpack"
};

export class ApplicationSelector extends React.Component<ApplicationSelectorProps, ApplicationSelectorState> {
  state = {
    isFlyoutVisible: false
  };

  closeFlyout = () => {
    this.setState({isFlyoutVisible: false})
  };

  onSelectorClick = () => {
    this.setState({
      isFlyoutVisible: !this.state.isFlyoutVisible,
    });
  };

  onAppSelect = (id: string) => {
    this.closeFlyout();
    this.props.onApplicationChange(id)
  };

  render() {
    const {applications, selectedApplicationId} = this.props;
    const flyout = (
      <EuiFlyout className='left' ownFocus onClose={this.closeFlyout} size="s" aria-labelledby="flyoutSmallTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">
              Applications
            </h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          {Object.keys(applications).map((id, index) => (
            id != selectedApplicationId && <EuiFlexItem key={index}>
              <EuiCard
                icon={<EuiIcon size="xxl" type={applications[id].iconType}/>}
                title={applications[id].name}
                description={''}
                onClick={() => this.onAppSelect(id)}
              />
            </EuiFlexItem>
          ))}
        </EuiFlyoutBody>
      </EuiFlyout>);


    return (
      <div className={'duiAppSelector'}>
        <EuiIcon  onClick={this.onSelectorClick} type={applications[selectedApplicationId].iconType} size={"xl"}/>
        {this.state.isFlyoutVisible && flyout}
      </div>
    )
  }
}

export interface ApplicationSelectorProps {
  selectedApplicationId: string,
  applications: any
  onApplicationChange: (a: string) => void
}

export interface ApplicationSelectorState {
  isFlyoutVisible: boolean
}
