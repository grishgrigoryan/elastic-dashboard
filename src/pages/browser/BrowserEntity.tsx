import * as React            from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {EuiBasicTable}       from '@elastic/eui';
import {EuiTable}            from '@elastic/eui';
import {EuiTableHeaderCell}  from '@elastic/eui';
import {EuiCodeBlock}        from '@elastic/eui';
import {EuiFlexGroup}        from '@elastic/eui';
import {EuiFieldSearch}      from '@elastic/eui';
import {EuiFlexItem}         from '@elastic/eui';
import {EuiDescriptionList}  from "@elastic/eui";
import {EuiButtonIcon}       from "@elastic/eui";
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
import {EuiSpacer}           from '@elastic/eui';
import {Actions}             from "../../actions";
import {fetchSchemas}        from "../../actions/AppActions";
import {deleteSchema}        from "../../actions/AppActions";
import {fetchTableData}      from "../../actions/EntityActions";
import {Connected}           from "../../decorators/Connected";
import {WithRouter}          from "../../decorators/WithRouter";
import {getSchemas}          from "../../selectors/app";
import {StoreState}          from "../../store/state";
import {InjectedFormProps}   from "redux-form";
import {BrowserEntityHeader} from "./BrowserEntityHeader";
import {RIGHT_ALIGNMENT}     from '@elastic/eui/lib/services';
import {LEFT_ALIGNMENT}      from '@elastic/eui/lib/services';
import {EntityItemModal}     from "./EntityItemModal";


