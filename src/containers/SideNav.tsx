import * as React            from 'react';
import {match}               from 'react-router';
import {RouteComponentProps} from 'react-router';
import {Link}                from 'react-router-dom';
import {EuiIcon}             from '@elastic/eui';
import {EuiTitle}            from '@elastic/eui';
import {EuiFieldSearch}      from '@elastic/eui';
import {EuiSpacer}           from '@elastic/eui';
import {EuiSideNav}          from '@elastic/eui';
import {navigation}          from '../routes/index';
import {WithRouter}          from "../decorators/WithRouter";
import {slugify}             from "../helpers/string";

declare module '@elastic/eui' {
    export const EuiSideNav: any;
}

@WithRouter
export class SideNav extends React.Component<SideNavProps, SideNavState> {

    selectItem = (name: string, path: string) => {
        this.props.history.push(path);
    };

    createItem = (name: string, path: string, data = {}) => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        return {
            ...data,
            key: path,
            path,
            name,
            isSelected: this.props.match.path === path,
            onClick: () => this.selectItem(name, path),
        };
    };


    render() {
        const sideItem = navigation.map(({ name, component, ...rest }: any) => {
            if (rest.items) {
                rest.items = rest.items.map(({ name: subName, component, ...rest }: any) => {
                    return this.createItem(subName, `/${slugify(name)}/${slugify(subName)}`, rest);
                });
            }
            return this.createItem(name, `/${slugify(name)}`, rest);
        });
        return (
            <React.Fragment>
                <EuiTitle size="l">
                    <h1>Dashboard</h1>
                </EuiTitle>
                <EuiSpacer size={"l"}/>
                <EuiSideNav
                    items={sideItem}
                    style={{ width: 192 }}
                />
            </React.Fragment>
        );
    }
}

export interface SideNavProps extends Partial<RouteComponentProps> {
}

export interface SideNavState {
    selectedItemName: string
}