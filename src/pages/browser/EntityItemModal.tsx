import * as React                 from 'react';
import {SubmissionError}          from 'redux-form';
import {InjectedFormProps}        from 'redux-form';
import {EuiForm}                  from '@elastic/eui';
import {EuiConfirmModal}          from '@elastic/eui';
import {EuiOverlayMask}           from '@elastic/eui';
import {EuiModal}                 from '@elastic/eui';
import {EuiModalHeader}           from '@elastic/eui';
import {EuiButtonEmpty}           from '@elastic/eui';
import {EuiButton}                from '@elastic/eui';
import {EUI_MODAL_CONFIRM_BUTTON} from '@elastic/eui';
import {EuiModalHeaderTitle}      from '@elastic/eui';
import {EuiModalBody}             from '@elastic/eui';
import {RouteComponentProps}      from 'react-router-dom';
import {Connected}                from "../../decorators/Connected";
import {ReduxForm}                from "../../decorators/ReduxForm";
import {WithRouter}               from "../../decorators/WithRouter";
import {StoreState}               from "../../store/state";
import {Actions}                  from "../../actions";
import {deleteEntityItem}         from "../../actions/EntityActions";
import {updateEntityItem}         from "../../actions/EntityActions";

import {AddRowForm} from "./forms/AddRowForm";

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
        objectId: itemModalForm.objectId,
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

  onRowDelete = async () => {
    try {
      await this.actions.deleteEntityItem(this.props.match.params.entity, this.model.objectId);
      this.actions.updateItemModalForm(this.props.match.params.entity, null)
    } catch (e) {
      console.log(e);
      throw new SubmissionError(e.message)
    }

  };


  render() {
    const mode = this.model.mode;
    return (mode == 'DELETE' ?
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Delete item ?"
            onCancel={this.onClose}
            onConfirm={this.onRowDelete}
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
              <AddRowForm/>
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
    