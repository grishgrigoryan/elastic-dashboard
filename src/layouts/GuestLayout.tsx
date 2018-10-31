import * as React                    from 'react';
import {RouteComponentProps}         from 'react-router-dom';
import {EuiPage}                     from '@elastic/eui';
import {EuiPageSideBar}              from '@elastic/eui';
import {EuiPageBody}                 from '@elastic/eui';
import {EuiPageHeader}               from '@elastic/eui';
import {EuiTitle}                    from '@elastic/eui';
import {EuiPageHeaderSection}        from '@elastic/eui';
import {EuiPageContent}              from '@elastic/eui';
import {EuiPageContentHeader}        from '@elastic/eui';
import {EuiPageContentHeaderSection} from '@elastic/eui';
import {EuiPanel} from '@elastic/eui';
import {EuiPageContentBody} from '@elastic/eui';


export class GuestLayout extends React.Component<AuthLayoutProps, { open: boolean }> {
    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <EuiPage  style={{height:"100vh"}}>
                <EuiPageBody>
                    <EuiPageContent verticalPosition="center" horizontalPosition="center">
                        <EuiPageContentBody>
                            {this.props.children}
                        </EuiPageContentBody>
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        );
    };
}

export interface AuthLayoutProps extends Partial<RouteComponentProps> {

}

export default GuestLayout;
