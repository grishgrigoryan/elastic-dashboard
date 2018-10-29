import * as React from 'react';
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
import {SideNav}                     from "../containers/SideNav";


export class AuthLayout extends React.Component<AuthLayoutProps, { open: boolean }> {
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
        console.log("AuthLayout props", this.props);
        return (
            <EuiPage restrictWidth={1240}>
                <EuiPageSideBar>
                    <SideNav/>
                </EuiPageSideBar>
                <EuiPageBody>
                    <EuiPageContent>
                        {this.props.children}
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        );
    };
}

export interface AuthLayoutProps extends Partial<RouteComponentProps> {

}

export default AuthLayout;
