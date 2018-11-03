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


  mySubmitFunction = async ({username, password}) => {
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

  renderTextField = ({input, meta: {touched, valid}, ...rest}) => {
    return <EuiFieldText  {...input} {...rest} isInvalid={!valid}/>
  };

  renderPasswordField = ({input}) => (
    <EuiFieldPassword  {...input} />
  );

  render() {
    return <EuiPage style={{height: "100vh"}}>
      <EuiPageBody>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <EuiFlexItem style={{minWidth: 300}}>
              {this.model.loading && "LOADINF"}
              <Form onSubmit={this.props.handleSubmit(this.mySubmitFunction)}>
                <EuiForm>
                  <EuiFormRow label="Username" fullWidth={true}>
                    <Field name="username" component={this.renderTextField}/>
                  </EuiFormRow>
                  <EuiFormRow label="Password" fullWidth={true}>
                    <Field name="password" component={this.renderPasswordField}/>
                  </EuiFormRow>
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
    