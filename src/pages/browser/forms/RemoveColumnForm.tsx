import * as React            from 'react';
import {EuiForm}             from '@elastic/eui';
import {EuiButtonEmpty}      from '@elastic/eui';
import {EuiButton}           from '@elastic/eui';
import {Field}               from 'redux-form';
import {SubmissionError}     from 'redux-form';
import {InjectedFormProps}   from 'redux-form';
import {Form}                from 'redux-form';
import {Actions}             from "../../../actions";
import {deleteSchema}        from "../../../actions/AppActions";
import {addField}            from "../../../actions/AppActions";
import {deleteField}         from "../../../actions/AppActions";
import {fetchSchemas}        from "../../../actions/AppActions";
import {Connected}           from "../../../decorators/Connected";
import {ReduxForm}           from "../../../decorators/ReduxForm";
import {WithRouter}          from "../../../decorators/WithRouter";
import {getSchemas}          from "../../../selectors/app";
import {StoreState}          from "../../../store/state";
import {Select}              from "../../../components/form/Select";
import {RouteComponentProps} from 'react-router';


@WithRouter
@ReduxForm({form: 'remove-column'})
@Connected
export class RemoveColumnForm extends React.Component<RemoveColumnFormProps, RemoveColumnFormState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        fields: getSchemas(state)[props.match.params.entity].fields
      }
    })
  }


  @Connected
  get actions() {
    const updateModal = Actions.updateModal;
    return Connected.actions({fetchSchemas, addField, deleteField, deleteSchema, updateModal})
  }

  onCancel = () => {

    this.actions.updateModal(this.props.match.params.entity, null)
  };

  onSubmit = async ({column}) => {
    try {
      await this.actions.deleteField(this.props.match.params.entity, column);
      await this.actions.fetchSchemas();
      this.actions.updateModal(this.props.match.params.entity, null)
      return true
    } catch (e) {
      throw new SubmissionError({column: e.message})
    }

  };

  render() {
    return (<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <EuiForm>
        <Field name="column" label="Column" options={
          Object.keys(this.model.fields).map((className) => ({value: className, text: className}))}
               component={Select}/>
        <EuiButtonEmpty onClick={this.onCancel}>Cancel</EuiButtonEmpty>
        <EuiButton isLoading={this.props.submitting} type="submit" fill>Remove</EuiButton>
      </EuiForm>
    </Form>)
  }
}

export interface RemoveColumnFormProps extends Partial<InjectedFormProps>, Partial<RouteComponentProps<{ entity: string }>> {
}

export interface RemoveColumnFormState {
}
    