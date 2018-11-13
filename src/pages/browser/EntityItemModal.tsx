import * as React                 from 'react';
import {Actions}                  from "../../actions";
import {deleteEntityItem}         from "../../actions/EntityActions";
import {updateEntityItem}         from "../../actions/EntityActions";
import {Input}                    from "../../components/form/Input";
import {Field, SubmissionError}   from 'redux-form';
import {InjectedFormProps}        from 'redux-form';
import {Form}                     from 'redux-form';
import {EuiForm, EuiConfirmModal} from '@elastic/eui';
import {EuiOverlayMask}           from '@elastic/eui';
import {EuiModal}                 from '@elastic/eui';
import {EuiModalHeader}           from '@elastic/eui';
import {EuiButtonEmpty}           from '@elastic/eui';
import {EuiButton}                from '@elastic/eui';
import {EUI_MODAL_CONFIRM_BUTTON} from '@elastic/eui';
import {EuiModalHeaderTitle}      from '@elastic/eui';
import {EuiModalBody}             from '@elastic/eui';
import {Connected}                from "../../decorators/Connected";
import {ReduxForm}                from "../../decorators/ReduxForm";
import {WithRouter}               from "../../decorators/WithRouter";
import {getSchemas}               from "../../selectors/app";
import {StoreState}               from "../../store/state";
import {RouteComponentProps}      from 'react-router-dom';

@WithRouter
@Connected
@ReduxForm({form: 'entities-form'})
export class EntityItemModal extends React.Component<EntityItemModalProps, EntityItemModalState> {

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
        schema: getSchemas(state)[className],
        mode,
      }
    })
  }

  @Connected
  get actions() {
    const updateItemModalForm = Actions.updateItemModalForm;
    return Connected.actions({updateItemModalForm, updateEntityItem, deleteEntityItem})
  }


  onClose = () => {
    this.actions.updateItemModalForm(this.props.match.params.entity, null)
  };
  onSubmit = async (values) => {
    try {
      await  this.actions.updateEntityItem(this.props.match.params.entity, values);
      this.actions.updateItemModalForm(this.props.match.params.entity, null)
    } catch (e) {
      console.log(e);
      throw new SubmissionError(e.message)
    }
  };
  onDelete = async () => {
    try {
      await this.actions.deleteEntityItem(this.props.match.params.entity, this.model.objectId);
      this.actions.updateItemModalForm(this.props.match.params.entity, null)
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
    const mode = this.model.mode;
    return (mode == 'DELETE' ?
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Delete item ?"
            onCancel={this.onClose}
            onConfirm={this.onDelete}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
        :
        <EuiOverlayMask>
          <EuiModal
            onClose={this.onClose}
            maxWidth={false}
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                {mode == 'EDIT' ? `Edit item ${this.model.objectId}` : `Add a new item`}
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <EuiForm>
                  {this.editableFields.map((fieldName, index) => {
                    return <Field key={index} name={fieldName} label={fieldName} component={Input}/>
                  })}
                  <EuiButtonEmpty onClick={this.onClose}>Cancel</EuiButtonEmpty>
                  <EuiButton isLoading={this.props.submitting} type="submit" fill>Add</EuiButton>
                </EuiForm>
              </Form>
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
    )
  }
}

export interface EntityItemModalProps extends Partial<InjectedFormProps>, Partial<RouteComponentProps<{ entity: string }>> {

}

export interface EntityItemModalState {
}
    