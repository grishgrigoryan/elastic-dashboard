import * as React             from 'react';
import {EuiButton}            from '@elastic/eui';
import {EuiFieldPassword}     from '@elastic/eui';
import {EuiFlexItem}          from '@elastic/eui';
import {EuiForm}              from '@elastic/eui';
import {EuiFormRow}           from '@elastic/eui';
import {EuiFieldText}         from '@elastic/eui';
import {EuiPageHeader}        from '@elastic/eui';
import {EuiPageHeaderSection} from '@elastic/eui';
import {EuiTitle}             from '@elastic/eui';
import {EuiPageContentBody}   from '@elastic/eui';
import {EuiPageContent}       from '@elastic/eui';
import {EuiPageSideBar}       from '@elastic/eui';
import {EuiPageBody}          from '@elastic/eui';
import {EuiPage}              from '@elastic/eui';
import {EuiPanel}             from '@elastic/eui';
import {EuiFlexGroup}         from '@elastic/eui';
import {EuiIcon}              from '@elastic/eui';
import {EuiLink}              from '@elastic/eui';
import {IconType}             from '@elastic/eui';
import {Switch}               from 'react-router-dom';
import {Route}                from 'react-router-dom';
import {AppBar}               from "../components/AppBar";
import {NavBar}               from "../components/NavBar";
import {WithRouter}           from '../decorators/WithRouter';
import {Browser}              from "./browser/Browser";
import {BrowserEntity}        from "./browser/BrowserEntity";
import {Config}               from "./config/Config";
import {Job}                  from "./job/Job";
import {JobAll}               from "./job/JobAll";
import {JobStatus}            from "./job/JobStatus";


@WithRouter
class PageComponent extends React.Component<any> {
  render() {
    const {match} = this.props
    return <React.Fragment>
      <EuiFlexItem>
        <Switch>
          <Route path={match.url + "/browser"}>
            <Switch>
              <Route path={match.url + "/browser/:entity"} component={BrowserEntity}/>
              <Route path={match.url + "/browser/"} component={Browser}/>
            </Switch>
          </Route>
          <Route path={match.url + "/job"}>
            <Switch>
              <Route path={match.url + "/job/all"} component={JobAll}/>
              <Route path={match.url + "/job/status"} component={JobStatus}/>
              <Route path={match.url + "/job/"} component={Job}/>
            </Switch>
          </Route>
          <Route path={match.url + "/config/"} component={Config}/>
        </Switch>
      </EuiFlexItem>
    </React.Fragment>
  }
}

export class App extends React.Component<LoginProps, LoginState> {
  render() {
    return <EuiPage style={{height: "100vh"}}>
      <EuiPageSideBar>
        <AppBar/>
        <NavBar/>
      </EuiPageSideBar>
      <EuiPageBody>
        <PageComponent/>
      </EuiPageBody>
    </EuiPage>
  }
}

export interface LoginProps {
  history?: any;
  match?: any;
  location?: any;
}

export interface LoginState {
}
