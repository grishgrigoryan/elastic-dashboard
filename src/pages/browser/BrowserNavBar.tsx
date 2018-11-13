import * as React            from 'react';
import {createSchema}        from "../../actions/AppActions";
import {fetchSchemas}        from "../../actions/AppActions";
import {Input}               from "../../components/form/Input";
import {NavBar}              from "../../components/NavBar";
import {NavBarItem}          from "../../components/NavBarItem";
import {Connected}           from "../../decorators/Connected";
import {Form}                from "redux-form";
import {SubmissionError}     from "redux-form";
import {InjectedFormProps}   from "redux-form";
import {ReduxForm}           from "../../decorators/ReduxForm";
import {WithRouter}          from "../../decorators/WithRouter";
import {getEntityNames}      from "../../selectors/app";
import {StoreState}          from "../../store/state";
import {EuiForm}             from '@elastic/eui';
import {EuiButton}           from '@elastic/eui';
import {EuiModal}            from '@elastic/eui';
import {EuiOverlayMask}      from '@elastic/eui';
import {EuiModalHeader}      from '@elastic/eui';
import {EuiModalHeaderTitle} from '@elastic/eui';
import {EuiModalBody}        from '@elastic/eui';
import {EuiModalFooter}      from '@elastic/eui';
import {EuiButtonEmpty}      from '@elastic/eui';
import {EuiFlexItem}         from '@elastic/eui';
import {Field}               from 'redux-form';

@Connected
@ReduxForm({form: 'add-schema'})
@WithRouter
export class BrowserNavBar extends React.Component<BrowserNavBarProps, BrowserNavBarState> {

  state = {
    isModalVisible: false,
  };

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        entities: getEntityNames(state),
      }
    })
  }

  @Connected
  get actions() {
    return Connected.actions({fetchSchemas, createSchema})
  }


  closeModal = () => {
    this.setState({isModalVisible: false});
  };

  showModal = () => {
    this.setState({isModalVisible: true});
  };

  onFormSubmit = async ({name}) => {
    try {
      await this.actions.createSchema(name)
      await this.actions.fetchSchemas();
      this.closeModal();
    } catch (e) {
      throw new SubmissionError({name: e.message})
    }
    console.log("On form submit", name)
  };

  renderModal = () => {
    return (this.state.isModalVisible && <EuiOverlayMask>
        <EuiModal
          onClose={this.closeModal}
        >
          <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                Add a new class
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiForm>
                <Field name="name" label="Name" component={Input}/>
              </EuiForm>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeModal}>Cancel
              </EuiButtonEmpty>
              <EuiButton isLoading={this.props.submitting} type="submit" fill>Add</EuiButton>
            </EuiModalFooter>
          </Form>
        </EuiModal>
      </EuiOverlayMask>
    );
  };

  render() {
    const {entities} = this.model;

    return (
      <NavBar>
        {entities.map((entityName, index) => (
          <NavBarItem key={index} to={`/browser/${entityName}`}>{entityName}</NavBarItem>)
        )}
        <EuiButton fill={true} onClick={this.actions.fetchSchemas}>Refresh</EuiButton>
        <EuiButton onClick={this.showModal} fill={true}>Add class</EuiButton>
        {this.renderModal()}
      </NavBar>
    )
  }
}

export interface BrowserNavBarProps extends InjectedFormProps {
}

export interface BrowserNavBarState {
}
    