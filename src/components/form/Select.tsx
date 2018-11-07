import * as React          from 'react';
import {EuiSelect}         from '@elastic/eui';
import {EuiFormRow}        from '@elastic/eui';
import {WrappedFieldProps} from 'redux-form';

export class Select extends React.Component<SelectProps, SelectState> {

  render() {
    const {
      input,
      options,
      label,
      meta: {touched, error, valid},
      ...rest
    } = this.props;

    return (
      <EuiFormRow label={label} fullWidth={true} error={error} isInvalid={!valid}>
        <EuiSelect options={options} {...input}/>
      </EuiFormRow>
    )
  }
}

export interface SelectProps extends WrappedFieldProps {
  label: string
  options: any
}

export interface SelectState {
}
    