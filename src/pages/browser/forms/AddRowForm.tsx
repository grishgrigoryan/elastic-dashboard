import * as React               from 'react';
import {EuiForm}                from '@elastic/eui';
import {EuiButtonEmpty}         from '@elastic/eui';
import {EuiButton}              from '@elastic/eui';
import {RouteComponentProps}    from 'react-router';
import {Field, SubmissionError} from 'redux-form';
import {InjectedFormProps}      from 'redux-form';
import {Form}                   from 'redux-form';
import {Actions}                from "../../../actions";
import {updateEntityItem}       from "../../../actions/EntityActions";
import {deleteEntityItem}       from "../../../actions/EntityActions";
import {Connected}              from "../../../decorators/Connected";
import {ReduxForm}              from "../../../decorators/ReduxForm";
import {WithRouter}             from "../../../decorators/WithRouter";
import {getSchemas}             from "../../../selectors/app";
import {StoreState}             from "../../../store/state";
import {Input}                  from "../../../components/form/Input";


@WithRouter
@Connected
@ReduxForm({form: 'add-row'})
export class AddRowForm extends React.Component<AddRowFormProps, AddRowFormState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      const className = props.match.params.entity;
      const entities: any = state.entities[className] || {};
      const browse = entities.browse || {};
      const itemModalForm = (browse.itemModalForm) || {};
      const mode = itemModalForm.mode;
      return {
        initialValues: (state.entities[className] && state.entities[className].byId
          && state.entities[className].browse
          && state.entities[className].browse.itemModalForm
          && state.entities[className].browse.itemModalForm.objectId
          && state.entities[className].byId[state.entities[className].browse.itemModalForm.objectId]
        ),
        objectId: itemModalForm.objectId,
        tableIds: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.tableIds,
        pageSize: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.pageSize,
        schema: getSchemas(state)[className],
        mode,
      }
    })
  }

  @Connected
  get actions() {
    const updateItemModalForm = Actions.updateItemModalForm;
    const updateTableIds = Actions.updateTableIds;
    return Connected.actions({updateItemModalForm, updateEntityItem, deleteEntityItem, updateTableIds})
  }

  onClose = () => {
    this.actions.updateItemModalForm(this.props.match.params.entity, null)
  };

  onSubmit = async (values) => {
    try {
      const item: any = await this.actions.updateEntityItem(this.props.match.params.entity, values);
      console.log("ITEM ", item)
      this.actions.updateItemModalForm(this.props.match.params.entity, null);
      if (this.model.mode == 'ADD') {
        if (this.model.tableIds.length < this.model.pageSize) {
          this.model.tableIds.push(item.objectId);
          this.actions.updateTableIds(this.props.match.params.entity, this.model.tableIds)
        }
      }
    } catch (e) {
      console.log(e);
      throw new SubmissionError(e.message)
    }
  };

  get editableFields() {
    let nonEditableFields = ['objectId', 'updatedAt', 'createdAt', 'ACL']
    return Object.keys(this.model.schema.fields).filter((fieldName) => (nonEditableFields.indexOf(fieldName) == -1))
  }

  render() {
    return (<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <EuiForm>
        {this.editableFields.map((fieldName, index) => {
          return <Field key={index} name={fieldName} label={fieldName} component={Input}/>
        })}
        <EuiButtonEmpty onClick={this.onClose}>Cancel</EuiButtonEmpty>
        <EuiButton isLoading={this.props.submitting} type="submit" fill>Add</EuiButton>
      </EuiForm>
    </Form>)
  }
}

export interface AddRowFormProps extends Partial<InjectedFormProps>, Partial<RouteComponentProps<{ entity: string }>> {
}

export interface AddRowFormState {
}
    