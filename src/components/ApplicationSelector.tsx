import * as React                                                      from 'react';
import {Application}                                                   from "../store/state";
import {EuiKeyPadMenuItemButton, EuiFlyout, EuiFlyoutHeader, EuiTitle} from '@elastic/eui';
import {EuiIcon}                                                       from '@elastic/eui';
import {EuiFlyoutBody}                                                 from '@elastic/eui';
import {EuiFlexItem}                                                   from '@elastic/eui';
import {EuiCard}                                                       from '@elastic/eui';

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
        this.setState({ isFlyoutVisible: false })
    };

    onSelectorClick = () => {
        this.setState({
            isFlyoutVisible: !this.state.isFlyoutVisible,
        });
    };

    onAppSelect = (application: Application) => {
        this.closeFlyout();
        this.props.onApplicationChange(application)
    };

    render() {
        const { applications,selectedApplication } = this.props;
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
                    {applications.map(({ id, name },index) => (
                        <EuiFlexItem key={index}>
                            <EuiCard
                                icon={<EuiIcon size="xxl" type={iconMapping[id]}/>}
                                title={name}
                                description={''}
                                onClick={() => this.onAppSelect({ id, name })}
                            />
                        </EuiFlexItem>
                    ))}
                </EuiFlyoutBody>
            </EuiFlyout>);


        return (
            <React.Fragment>
                <EuiKeyPadMenuItemButton
                    label="Application"
                    onClick={this.onSelectorClick}
                >
                    <EuiIcon type={iconMapping[selectedApplication]} size="l"/>
                </EuiKeyPadMenuItemButton>
                {this.state.isFlyoutVisible && flyout}
            </React.Fragment>
        )
    }
}

export interface ApplicationSelectorProps {
    selectedApplication: number,
    applications: Array<Application>
    onApplicationChange: (a: Application) => void
}

export interface ApplicationSelectorState {
    isFlyoutVisible: boolean
}
    