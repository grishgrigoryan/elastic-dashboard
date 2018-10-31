import * as React from 'react';

import classnames             from 'classnames';
import {EuiButton}            from '@elastic/eui';
import {EuiFieldPassword}     from '@elastic/eui';
import {EuiFlexItem}          from '@elastic/eui';
import {EuiForm}              from '@elastic/eui';
import {EuiFormRow}           from '@elastic/eui';
import {EuiFieldText}         from '@elastic/eui';
import {EuiPageHeader}        from '@elastic/eui';
import {EuiPageHeaderSection} from '@elastic/eui';
import {EuiTitle}           from '@elastic/eui';
import {EuiPageContentBody} from '@elastic/eui';
import {EuiPageContent} from '@elastic/eui';
import {EuiPageSideBar} from '@elastic/eui';
import {EuiPageBody}    from '@elastic/eui';
import {EuiPage}        from '@elastic/eui';
import {EuiPanel}       from '@elastic/eui';
import {EuiFlexGroup}   from '@elastic/eui';
import {EuiIcon}        from '@elastic/eui';
import {EuiLink}        from '@elastic/eui';
import {withRouter}     from 'react-router-dom';
import {NavLink}        from 'react-router-dom';
import {IconType}       from '@elastic/eui';
import {WithRouter}     from '../decorators/WithRouter';

@WithRouter
class AppBar extends React.Component<any> {
  render() {
    console.info(this.props);
    return <div className={'duiAppBar'}>
      <AppBarItem to={`${this.props.match.url}/browse`} iconType={'dashboardApp'}/>
      <AppBarItem to={`${this.props.match.url}/browse`} iconType={'dashboardApp'} isActive={true}/>
      <AppBarItem to={`${this.props.match.url}/browse`} iconType={'dashboardApp'}/>
    </div>
  }
}

class AppBarItem extends React.Component<{ isActive?: boolean, iconType: IconType, to: string }> {
  render() {
    return <NavLink to={this.props.to} className={classnames('duiAppBarItem')} activeClassName={'duiAppBarItem--active'}><EuiIcon type={this.props.iconType} size={"xl"}/></NavLink>
  }
}

class NavBarItem extends React.Component<{ isActive?: boolean }> {
  render() {
    return <div className={
      classnames('duiNavBarItem', {
        'duiNavBarItem--active': this.props.isActive
      })
    }>{this.props.children}</div>
  }
}

class NavBar extends React.Component {
  render() {
    return <div className={'duiNavBar'}>
      <NavBarItem>Section One</NavBarItem>
      <NavBarItem isActive={true}>Section Two</NavBarItem>
      <NavBarItem>Section Three</NavBarItem>
    </div>
  }
}

export class Home extends React.Component<LoginProps, LoginState> {
  render() {
    console.info(this.props);
    return <EuiPage style={{ height: "100vh" }}>
      <EuiPageSideBar>
        <AppBar/>
        <NavBar/>
      </EuiPageSideBar>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>{'HOME'}</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            Page abilities
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiFlexItem>
          Home
        </EuiFlexItem>
      </EuiPageBody>
    </EuiPage>
  }
}

export interface LoginProps {
  history?: any;
  location?: any;
}

export interface LoginState {
}
    