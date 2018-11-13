import * as React            from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {dropWhile, slice}    from 'lodash';

import {
  EuiBasicTable,
  EuiTable,
  EuiTableHeaderCell,
  EuiTableHeader,
  EuiTableHeaderCellCheckbox,
  EuiCheckbox,
  EuiTableBody,
  EuiIcon,
  EuiTableRowCell,
  EuiTableRow,
  EuiToolTip,
}                                from "@elastic/eui";
import {EuiDescriptionList}      from "@elastic/eui";
import {EuiButtonIcon}           from "@elastic/eui";
import {EuiButton}               from "@elastic/eui";
import {EuiTitle}                from "@elastic/eui";
import {EuiForm}                 from '@elastic/eui';
import {EuiModal}                from '@elastic/eui';
import {EuiOverlayMask}          from '@elastic/eui';
import {EuiModalHeader}          from '@elastic/eui';
import {EuiModalHeaderTitle}     from '@elastic/eui';
import {EuiModalBody}            from '@elastic/eui';
import {EuiModalFooter}          from '@elastic/eui';
import {EuiTableRowCellCheckbox} from '@elastic/eui';
import {SortDirection}           from '@elastic/eui';
import {EuiButtonEmpty}          from '@elastic/eui';
import {EuiSpacer}               from '@elastic/eui';
import {RIGHT_ALIGNMENT}         from '@elastic/eui/lib/services';
import {EuiKeyboardAccessible} from '@elastic/eui/lib/services';
import {LEFT_ALIGNMENT}        from '@elastic/eui/lib/services';
import {formatAuto}            from '@elastic/eui/lib/services';
import {formatText}            from '@elastic/eui/lib/services';
import {formatNumber}          from '@elastic/eui/lib/services';
import {formatBoolean}         from '@elastic/eui/lib/services';
import {formatDate}            from '@elastic/eui/lib/services';
import {CollapsedItemActions}  from "./CollapsedItemActions";
import {DefaultItemAction}     from "./DefaultItemAction";
import {ExpandedItemActions}   from "./ExpandedItemActions";
import {LoadingTableBody}      from "./LoadingTableBody";


const dataTypesProfiles = {
  auto: {
    align: LEFT_ALIGNMENT,
    render: value => formatAuto(value)
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: value => formatText(value)
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: value => formatNumber(value),
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: value => formatBoolean(value),
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: value => formatDate(value),
  }
};

export class Table extends React.Component<TableProps, TableState> {


