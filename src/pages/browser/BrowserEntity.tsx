import * as React            from 'react';
import {WithRouter}          from "../../decorators/WithRouter";
import {RouteComponentProps} from 'react-router-dom';

@WithRouter
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

  render() {
    console.log("BrowserEntity", this.props)
    return (<div>BrowserEntity - entity {this.props.match.params.entity}</div>)
  }
}

export interface BrowserEntityProps extends Partial<RouteComponentProps<{entity:string}>> {
}

export interface BrowserEntityState {
}
    