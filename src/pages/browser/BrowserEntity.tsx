import * as React            from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {EuiInMemoryTable}    from "@elastic/eui";
import {fetchEntity}         from "../../actions/EntityActions";
import {Connected}           from "../../decorators/Connected";
import {WithRouter}          from "../../decorators/WithRouter";
import {getSchemas}          from "../../selectors/app";
import {StoreState}          from "../../store/state";

@WithRouter
@Connected
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

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
    return Connected.actions({fetchEntity})
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


  render() {
    const {entity = {browse: {fetching: true}}} = this.model || {};
    //todo replace EuiInMemoryTable
    return (<div>
      BrowserEntity - entity {this.props.match.params.entity}<br/>
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
}
    