  static buildCriteria(props) {
    const criteria: any = {};
    if (props.pagination) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: props.pagination.pageSize
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  static getItemId(item, itemId) {
    if (itemId) {
      if (typeof itemId == 'function') {
        return itemId(item);
      }
      return item[itemId];
    }
  }

  static getRowProps(item, rowProps) {
    if (rowProps) {
      if (typeof rowProps == 'function') {
        return rowProps(item);
      }
      return rowProps;
    }
    return {};
  }

  static getCellProps(item, column, cellProps) {
    if (cellProps) {
      if (typeof cellProps == 'function') {
      }
      return cellProps;
    }

    return {};
  }

  state = {
    selection:[]
  };


  getRendererForDataType(dataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}].`);
    }
    return profile.render;
  }

  getAlignForDataType(dataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}].`);
    }
    return profile.align;
  }


  resolveColumnSortDirection = (column) => {
    const {sorting} = this.props;
    if (!sorting || !sorting.sort || !column.sortable) {
      return;
    }
    if (sorting.sort.field === column.field) {
      return sorting.sort.direction;
    }
  }


  resolveColumnOnSort = (column) => {
    const {sorting} = this.props;
    if (!sorting || !column.sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${column.field}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  }

  changeSelection(selection) {
    if (!this.props.selection) {
      return;
    }
    this.setState({selection});
    if (this.props.selection.onSelectionChange) {
      this.props.selection.onSelectionChange(selection);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onColumnSortChange(column) {
    this.clearSelection();
    const currentCriteria = Table.buildCriteria(this.props);
    let direction = 'asc';
    if (currentCriteria && currentCriteria.sort && currentCriteria.sort.field === column.field) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page ? undefined : {
        index: 0,
        size: currentCriteria.page.size
      },
      sort: {
        field: column.field,
        direction
      }
    };
    this.props.onChange(criteria);
  }

  renderTableHead() {

    const {items, columns, selection} = this.props;

    const headers = [];

    if (selection) {
      const selectableItems = items.filter(item => (
        !selection.selectable || selection.selectable(item)
      ));

      const checked = this.state.selection &&
        selectableItems.length > 0 &&
        this.state.selection.length === selectableItems.length;

      const disabled = selectableItems.length === 0;

      const onChange = (event) => {
        if (event.target.checked) {
          this.changeSelection(selectableItems);
        } else {
          this.changeSelection([]);
        }
      };

      headers.push(
        <EuiTableHeaderCellCheckbox key="_selection_column_h" width="24px">
          <EuiCheckbox
            id="_selection_column-checkbox"
            type="inList"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            data-test-subj="checkboxSelectAll"
            aria-label="Select all rows"
          />
        </EuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column, index) => {
      const {
        actions,
        width,
        name,
        field,
        align,
        dataType,
        sortable,
        isMobileHeader,
        hideForMobile,
      } = column;

      const columnAlign = align || this.getAlignForDataType(dataType);

      // actions column
      if (actions) {
        headers.push(
          <EuiTableHeaderCell
            key={`_actions_h_${index}`}
            align="right"
            width={width}
          >
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }
      // computed column
      if (!field) {
        headers.push(
          <EuiTableHeaderCell
            key={`_computed_column_h_${index}`}
            align={columnAlign}
            width={width}
          >
            {name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting: any = {};
      if (this.props.sorting && sortable) {
        const sortDirection = this.resolveColumnSortDirection(column);
        sorting.isSorted = !!sortDirection;
        sorting.isSortAscending = sortDirection ? SortDirection.isAsc(sortDirection) : undefined;
        sorting.onSort = this.resolveColumnOnSort(column);
      }
      headers.push(
        <EuiTableHeaderCell
          key={`_data_h_${field}_${index}`}
          align={columnAlign}
          width={width}
          isMobileHeader={isMobileHeader}
          hideForMobile={hideForMobile}
          data-test-subj={`tableHeaderCell_${field}_${index}`}
          {...sorting}
        >
          {name}
        </EuiTableHeaderCell>
      );
    });

    return <EuiTableHeader>{headers}</EuiTableHeader>;
  }

  renderErrorBody(error) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell align="center" colSpan={colSpan} isMobileFullWidth={true}>
            <EuiIcon type="minusInCircle" color="danger"/> {error}
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    );
  }


  renderEmptyBody() {
    const {columns, selection, noItemsMessage} = this.props;
    const colSpan = columns.length + (selection ? 1 : 0);
    return (
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell align="center" colSpan={colSpan} isMobileFullWidth={true}>
            {noItemsMessage}
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    );
  }


  renderItemSelectionCell(itemId, item, selected) {
    const {selection} = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection.selectable && !selection.selectable(item);
    const title = selection.selectableMessage && selection.selectableMessage(!disabled, item);
    const onChange = (event) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        const {itemId: itemIdCallback} = this.props;
        this.changeSelection(this.state.selection.reduce((selection, selectedItem) => {
          if (Table.getItemId(selectedItem, itemIdCallback) !== itemId) {
            selection.push(selectedItem);
          }
          return selection;
        }, []));
      }
    };
    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiCheckbox
          id={`${key}-checkbox`}
          type="inList"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          title={title}
          aria-label="Select this row"
          data-test-subj={`checkboxSelectRow-${itemId}`}
        />
      </EuiTableRowCellCheckbox>
    );
  }

  renderItemActionsCell(itemId, item, column, columnIndex) {
    const actionEnabled = (action) =>
      this.state.selection.length === 0 && (!action.enabled || action.enabled(item));

    let actualActions = column.actions;
    if (column.actions.length > 2) {

      // if any of the actions `isPrimary`, add them inline as well, but only the first 2
      actualActions = slice(dropWhile(column.actions, function (o) {
        return !o.isPrimary;
      }), 0, 2);

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions.push(
        {
          name: 'All actions',
          render: (item) => {
            return (
              <CollapsedItemActions

                actions={column.actions}
                itemId={itemId}
                item={item}
                actionEnabled={actionEnabled}
              />
            );
          }
        }
      );
    }

    const tools = (
      <ExpandedItemActions
        actions={actualActions}
        itemId={itemId}
        item={item}
        actionEnabled={actionEnabled}
      />
    );
    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <EuiTableRowCell
        showOnHover={true}
        key={key}
        align="right"
        textOnly={false}
        hasActions={true}
      >
        {tools}
      </EuiTableRowCell>
    );
  }

  renderItemFieldDataCell(itemId, item, column, columnIndex) {
    const {field, render, dataType} = column;

    const key = `_data_column_${field}_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const value = item[field];
    const content = contentRenderer(value, item);

    return this.renderItemCell(item, column, key, content);
  }

  renderItemComputedCell(itemId, item, column, columnIndex) {
    const {render, dataType} = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, key, content);
  }

  renderItemCell(item, column, key, content) {
    const {
      align,
      render,
      dataType,
      isExpander,
      textOnly,
      name,
      field, // eslint-disable-line no-unused-vars
      description, // eslint-disable-line no-unused-vars
      sortable, // eslint-disable-line no-unused-vars
      footer, // eslint-disable-line no-unused-vars
      ...rest
    } = column;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const {cellProps: cellPropsCallback} = this.props;
    const cellProps = Table.getCellProps(item, column, cellPropsCallback);

    return (
      <EuiTableRowCell
        key={key}
        align={columnAlign}
        header={name}
        isExpander={isExpander}
        textOnly={textOnly || !render}
        {...cellProps}
        {...rest}
      >
        {content}
      </EuiTableRowCell>
    );
  }

  renderItemRow(item, rowIndex) {
    const {columns, selection, isSelectable, hasActions, itemIdToExpandedRowMap = {}, isExpandable} = this.props;

    const cells = [];

    const {itemId: itemIdCallback} = this.props;
    const itemId = Table.getItemId(item, itemIdCallback) || rowIndex;
    const selected = !selection ? false : this.state.selection && !!this.state.selection.find(selectedItem => (
      Table.getItemId(selectedItem, itemIdCallback) === itemId
    ));

    let calculatedHasSelection;
    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
      calculatedHasSelection = true;
    }

    let calculatedHasActions;
    columns.forEach((column, columnIndex) => {
      if (column.actions) {
        cells.push(this.renderItemActionsCell(itemId, item, column, columnIndex));
        calculatedHasActions = true;
      } else if (column.field) {
        cells.push(this.renderItemFieldDataCell(itemId, item, column, columnIndex));
      } else {
        cells.push(this.renderItemComputedCell(itemId, item, column, columnIndex));
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce((num, column) => {
      return column.isMobileHeader ? num + 1 : num + 0;
    }, 0);

    expandedRowColSpan = expandedRowColSpan - mobileOnlyCols;

    // We'll use the ID to associate the expanded row with the original.
    const hasExpandedRow = itemIdToExpandedRowMap.hasOwnProperty(itemId);
    const expandedRowId = hasExpandedRow ? `row_${itemId}_expansion` : undefined;
    const expandedRow = hasExpandedRow ? (
      <EuiTableRow id={expandedRowId} isExpandedRow={true} isSelectable={isSelectable}>
        <EuiTableRowCell colSpan={expandedRowColSpan}>
          {itemIdToExpandedRowMap[itemId]}
        </EuiTableRowCell>
      </EuiTableRow>
    ) : undefined;

    const {rowProps: rowPropsCallback} = this.props;
    const rowProps = Table.getRowProps(item, rowPropsCallback);
    const row = (
      <EuiTableRow
        aria-owns={expandedRowId}
        isSelectable={isSelectable == null ? calculatedHasSelection : isSelectable}
        isSelected={selected}
        hasActions={hasActions == null ? calculatedHasActions : hasActions}
        isExpandable={isExpandable}
        {...rowProps}
      >
        {cells}
      </EuiTableRow>
    );

    return (
      <React.Fragment key={`row_${itemId}`}>
        {rowProps.onClick
          ? <EuiKeyboardAccessible>{row}</EuiKeyboardAccessible>
          : row
        }
        {expandedRow}
      </React.Fragment>
    );
  }

  renderTableBody() {
    if (this.props.error) {
      return this.renderErrorBody(this.props.error);
    }
    const {items} = this.props;
    if (items.length === 0) {
      return this.renderEmptyBody();
    }

    const rows = items.map((item, index) => {
      // if there's pagination the item's index must be adjusted to the where it is in the whole dataset
      const tableItemIndex = this.props.pagination ?
        this.props.pagination.pageIndex * this.props.pagination.pageSize + index
        : index;
      return this.renderItemRow(item, tableItemIndex);
    });
    if (this.props.loading) {
      return <LoadingTableBody>{rows}</LoadingTableBody>;
    }
    return <EuiTableBody>{rows}</EuiTableBody>;
  }

  render() {
    return (<EuiTable>
      {this.renderTableHead()}
      {this.renderTableBody()}
    </EuiTable>)
  }
}

export interface TableProps {
  items?: any;
  columns?: any;
  pagination?: any;
  sorting?: any;
  onChange?: any
  selection?: any
  loading?: any
  isSelectable?: any
  isExpandable?: any
  error?: any
  hasActions?: any
  itemIdToExpandedRowMap?: any
  noItemsMessage?: string,
  itemId?: string | ((item) => string)
  rowProps?: any | ((item) => string)
  cellProps?: any | ((item) => string)

}

export interface TableState {
  selection: any
}
    