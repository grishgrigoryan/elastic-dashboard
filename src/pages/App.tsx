import * as React               from 'react';
import {EuiButton}              from '@elastic/eui';
import {EuiFieldPassword}       from '@elastic/eui';
import {EuiFlexItem}            from '@elastic/eui';
import {EuiForm}                from '@elastic/eui';
import {EuiFormRow}             from '@elastic/eui';
import {EuiFieldText}           from '@elastic/eui';
import {EuiPageHeader}          from '@elastic/eui';
import {EuiPageHeaderSection}   from '@elastic/eui';
import {EuiTitle}               from '@elastic/eui';
import {EuiPageContentBody}     from '@elastic/eui';
import {EuiPageContent}         from '@elastic/eui';
import {EuiPageSideBar}         from '@elastic/eui';
import {EuiPageBody}            from '@elastic/eui';
import {EuiLoadingSpinner}      from '@elastic/eui';
import {EuiPage}                from '@elastic/eui';
import {EuiPanel}               from '@elastic/eui';
import {EuiFlexGroup}           from '@elastic/eui';
import {EuiIcon}                from '@elastic/eui';
import {EuiLink}                from '@elastic/eui';
import {IconType}               from '@elastic/eui';
import {Switch}                 from 'react-router-dom';
import {Route}                  from 'react-router-dom';
import {Actions}                from "../actions";
import {fetchSchemas}           from "../actions/AppActions";
import {AppBar}                 from "../components/AppBar";
import {Connected}              from "../decorators/Connected";
import {getSelectedApplication} from "../selectors/session";
import {StoreState}             from "../store/state";
import {Browser}                from "./browser/Browser";
import {BrowserEntity}          from "./browser/BrowserEntity";
import {BrowserNavBar}          from "./browser/BrowserNavBar";
import {Config}                 from "./config/Config";
import {Job}                    from "./job/Job";
import {JobAll}                 from "./job/JobAll";
import {JobNavBar}              from "./job/JobNavBar";
import {JobStatus}              from "./job/JobStatus";


@Connected
export class App extends React.Component<LoginProps, LoginState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        loading: state.browse.loading,
        initialized: state.app.initialized,
        selectedApp: getSelectedApplication(state)
      }
    })
  }

  @Connected
  get actions() {
    const showLoader = Actions.showLoader;
    const hideLoader = Actions.hideLoader;
    const initialized = Actions.initialized;
    return Connected.actions({fetchSchemas, showLoader, hideLoader, initialized})
  }

  async componentDidMount() {
    const {selectedApp} = this.model;
    Parse.initialize(selectedApp.applicationId, selectedApp.masterKey);
    Parse.serverURL = selectedApp.serverURL;
    Parse.masterKey = selectedApp.masterKey;
    await this.actions.fetchSchemas();
    this.actions.initialized();
  }

  render() {
    const {initialized} = this.model;
    return (initialized && <EuiPage style={{minHeight: "100vh"}}>
        <EuiPageSideBar>
          <AppBar/>
          <Switch>
            <Route path={"/browser"} component={BrowserNavBar}/>
            <Route path={"/job"} component={JobNavBar}/>
          </Switch>
        </EuiPageSideBar>
        <EuiPageBody>
          <EuiFlexItem>
            <Switch>
              <Route path={"/browser"}>
                <Switch>
                  <Route path={"/browser/:entity"} component={BrowserEntity}/>
                  <Route path={"/browser/"} component={Browser}/>
                </Switch>
              </Route>
              <Route path={"/job"}>
                <Switch>
                  <Route path={"/job/all"} component={JobAll}/>
                  <Route path={"/job/status"} component={JobStatus}/>
                  <Route path={"/job/"} component={Job}/>
                </Switch>
              </Route>
              <Route path={"/config"} component={Config}/>
              <Route path={"/"} component={() => (<div>Index page ?</div>)}/>
            </Switch>
          </EuiFlexItem>
        </EuiPageBody>
      </EuiPage>
    )
  }
}

export interface LoginProps {
  history?: any;
  match?: any;
  location?: any;
}

export interface LoginState {
}
