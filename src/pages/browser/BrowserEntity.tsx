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
import {Connected}           from "../../decorators/Connected";
import {WithRouter}          from "../../decorators/WithRouter";
import {getSchemas}          from "../../selectors/app";
import {StoreState}          from "../../store/state";
import {InjectedFormProps}   from "redux-form";
import {BrowserEntityHeader} from "./BrowserEntityHeader";

@WithRouter
@Connected
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

  state = {
    isRemoveModalVisible: false,
    isAddColumnModalVisible: false,
  };


  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        entity: state.entities[props.match.params.entity],
        schemas: getSchemas(state)
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
    const {fields} = this.model.schemas[this.props.match.params.entity];
    return Object.keys(fields).map((name) => {
      return {
        field: name,
        name: name,
        sortable: false,
        truncateText: false,
      }
    })
  }


  render() {
    const {entity = {browse: {fetching: true}}} = this.model || {};
    //todo replace EuiInMemoryTable
    return (<div>
      <BrowserEntityHeader/>
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

export interface BrowserEntityProps extends InjectedFormProps, Partial<RouteComponentProps<{ entity: string, appId: string }>> {
}

export interface BrowserEntityState {
  isRemoveModalVisible: boolean
  isAddColumnModalVisible: boolean
}
    