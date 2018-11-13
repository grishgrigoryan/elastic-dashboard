import * as React from 'react';


declare module '@elastic/eui' {
  export const EuiCard: any;
  export const EuiInMemoryTable: any;
  export const EuiBasicTable: any;
  export const SortDirection: any;
  export const EuiTableFooterCell: any;
  export const formatDate: any;

  export interface EuiTableRowProps {
    isSelected?: boolean;
    isExpandedRow?: boolean
    isSelectable?: boolean
  }

  export interface EuiTableBodyProps {
    [k: string]: any
  }

  export interface EuiTableRowCellProps {
    truncateText?: boolean;
    showOnHover?: any
    hasActions?: boolean
    align?: HorizontalAlignment;
    textOnly?: boolean;
    colSpan?: any
    isMobileFullWidth?: boolean
  }

  export interface EuiPopoverProps {
    popoverRef?: any
    id: string;
    closePopover: NoArgCallback<void>;
    button: React.ReactNode;
    withTitle?: boolean;
    isOpen?: boolean;
    ownFocus?: boolean;
    hasArrow?: boolean;
    anchorPosition?: PopoverAnchorPosition;
    panelClassName?: string;
    panelPaddingSize?: PanelPaddingSize;
  }

  export interface EuiToolTipProps {
    children: React.ReactElement<any>;
    delay: any
    className?: string;
    content: React.ReactNode;
    title?: React.ReactNode;
    id?: string;
    position?: ToolTipPositions;
  }
}