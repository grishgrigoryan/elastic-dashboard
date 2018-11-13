import * as React                       from 'react';
import {RouteComponentProps}            from 'react-router-dom';
import {EuiButton, EuiPopover, EuiIcon} from "@elastic/eui";
import {EuiTitle}                       from "@elastic/eui";
import {EuiForm}                        from '@elastic/eui';
import {EuiModal}                       from '@elastic/eui';
import {EuiOverlayMask}                 from '@elastic/eui';
import {EuiModalHeader}                 from '@elastic/eui';
import {EuiModalHeaderTitle}            from '@elastic/eui';
import {EuiModalBody}                   from '@elastic/eui';
import {EuiModalFooter}                 from '@elastic/eui';
import {EuiButtonEmpty}                 from '@elastic/eui';
import {EuiContextMenu}                 from '@elastic/eui';
import {addField}                       from "../../actions/AppActions";
import {deleteField}                    from "../../actions/AppActions";
import {fetchSchemas}                   from "../../actions/AppActions";
import {deleteSchema}                   from "../../actions/AppActions";
import {ConfirmationModal}              from "../../components/ConfirmationModal";
import {Connected}                      from "../../decorators/Connected";
import {ReduxForm}                      from "../../decorators/ReduxForm";
import {WithRouter}                     from "../../decorators/WithRouter";
import {getEntityNames}                 from "../../selectors/app";
import {getSchemas}                     from "../../selectors/app";
import {StoreState}                     from "../../store/state";
import {SubmissionError}                from "redux-form";
import {formValueSelector}              from "redux-form";
import {InjectedFormProps}              from "redux-form";
import {AddColumnForm}                  from "./AddColumnForm";
import {RemoveColumnForm}               from "./RemoveColumnForm";


@WithRouter
@ReduxForm({form: 'add-column', initialValues: {type: "String"}})
@Connected
export class BrowserEntityHeader extends React.Component<BrowserEntityHeaderProps, BrowserEntityHeaderState> {

  state = {
    isRemoveModalVisible: false,
    isAddColumnModalVisible: false,
    isRemoveColumnModalVisible: false,
  };

  @Connected
  get model() {
    const selector = formValueSelector('add-column');
    return Connected.state((state: StoreState, props) => {
      return {
        selectedType: selector(state, 'type'),
        entityNames: getEntityNames(state),
        fields: getSchemas(state)[props.match.params.entity]
      }
    })
  }

  @Connected
  get actions() {
    return Connected.actions({fetchSchemas, addField, deleteField, deleteSchema})
  }

  get entityName() {
    return this.props.match.params.entity;
  }

  closeRemoveModal = () => {
    this.setState({isRemoveModalVisible: false});
  };

  showRemoveModal = () => {
    this.setState({isRemoveModalVisible: true});
  };

  showAddColumnModal = () => {
    this.setState({isAddColumnModalVisible: true});
  };

  showRemoveColumnModal = () => {
    this.setState({isRemoveColumnModalVisible: true});
  };

  closeAddColumn = () => {
    this.setState({isAddColumnModalVisible: false});
  };

  closeRemoveColumn = () => {
    this.setState({isRemoveColumnModalVisible: false});
  };

  removeSchema = async () => {
    await this.actions.deleteSchema(this.props.match.params.entity);
    this.props.history.push(`/browser/`);
    await this.actions.fetchSchemas();
  };

  renderRemoveModal = () => {
    return (this.state.isRemoveModalVisible &&
      <ConfirmationModal
        onClose={this.closeRemoveModal}
        onConfirm={this.removeSchema}
        ctaText="Remove"
        title={`Delete class "${this.props.match.params.entity}" ?`}
        body="You can't recover deleted data."
      />
    );
  };

  onAddColumnSubmit = async ({target, name, type}) => {
    try {
      await this.actions.addField(this.entityName, name, type, target);
      await this.actions.fetchSchemas();
      this.closeAddColumn();
      return true
    } catch (e) {
      throw new SubmissionError({name: e.message})
    }

  };

  onRemoveColumnSubmit = async ({column}) => {
    try {
      await this.actions.deleteField(this.entityName, column)
      await this.actions.fetchSchemas();
      this.closeRemoveColumn();
      return true
    } catch (e) {
      throw new SubmissionError({column: e.message})
    }

  };

  renderAddColumnModal = () => {
    return (this.state.isAddColumnModalVisible && <EuiOverlayMask>
        <EuiModal
          onClose={this.closeAddColumn}
          maxWidth={false}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Add a new column
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <AddColumnForm entityName={this.props.match.params.entity} onCancel={this.closeAddColumn}
                           onSubmit={this.onAddColumnSubmit}/>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  };

  renderRemoveColumnModal = () => {
    return (this.state.isRemoveColumnModalVisible && <EuiOverlayMask>
        <EuiModal
          onClose={this.closeRemoveColumn}
          maxWidth={false}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Remove a column
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <RemoveColumnForm entityName={this.props.match.params.entity} onCancel={this.closeRemoveColumn}
                              onSubmit={this.onRemoveColumnSubmit}/>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }


  render() {
    return (
      <div className='duiEntityHeader'>
        <EuiTitle>
          <h2>{this.entityName}</h2>
        </EuiTitle>
        <EuiButton onClick={this.showRemoveModal}>Remove Class</EuiButton>
        <EuiButton onClick={this.showAddColumnModal}>Add column</EuiButton>
        <EuiButton onClick={this.showRemoveColumnModal}>Remove column</EuiButton>
        {this.renderRemoveModal()}
        {this.renderRemoveColumnModal()}
        {this.renderAddColumnModal()}
      </div>
    )
  }
}

export interface BrowserEntityHeaderProps extends Partial<InjectedFormProps>, Partial<RouteComponentProps<{ entity: string, appId: string }>> {
}

export interface BrowserEntityHeaderState {
  isRemoveModalVisible: boolean;
  isAddColumnModalVisible: boolean;
  isRemoveColumnModalVisible: boolean;
}
