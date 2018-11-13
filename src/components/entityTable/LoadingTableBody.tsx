import * as React from 'react';
import {EuiTableBody} from '@elastic/eui';

export class LoadingTableBody extends React.Component<LoadingTableBodyProps, LoadingTableBodyState> {
  tbody: any;
  cleanups: Array<any>;

  constructor(props) {
    super(props);
    this.cleanups = [];
  }

  componentDidMount() {
    const listener = (event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    [
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
      'click',
      'dblclick',
      'keydown',
      'keyup',
      'keypress'
    ].forEach((event) => {
      this.tbody.addEventListener(event, listener, true);
      this.cleanups.push(() => this.tbody.removeEventListener(event, listener));
    });
  }

  componentWillUnmount() {
    this.cleanups.forEach(cleanup => cleanup());
  }

  render() {
    return (
      <EuiTableBody
        bodyRef={(tbody) => {
          this.tbody = tbody;
        }}
      >
        {this.props.children}
      </EuiTableBody>
    );
  }
}

export interface LoadingTableBodyProps {
}

export interface LoadingTableBodyState {
}
    