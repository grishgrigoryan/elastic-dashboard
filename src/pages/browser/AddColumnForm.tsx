import * as React          from 'react';
import {EuiForm}           from '@elastic/eui';
import {EuiButtonEmpty}    from '@elastic/eui';
import {EuiButton}         from '@elastic/eui';
import {Field}             from 'redux-form';
import {InjectedFormProps} from 'redux-form';
import {Form}              from 'redux-form';
import {formValueSelector} from "redux-form";
import {Connected}         from "../../decorators/Connected";
import {ReduxForm}         from "../../decorators/ReduxForm";
import {getSchemas}        from "../../selectors/app";
import {getEntityNames}    from "../../selectors/app";
import {StoreState}        from "../../store/state";
import {Input}             from "../../components/form/Input";
import {Select}            from "../../components/form/Select";

@ReduxForm({form: 'add-column'})
@Connected
export class AddColumnForm extends React.Component<AddColumnFormProps, AddColumnFormState> {

  @Connected
  get model() {
    const selector = formValueSelector('add-column');
    return Connected.state((state: StoreState, props) => {
      return {
        selectedType: selector(state, 'type'),
        entityNames: getEntityNames(state),
        fields: getSchemas(state)[props.entityName]
      }
    })
  }

  render() {
    return (<Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
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
        <EuiButtonEmpty onClick={this.props.onCancel}>Cancel</EuiButtonEmpty>
        <EuiButton isLoading={this.props.submitting} type="submit" fill>Add</EuiButton>
      </EuiForm>
    </Form>)
  }
}

export interface AddColumnFormProps extends Partial<InjectedFormProps> {
  onCancel: () => void
  onSubmit: any
  entityName: string
}

export interface AddColumnFormState {
}
    