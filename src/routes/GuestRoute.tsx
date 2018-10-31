import * as React            from 'react';
import {Route}               from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import GuestLayout           from "../layouts/GuestLayout";

export class GuestRoute extends React.PureComponent<any, any> {

    renderRoute = (renderProps: RouteComponentProps<any>) => {
        const { component } = this.props;
        const Component = component;
        let element = <Component {...renderProps} />;
        return (
            <GuestLayout {...renderProps}>
                {element}
            </GuestLayout>
        );
    };

    render() {
        const {
            component,
            redirectPath,
            ...rest
        } = this.props;
        return <Route {...rest} render={this.renderRoute}/>;
    }
}