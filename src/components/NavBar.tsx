import * as React            from 'react';
import {RouteComponentProps} from 'react-router';
import {EuiButton}           from '@elastic/eui';
import {EuiFlexItem}         from '@elastic/eui';


export class NavBar extends React.Component<NavBarProps, NavBarState> {


  render() {

    return (<div className={'duiNavBar'}>
        {this.props.children}
      </div>

    )
  }
}

export interface NavBarProps extends Partial<RouteComponentProps<any>> {
}

export interface NavBarState {
}
    