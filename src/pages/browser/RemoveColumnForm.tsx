import * as React          from 'react';
import {EuiForm}           from '@elastic/eui';
import {EuiButtonEmpty}    from '@elastic/eui';
import {EuiButton}         from '@elastic/eui';
import {Field}             from 'redux-form';
import {InjectedFormProps} from 'redux-form';
import {Form}              from 'redux-form';
import {Connected}         from "../../decorators/Connected";
import {ReduxForm}         from "../../decorators/ReduxForm";
import {getSchemas}        from "../../selectors/app";
import {StoreState}        from "../../store/state";
import {Select}            from "../../components/form/Select";


@ReduxForm({form: 'remove-column'})
@Connected
export class RemoveColumnForm extends React.Component<RemoveColumnFormProps, RemoveColumnFormState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        fields: getSchemas(state)[props.entityName].fields
      }
    })
  }

  render() {
    return (<Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
      <EuiForm>
        <Field name="column" label="Column" options={
          Object.keys(this.model.fields).map((className) => ({value: className, text: className}))}
               component={Select}/>
        <EuiButtonEmpty onClick={this.props.onCancel}>Cancel</EuiButtonEmpty>
        <EuiButton isLoading={this.props.submitting} type="submit" fill>Remove</EuiButton>
      </EuiForm>
    </Form>)
  }
}

export interface RemoveColumnFormProps extends Partial<InjectedFormProps> {
  onCancel: () => void
  onSubmit: any
  entityName: string
}

export interface RemoveColumnFormState {
}
    