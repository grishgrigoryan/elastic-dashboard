import * as React from 'react';
import {NavLink}  from 'react-router-dom';

export class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {

  render() {
    const {to,children, ...other} = this.props;
    return <NavLink {...other} to={to} className="duiNavBarItem"
                    activeClassName={'duiNavBarItem--active'}>
      {children}
    </NavLink>
  }
}

export interface NavBarItemProps {
  to: string
}

export interface NavBarItemState {
}
    