import * as React   from 'react';
import {Switch}     from 'react-router-dom';
import {Home}       from "./pages/Home";
import {Login}      from "./pages/Login";
import {AuthRoute}  from './routes/AuthRoute';
import {navigation} from "./routes";
import {slugify}    from "./helpers/string";
import {GuestRoute} from "./routes/GuestRoute";

export class App extends React.Component<any, any> {


    render() {
        return (
            <Switch>
                {
                    navigation.map(({ name, items, component }: any, key: any) => {
                        if (component) {
                            return <AuthRoute exact key={key} path={`/:applicationId/${slugify(name)}`} component={component}/>;
                        }
                        return items && items.map(({ name: subName, items, component: subComponent }: any, key: any) => (
                            <AuthRoute exact key={key} path={`/:applicationId/:section/${slugify(subName)}`}
                                       component={subComponent}/>
                        ))
                    })
                }
                <GuestRoute exact path="/login" component={Login}/>;
                <AuthRoute path='/:applicationId/' component={Home}/>;

            </Switch>
        );
    }
}