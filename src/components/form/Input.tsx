import * as React          from 'react';
import {EuiFieldText}      from '@elastic/eui';
import {EuiFieldPassword}  from '@elastic/eui';
import {EuiFormRow}        from '@elastic/eui';
import {WrappedFieldProps} from 'redux-form';

export class Input extends React.Component<InputProps, InputState> {

  static defaultProps = {
    type: "text"
  }

  render() {
    const {
      input,
      label,
      type,
      meta: {touched, error, valid},
      ...rest
    } = this.props;
    console.log(input);
    return (
      <EuiFormRow label={label} fullWidth={true} error={error} isInvalid={!valid}>
        {
          type != 'password' ?
            <EuiFieldText type={type} {...input} {...rest} isInvalid={!valid}/>
            : <EuiFieldPassword  {...input} />
        }
      </EuiFormRow>
    )
  }
}

export interface InputProps extends WrappedFieldProps {
  label: string
  type?: "text" | "password"
}

export interface InputState {
}
    