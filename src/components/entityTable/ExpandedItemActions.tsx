import * as React          from 'react';
import {CustomItemAction}  from "./CustomItemAction";
import {DefaultItemAction} from "./DefaultItemAction";
import classNames          from 'classnames';

export class ExpandedItemActions extends React.Component<ExpandedItemActionsProps, ExpandedItemActionsState> {

  render() {
    const {
      actions,
      itemId,
      item,
      actionEnabled,
      className,
    } = this.props
    const moreThanThree = actions.length > 2;

    return actions.reduce((tools, action, index) => {

      const available = action.available ? action.available(item) : true;
      if (!available) {
        return tools;
      }

      const enabled = actionEnabled(action);

      const key = `item_action_${itemId}_${index}`;

      const classes = classNames(className, {
        'expandedItemActions__completelyHide': moreThanThree && index < 2,
      });

      if (action.render) {
        tools.push(
          <CustomItemAction
            key={key}
            className={classes}
            index={index}
            action={action}
            enabled={enabled}
            itemId={itemId}
            item={item}
          />
        );
      } else {
        tools.push(
          <DefaultItemAction
            key={key}
            className={classes}
            index={index}
            action={action}
            enabled={enabled}
            itemId={itemId}
            item={item}
          />
        );
      }
      return tools;
    }, []);
  }
}

export interface ExpandedItemActionsProps {
  actions?: Array<any>,
  itemId?: any,
  item?: any,
  actionEnabled?: any,
  className?: any,
}

export interface ExpandedItemActionsState {
}
    