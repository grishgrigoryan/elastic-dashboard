import * as React            from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {EuiInMemoryTable}    from "@elastic/eui";
import {EuiButton}           from "@elastic/eui";
import {EuiTitle}            from "@elastic/eui";
import {EuiForm}             from '@elastic/eui';
import {EuiModal}            from '@elastic/eui';
import {EuiOverlayMask}      from '@elastic/eui';
import {EuiModalHeader}      from '@elastic/eui';
import {EuiModalHeaderTitle} from '@elastic/eui';
import {EuiModalBody}        from '@elastic/eui';
import {EuiModalFooter}      from '@elastic/eui';
import {EuiButtonEmpty}      from '@elastic/eui';
import {fetchSchemas}        from "../../actions/AppActions";
import {deleteSchema}        from "../../actions/AppActions";
import {fetchEntity}         from "../../actions/EntityActions";
import {ConfirmationModal}   from "../../components/ConfirmationModal";
import {Connected}           from "../../decorators/Connected";
import {WithRouter}          from "../../decorators/WithRouter";
import {getSchemas}          from "../../selectors/app";
import {StoreState}          from "../../store/state";

@WithRouter
@Connected
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

  state = {
    isModalVisible: false,
  };


  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        entity: state.entities[props.match.params.entity],
        schemas: getSchemas(state)[props.match.params.entity]
      }
    })
  }

  @Connected
  get actions() {
    return Connected.actions({fetchEntity, deleteSchema, fetchSchemas})
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.match.params.entity != nextProp.match.params.entity ||
      this.model.schemas != nextProp.schemas
    ) {
      this.actions.fetchEntity(nextProp.match.params.entity)
    }
  }

  async componentDidMount() {
    await this.actions.fetchEntity(this.props.match.params.entity)
  }


  get items() {
    const {byId = {}, ids = []} = this.model.entity || {};
    return ids.map((id) => {
      return byId[id]
    })
  }


  get columns() {
    const {fields} = this.model.schemas;
    return Object.keys(fields).map((name) => {
      return {
        field: name,
        name: name,
        sortable: false,
        truncateText: false,
      }
    })
  }

  closeModal = () => {
    this.setState({isModalVisible: false});
  };

  showModal = () => {
    this.setState({isModalVisible: true});
  };

  removeSchema = async () => {
    await this.actions.deleteSchema(this.props.match.params.entity);
    this.props.history.push(`/browser/`)
    await this.actions.fetchSchemas();
  };

  renderModal = () => {
    return (this.state.isModalVisible &&
      <ConfirmationModal
        onClose={this.closeModal}
        onConfirm={this.removeSchema}
        ctaText="Remove"
        title={`Delete class "${this.props.match.params.entity}" ?`}
        body="You can't recover deleted data."
      />
    );
  };

  render() {
    const {entity = {browse: {fetching: true}}} = this.model || {};
    //todo replace EuiInMemoryTable
    return (<div>
      <div className='duiEntityHeader'>
        <EuiTitle>
          <h2>{this.props.match.params.entity}</h2>
        </EuiTitle>
        <EuiButton onClick={this.showModal}>Remove Class</EuiButton>
      </div>
      {this.renderModal()}
      BrowserEntity - fetching {entity.browse.fetching ? "YES" : "NO"}<br/>
      <EuiInMemoryTable
        loading={entity.browse.fetching}
        error={entity.browse.message}
        items={this.items}
        columns={this.columns}
        pagination={true}
      />
    </div>)
  }
}

export interface BrowserEntityProps extends Partial<RouteComponentProps<{ entity: string, appId: string }>> {
}

export interface BrowserEntityState {
  isModalVisible: boolean
}
    