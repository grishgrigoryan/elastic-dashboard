import * as React   from 'react';
import {Route}      from 'react-router-dom';
import {Switch}     from 'react-router-dom';
import {Redirect}   from 'react-router-dom';
import {Products}   from './pages/Products';
import {SignIn}     from './pages/SignIn';
import {Settings}   from './pages/Settings';
import {AuthRoute}  from './routes/AuthRoute';
import {navigation} from "./routes";
import {slugify}    from "./helpers/string";

export class App extends React.Component<any, any> {


    render() {
        //
        // <AuthRoute path="/products" component={Products}/>
        // <AuthRoute path="/settings" component={Settings}/>

        return (
            <Switch>
                {
                    navigation.map(({ name, items, component }: any, key: any) => {
                        if (component) {
                            return <AuthRoute key={key} path={`/${slugify(name)}`} component={component}/>;
                        }
                        return items && items.map(({ name: subName, items, component: subComponent }: any, key: any) => (
                            <AuthRoute key={key} path={`/${slugify(name)}/${slugify(subName)}`}
                                       component={subComponent}/>
                        ))
                    })
                }
                <Route path="/login" component={SignIn}/>

            </Switch>
        );
    }
}