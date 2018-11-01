import * as React                  from 'react';
import {EuiButton}                 from '@elastic/eui';
import {EuiLoadingSpinner}         from '@elastic/eui';
import {EuiFieldPassword}          from '@elastic/eui';
import {EuiFlexItem}               from '@elastic/eui';
import {EuiForm}                   from '@elastic/eui';
import {EuiFormRow}                from '@elastic/eui';
import {EuiFieldText}              from '@elastic/eui';
import {EuiPageContentBody}        from '@elastic/eui';
import {EuiPageContent}            from '@elastic/eui';
import {EuiPageBody}               from '@elastic/eui';
import {EuiPage}                   from '@elastic/eui';
import {Actions}                   from "../actions";
import {changeSelectedApplication} from "../actions/SessionActions";
import {authorize}                 from "../actions/SessionActions";
import {Connected}                 from "../decorators/Connected";
import {getBrowse}                 from "../selectors/browse";
import {Applications}              from "../store/state";
import {StoreState}                from "../store/state";
import {RouteComponentProps}       from 'react-router-dom';


@Connected
export class Login extends React.Component<LoginProps, LoginState> {
  state = {
    username: '',
    password: '',
  };

  @Connected
  get model() {
    return Connected.state((state: StoreState) => {
      return {loading: getBrowse(state).loading}
    })
  }

  @Connected
  get actions() {
    const updateApplications = Actions.updateApplications
    return Connected.actions({
      authorize, changeSelectedApplication, updateApplications
    })
  }

  onSubmit = async () => {
    try {
      await this.actions.authorize(this.state.username, this.state.password)
      let applications: Array<any> = await new Parse.Query("App").find();
      let fistAppId = applications[0].id;
      let normApp: Applications = applications.reduce((normalized, {id, attributes}) => {
        normalized[id] = attributes;
        return normalized;
      }, {});
      this.actions.updateApplications(normApp);
      this.actions.changeSelectedApplication(fistAppId);
      this.props.history.push(`/config`)
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return <EuiPage style={{height: "100vh"}}>
      <EuiPageBody>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <EuiFlexItem style={{minWidth: 300}}>
              {this.model.loading && "LOADINF"}
              <EuiForm>
                <EuiFormRow label="Username" fullWidth={true}>
                  <EuiFieldText
                    value={this.state.username}
                    name="username" onChange={(e) => this.setState({username: e.target.value})}
                  />
                </EuiFormRow>
                <EuiFormRow itemType='password' label="Password" fullWidth={true}>
                  <EuiFieldPassword
                    value={this.state.password} name="password"
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </EuiFormRow>
                <EuiFlexItem>
                  <EuiButton onClick={this.onSubmit} type="submit" size="s" fill>Login</EuiButton>
                </EuiFlexItem>
              </EuiForm>
            </EuiFlexItem>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  }
}

export interface LoginProps extends RouteComponentProps<any> {

}

export interface LoginState {
}
    