@WithRouter
@Connected
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

  state = {};

  static defaultProps = {
    pageIndex: 0,
    pageSize: 5,
    tableIds: [],
    totalItemCount: 0
  }

  @Connected
  get model() {
    return Connected.state((state: StoreState, props) => {
      return {
        entity: state.entities[props.match.params.entity],
        pageIndex: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.pageIndex,
        totalItemCount: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.totalItemCount,
        pageSize: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.pageSize,
        tableIds: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.tableIds,
        schemas: getSchemas(state),
        sort: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.sort || {
          field: "createdAt",
          direction: "asc"
        },
        expandedRowMop: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.expandedRowMop || {},
        showModal: state.entities[props.match.params.entity] && state.entities[props.match.params.entity].browse.itemModalForm && state.entities[props.match.params.entity].browse.itemModalForm.mode,
      }
    })
  }

  @Connected
  get actions() {
    const updateSortField = Actions.updateSortField;
    const updateExpandedRowMop = Actions.updateExpandedRowMop;
    const updateItemModalForm = Actions.updateItemModalForm;
    const updateModal = Actions.updateModal;
    return Connected.actions({
      deleteSchema,
      fetchSchemas,
      updateSortField,
      fetchTableData,
      updateModal,
      updateExpandedRowMop,
      updateItemModalForm
    })
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.match.params.entity != nextProp.match.params.entity ||
      this.model.schemas != nextProp.schemas
    ) {
      this.actions.fetchTableData(nextProp.match.params.entity, this.model.pageIndex, this.model.pageSize, this.model.sort.field, this.model.sort.direction);
    }
  }

  async componentDidMount() {
    await this.actions.fetchTableData(this.props.match.params.entity, this.model.pageIndex, this.model.pageSize, this.model.sort.field, this.model.sort.direction);
  }

  get items() {
    const {byId = {}} = this.model.entity || {};
    return this.model.tableIds.map((id) => {
      return byId[id]
    })
  }

  get columns() {
    const {fields} = this.model.schemas[this.props.match.params.entity];
    let itemColumns: any = Object.keys(fields).map((name) => {
      return {
        field: name,
        name: name,
        sortable: true,
        truncateText: false,
      }
    });
    let tableActions = this.tableActions;
    itemColumns.push({
      name: 'Actions',
      actions: tableActions
    });
    itemColumns.push({
      align: RIGHT_ALIGNMENT,
      width: '40px',
      isExpander: true,
      render: (item) => {
        return <EuiButtonIcon
          onClick={() => this.toggleDetails(item)}
          aria-label={this.model.expandedRowMop[item.objectId] ? 'Collapse' : 'Expand'}
          iconType={this.model.expandedRowMop[item.objectId] ? 'arrowUp' : 'arrowDown'}
        />
      }
    });
    return itemColumns
  }

  onTableChange = async ({page, sort}) => {
    const {index, size} = page;
    const {field, direction} = sort;
    this.actions.updateExpandedRowMop(this.props.match.params.entity, {});
    await this.actions.fetchTableData(this.props.match.params.entity, index, size, field, direction);
  };

  toggleDetails = (item) => {
    const {expandedRowMop} = this.model;

    if (expandedRowMop[item.objectId]) {
      delete expandedRowMop[item.objectId];
    } else {
      expandedRowMop[item.objectId] = true
    }
    this.actions.updateExpandedRowMop(this.props.match.params.entity, expandedRowMop)
  };

  cloneItem = () => {
    console.log("Clone Item")
  };

  deleteItem = (item) => {
    this.actions.updateItemModalForm(this.props.match.params.entity, {objectId: item.objectId, mode: 'DELETE'})
  };

  editItem = (item) => {
    this.actions.updateItemModalForm(this.props.match.params.entity, {objectId: item.objectId, mode: 'EDIT'})
  };

  createItem = (item) => {
    this.actions.updateItemModalForm(this.props.match.params.entity, {objectId: item.objectId, mode: 'ADD'})
  };

  addColumn = (item) => {
    this.actions.updateModal(this.props.match.params.entity, "COLUMN_ADD")
  };

  removeColumn = (item) => {
    this.actions.updateModal(this.props.match.params.entity, "COLUMN_DELETE")
  };

  removeClass = (item) => {
    this.actions.updateModal(this.props.match.params.entity, "CLASS_DELETE")
  };

  get pagination() {
    const {pageIndex, pageSize, totalItemCount} = this.props;
    return {
      pageIndex: pageIndex,
      pageSize,
      totalItemCount,
      hidePerPageOptions: true
    };
  }

  get tableActions() {
    return [{
      name: 'Clone',
      description: 'Clone this row',
      icon: 'copy',
      onClick: this.cloneItem
    }, {
      name: 'Delete',
      description: 'Delete this row',
      icon: 'trash',
      color: 'danger',
      type: 'icon',
      isPrimary: true,
      onClick: this.deleteItem,
    }, {
      name: 'Edit',
      description: 'Edit this row',
      icon: 'pencil',
      type: 'icon',
      isPrimary: true,
      onClick: this.editItem,
    }];
  }

  get sorting() {
    const sort = this.model.sort;
    return {sort}
  }

  get itemIdToExpandedRowMap() {
    const {byId = {}} = this.model.entity || {};
    return Object.keys(this.model.expandedRowMop).reduce((accumulator, objectId) => {
      const component = (
        <EuiCodeBlock language="js" fontSize="l" paddingSize="s" color="dark">
          {JSON.stringify(byId[objectId], null, "\t")}
        </EuiCodeBlock>
      );
      accumulator[objectId] = component;
      return accumulator
    }, {})
  }

  render() {
    const {entity = {browse: {fetching: true}}} = this.model || {};
    return (<div>
      <BrowserEntityHeader/>
      <EuiSpacer size="l"/>
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiFieldSearch fullWidth placeholder="Search..."/>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={this.addColumn}>Add column</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={this.createItem}>Add row</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={this.removeColumn}>Remove Column</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={this.removeClass}>Remove Class</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m"/>
      <EuiBasicTable
        loading={entity.browse.fetching}
        error={entity.browse.message}
        itemIdToExpandedRowMap={this.itemIdToExpandedRowMap}
        isExpandable={true}
        items={this.items}
        sorting={this.sorting}
        itemId={'objectId'}
        columns={this.columns}
        onChange={this.onTableChange}
        pagination={this.pagination}
      />
      {this.model.showModal && <EntityItemModal/>}
    </div>)
  }
}

export interface BrowserEntityProps extends InjectedFormProps, Partial<RouteComponentProps<{ entity: string, appId: string }>> {
  pageIndex: any,
  totalItemCount: any
  pageSize: any
}

export interface BrowserEntityState {

}
    