import * as React           from 'react';
import {EuiButton}          from '@elastic/eui';
import {EuiFieldPassword}   from '@elastic/eui';
import {EuiFlexItem}        from '@elastic/eui';
import {EuiForm}            from '@elastic/eui';
import {EuiFormRow}         from '@elastic/eui';
import {EuiFieldText}       from '@elastic/eui';
import {EuiPageContentBody} from '@elastic/eui';
import {EuiPageContent}     from '@elastic/eui';
import {EuiPageBody}        from '@elastic/eui';
import {EuiPage}            from '@elastic/eui';


export class Login extends React.Component<LoginProps, LoginState> {
  state = {
    username: '',
    password: '',
  };

  onSubmit = async () => {
    try {
      let user = await Parse.User.logIn(
        this.state.username,
        this.state.password
      );
      console.info(this.props);
      this.props.history.push('/')
    } catch (e) {
      console.error(e);
    }
  };

  render() {

    return <EuiPage style={{ height: "100vh" }}>
      <EuiPageBody>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <EuiFlexItem style={{ minWidth: 300 }}>
              <EuiForm>
                <EuiFormRow label="Username" fullWidth={true}>
                  <EuiFieldText
                    value={this.state.username}
                    name="username" onChange={(e) => this.setState({ username: e.target.value })}
                  />
                </EuiFormRow>
                <EuiFormRow itemType='password' label="Password" fullWidth={true}>
                  <EuiFieldPassword
                    value={this.state.password} name="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
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

export interface LoginProps {
  history?: any;
  location?: any;
}

export interface LoginState {
}
    