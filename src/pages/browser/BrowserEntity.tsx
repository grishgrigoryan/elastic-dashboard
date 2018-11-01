import * as React            from 'react';
import {WithRouter}          from "../../decorators/WithRouter";
import {RouteComponentProps} from 'react-router-dom';

@WithRouter
export class BrowserEntity extends React.Component<BrowserEntityProps, BrowserEntityState> {

  render() {
    console.log("BrowserEntity", this.props)
    return (<div>
        BrowserEntity - entity {this.props.match.params.entity}<br/>
        appId- entity {this.props.match.params.appId}
      </div>)
  }
}

export interface BrowserEntityProps extends Partial<RouteComponentProps<{entity:string,appId:string}>> {
}

export interface BrowserEntityState {
}
    