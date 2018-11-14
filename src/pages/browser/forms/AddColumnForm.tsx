import * as React               from 'react';
import {EuiForm}                from '@elastic/eui';
import {EuiButtonEmpty}         from '@elastic/eui';
import {EuiButton}              from '@elastic/eui';
import {Field, SubmissionError} from 'redux-form';
import {InjectedFormProps}      from 'redux-form';
import {Form}                   from 'redux-form';
import {formValueSelector}      from "redux-form";
import {RouteComponentProps}    from 'react-router';
import {Actions}                from "../../../actions";
import {deleteSchema}           from "../../../actions/AppActions";
import {addField}               from "../../../actions/AppActions";
import {fetchSchemas}           from "../../../actions/AppActions";
import {Connected}              from "../../../decorators/Connected";
import {ReduxForm}              from "../../../decorators/ReduxForm";
import {WithRouter}             from "../../../decorators/WithRouter";
import {getSchemas}             from "../../../selectors/app";
import {getEntityNames}         from "../../../selectors/app";
import {StoreState}             from "../../../store/state";
import {Input}                  from "../../../components/form/Input";
import {Select}                 from "../../../components/form/Select";

@WithRouter
@Connected
@ReduxForm({form: 'add-column'})
export class AddColumnForm extends React.Component<AddColumnFormProps, AddColumnFormState> {

  @Connected
  get model() {
    const selector = formValueSelector('add-column');
    return Connected.state((state: StoreState, props) => {
      return {
        selectedType: selector(state, 'type'),
        initialValues: {type: "String"},
        entityNames: getEntityNames(state),
        fields: getSchemas(state)[props.match.params.entity]
      }
    })
  }

  @Connected
  get actions() {
    const updateModal = Actions.updateModal;
    return Connected.actions({fetchSchemas, addField, deleteSchema, updateModal})
  }

  onCancel = () => {
    this.actions.updateModal(this.props.match.params.entity, null)
  };

  onSubmit = async ({target, name, type}) => {
    try {
      await this.actions.addField(this.props.match.params.entity, name, type, target);
      await this.actions.fetchSchemas();
      this.actions.updateModal(this.props.match.params.entity, null)
      return true
    } catch (e) {
      throw new SubmissionError({name: e.message})
    }


  };

  render() {
    return (<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <EuiForm>
        <Field name="name" label="Name" component={Input}/>
        <Field name="type" label="Type" options={[
          {value: "String", text: "String"},
          {value: "Number", text: "Number"},
          {value: "Date", text: "Date"},
          {value: "File", text: "File"},
          {value: "GeoPoint", text: "GeoPoint"},
          {value: "Polygon", text: "Polygon"},
          {value: "Array", text: "Array"},
          {value: "Object", text: "Object"},
          {value: "Boolean", text: "Boolean"},
          {value: "Pointer", text: "Pointer"},
          {value: "Relation", text: "Relation"}
        ]} component={Select}/>
        {['Pointer', 'Relation'].indexOf(this.model.selectedType) != -1
        && <Field name="target" label="Target Class" options={
          this.model.entityNames.map((className) => ({value: className, text: className}))}
                  component={Select}/>}
        <EuiButtonEmpty onClick={this.onCancel}>Cancel</EuiButtonEmpty>
        <EuiButton isLoading={this.props.submitting} type="submit" fill>Add</EuiButton>
      </EuiForm>
    </Form>)
  }
}

export interface AddColumnFormProps extends Partial<InjectedFormProps>, Partial<RouteComponentProps<{ entity: string }>> {
}

export interface AddColumnFormState {
}
    