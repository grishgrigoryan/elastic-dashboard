import * as React from 'react';
import {NavLink}  from 'react-router-dom';

export class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {

  render() {
    return <NavLink to={this.props.to} className="duiNavBarItem"
                    activeClassName={'duiNavBarItem--active'}>
      {this.props.children}
    </NavLink>
  }
}

export interface NavBarItemProps {
  to: string
}

export interface NavBarItemState {
}
    