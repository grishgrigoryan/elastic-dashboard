import * as React            from 'react';
import {Route}               from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import AuthLayout            from '../layouts/AuthLayout';

export class AuthRoute extends React.PureComponent<any, any> {

    renderRoute = (renderProps: RouteComponentProps<any>) => {
        console.log("Auth route props", this.props)
        console.log("Auth route renderProps", renderProps)
        const { component } = this.props;
        const Component = component;

        let element = <Component {...renderProps} />;
        return (
            <AuthLayout {...renderProps}>
                {element}
            </AuthLayout>
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