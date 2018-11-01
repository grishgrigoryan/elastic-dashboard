import * as React  from 'react';
import classnames  from 'classnames';
import {IconType} from '@elastic/eui';
import {EuiIcon}   from '@elastic/eui';
import {NavLink}   from 'react-router-dom';

export class AppBarItem extends React.Component<AppBarItemProps, AppBarItemState> {
  render() {
    return <NavLink to={this.props.to} className={classnames('duiAppBarItem')}
                    activeClassName={'duiAppBarItem--active'}>
      <EuiIcon type={this.props.iconType} size={"xl"}/>
    </NavLink>
  }
}

export interface AppBarItemProps {
  to: string
  iconType: IconType
}

export interface AppBarItemState {
}
    