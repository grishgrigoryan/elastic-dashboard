import {RouteComponentProps} from "react-router-dom";
import {withRouter}          from "react-router-dom";

export function WithRouter(component: React.ComponentType<any>): any {
    return withRouter(component);
}
