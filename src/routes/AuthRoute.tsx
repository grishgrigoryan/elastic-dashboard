import * as React            from 'react';
import {Route}               from 'react-router-dom';
import {Redirect}            from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import {Connected}           from "../decorators/Connected";
import AuthLayout            from '../layouts/AuthLayout';
import {StoreState}          from "../store/state";


@Connected
export class AuthRoute extends React.PureComponent<any, any> {

    @Connected
    get model() {
        return Connected.state((state: StoreState) => {
            return {
                auth: state.session.auth,
                applications: state.session.applications,
            }
        })
    }

    renderRoute = (renderProps: RouteComponentProps<any>) => {
        const { component } = this.props;
        const { match: { params: { applicationId } } } = renderProps
        console.log(applicationId);
        let found = this.model.applications.filter((application) => application.id == applicationId);
        if (!found.length) {
            return <Redirect
                to={{
                    pathname: `/${ this.model.applications[0].id}/browser/product`,
                    state: { from: renderProps.location }
                }}
            />
        }
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