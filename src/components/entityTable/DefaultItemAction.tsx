import * as React from 'react';
import {EuiButtonIcon, EuiButtonEmpty, EuiToolTip} from '@elastic/eui';


const defaults = {
  color: 'primary'
};
export class DefaultItemAction extends React.Component<DefaultItemActionProps, DefaultItemActionState> {

  render() {
    const { action, enabled, item, className } = this.props;
    if (!action.onClick) {
      throw new Error(`Cannot render item action [${action.name}]. Missing required 'onClick' callback. If you want
      to provide a custom action control, make sure to define the 'render' callback`);
    }
    const onClick = () => action.onClick(item);
    const color = this.resolveActionColor();
    const icon = this.resolveActionIcon();

    let button;
    if (action.type === 'icon') {
      if (!icon) {
        throw new Error(`Cannot render item action [${action.name}]. It is configured to render as an icon but no
        icon is provided. Make sure to set the 'icon' property of the action`);
      }
      button = (
        <EuiButtonIcon
          className={className}
          aria-label={action.name}
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
        />
      );
    } else {
      button = (
        <EuiButtonEmpty
          className={className}
          size="s"
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
          flush="right"
        >
          {action.name}
        </EuiButtonEmpty>
      );
    }

    return (enabled && action.description) ? (
      <EuiToolTip content={action.description} delay="long">
        {button}
      </EuiToolTip>
    ) : button;
  }

  resolveActionIcon() {
    const {action, item} = this.props;
    if (action.icon) {
      return typeof action.icon  =='string'? action.icon : action.icon(item);
    }
  }

  resolveActionColor() {
    const {action, item} = this.props;
    if (action.color) {
      return typeof action.color  =='string' ?  action.color : action.color(item);
    }
    return defaults.color;
  }
}

export interface DefaultItemActionProps {
  action?:any,
  index?:any,
  itemId?:any
enabled?:any,
  item?:any,
  className?:any
}

export interface DefaultItemActionState {
}
    