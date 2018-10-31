import * as React                                 from 'react';
import {EuiButton, EuiFieldPassword, EuiFlexItem} from '@elastic/eui';
import {EuiForm}                                  from '@elastic/eui';
import {EuiFormRow}                               from '@elastic/eui';
import {EuiFieldText}                             from '@elastic/eui';

export class Login extends React.Component<LoginProps, LoginState> {

    render() {
        return (
            <EuiFlexItem style={{ minWidth: 300 }}>
                <EuiForm>
                    <EuiFormRow
                        label="Username"
                        fullWidth={true}>
                        <EuiFieldText name="username"/>
                    </EuiFormRow>
                    <EuiFormRow
                        itemType='password'
                        label="Password"
                        fullWidth={true}>
                        <EuiFieldPassword name="password"/>
                    </EuiFormRow>
                    <EuiFlexItem>
                        <EuiButton type="submit" size="s" fill>
                            Login
                        </EuiButton>
                    </EuiFlexItem>
                </EuiForm>
            </EuiFlexItem>
        )
    }
}

export interface LoginProps {
}

export interface LoginState {
}
    