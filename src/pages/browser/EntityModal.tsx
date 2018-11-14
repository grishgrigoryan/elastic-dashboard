import * as React                 from 'react';
import {EuiForm}                  from '@elastic/eui';
import {EuiConfirmModal}          from '@elastic/eui';
import {EuiOverlayMask}           from '@elastic/eui';
import {EuiModal}                 from '@elastic/eui';
import {EuiModalHeader}           from '@elastic/eui';
import {EuiButtonEmpty}           from '@elastic/eui';
import {EuiButton}                from '@elastic/eui';
import {EUI_MODAL_CONFIRM_BUTTON} from '@elastic/eui';
import {RouteComponentProps}      from 'react-router';
import {EuiModalHeaderTitle}      from '@elastic/eui';
import {EuiModalBody}             from '@elastic/eui';
import {AddColumnForm}            from "./forms/AddColumnForm";
import {RemoveColumnForm}         from "./forms/RemoveColumnForm";
import {Actions}                  from "../../actions";
import {deleteSchema}             from "../../actions/AppActions";
import {addField}                 from "../../actions/AppActions";
import {deleteField}              from "../../actions/AppActions";
import {fetchSchemas}             from "../../actions/AppActions";
import {Connected}                from "../../decorators/Connected";
import {WithRouter}               from "../../decorators/WithRouter";
import {StoreState}               from "../../store/state";

@WithRouter
@Connected
export class EntityModal extends React.Component<EntityModalProps, EntityModalState> {

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      const className = props.match.params.entity;
      const entities: any = state.entities[className] || {};
      const browse = entities.browse || {};
      const mode = browse.modal;
      return {
        mode
      }
    })
  }

  @Connected
  get actions() {
    const updateModal = Actions.updateModal;
    return Connected.actions({fetchSchemas, addField, deleteField, deleteSchema, updateModal})
  }

  onClose = () => {
    this.actions.updateModal(this.props.match.params.entity, null)

  };
  onClassDelete = async () => {
    try {
      await this.actions.deleteSchema(this.props.match.params.entity);
      this.props.history.push(`/browser/`);
      this.actions.updateModal(this.props.match.params.entity, null);
    } catch (e) {
      alert(e)
    }


  };
  onColumnDelete = () => {

  };


  render() {

    return (<React.Fragment>
      {this.model.mode == 'CLASS_DELETE' &&
      <EuiOverlayMask>
        <EuiConfirmModal
          title="Delete Class ?"
          onCancel={this.onClose}
          onConfirm={this.onClassDelete}
          cancelButtonText="No, don't do it"
          confirmButtonText="Yes, do it"
          defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
        >
          <p>You&rsquo;re about to do something.</p>
          <p>Are you sure you want to do this?</p>
        </EuiConfirmModal>
      </EuiOverlayMask>
      }
      {
        this.model.mode == 'COLUMN_DELETE' &&
        <EuiOverlayMask>
          <EuiModal
            onClose={this.onClose}
            maxWidth={false}
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                Remove a column
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <RemoveColumnForm/>
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      }{
      this.model.mode == 'COLUMN_ADD' &&
      <EuiOverlayMask>
        <EuiModal
          onClose={this.onClose}
          maxWidth={false}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Add a new column
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <AddColumnForm/>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    }
    </React.Fragment>)
  }
}

export interface EntityModalProps extends Partial<RouteComponentProps<{ entity: string }>> {
}

export interface EntityModalState {
}
    