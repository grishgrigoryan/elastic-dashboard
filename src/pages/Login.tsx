import * as React            from 'react';
import {EuiButton}           from '@elastic/eui';
import {EuiLoadingSpinner}   from '@elastic/eui';
import {EuiFieldPassword}    from '@elastic/eui';
import {EuiFlexItem}         from '@elastic/eui';
import {EuiForm}             from '@elastic/eui';
import {EuiFormRow}          from '@elastic/eui';
import {EuiFieldText}        from '@elastic/eui';
import {EuiPageContentBody}  from '@elastic/eui';
import {EuiPageContent}      from '@elastic/eui';
import {EuiPageBody}         from '@elastic/eui';
import {EuiPage}             from '@elastic/eui';
import {fetchSchemas}        from "../actions/AppActions";
import {fetchApplications}   from "../actions/SessionActions";
import {authorize}           from "../actions/SessionActions";
import {Input}               from "../components/form/Input";
import {Connected}           from "../decorators/Connected";
import {ReduxForm}           from "../decorators/ReduxForm";
import {getBrowse}           from "../selectors/browse";
import {StoreState}          from "../store/state";
import {RouteComponentProps} from 'react-router-dom';
import {Form}                from 'redux-form';
import {InjectedFormProps}   from 'redux-form';
import {Field}               from 'redux-form';
import {SubmissionError}     from 'redux-form'


@ReduxForm({form: 'login'})
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
    return Connected.actions({
      authorize, fetchApplications, fetchSchemas
    })
  }


  onFormSubmit = async ({username, password}) => {
    try {
      await this.actions.authorize(username, password)
    } catch (e) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    }
    try {
      await this.actions.fetchApplications();
      await this.actions.fetchSchemas();
      this.props.history.push(`/config`)
    } catch (e) {
      alert()
    }

  };

  render() {
    return <EuiPage style={{height: "100vh"}}>
      <EuiPageBody>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <EuiFlexItem style={{minWidth: 300}}>
              {this.model.loading && "LOADINF"}
              <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <EuiForm>
                  <Field name="username" label="Username" component={Input}/>
                  <Field name="password" label="Password" type={'password'} component={Input}/>
                  <EuiFlexItem>
                    <EuiButton isLoading={this.props.submitting} type="submit" size="s" fill>Login</EuiButton>
                  </EuiFlexItem>
                </EuiForm>
              </Form>
            </EuiFlexItem>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  }
}

export interface LoginProps extends InjectedFormProps, RouteComponentProps<any> {

}

export interface LoginState {
}
    