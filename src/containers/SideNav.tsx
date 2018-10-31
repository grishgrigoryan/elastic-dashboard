import * as React                from 'react';
import {match}                   from 'react-router';
import {RouteComponentProps}     from 'react-router';
import {Link}                    from 'react-router-dom';
import {
    EuiIcon,
    EuiSideNavItem,
    EuiFlyoutHeader,
    EuiFlyoutBody,
    EuiText,
    EuiFlyout,
    IconType,
    EuiPanel,
    EuiKeyPadMenuItem,
    EuiFlexGroup,
    EuiLink,
}                                from '@elastic/eui';
import {EuiTitle}                from '@elastic/eui';
import {EuiFieldSearch}          from '@elastic/eui';
import {EuiSpacer}               from '@elastic/eui';
import {EuiSideNav}              from '@elastic/eui';
import {EuiFlexItem}             from '@elastic/eui';
import {EuiKeyPadMenuItemButton} from '@elastic/eui';
import {EuiCard}                 from '@elastic/eui';
import {ApplicationSelector}     from "../components/ApplicationSelector";
import {ucfirst}                 from "../helpers/string";
import {navigation}              from '../routes/index';
import {WithRouter}              from "../decorators/WithRouter";
import {slugify}                 from "../helpers/string";
import {Connected}               from '../decorators/Connected';
import {StoreState}              from "../store/state";

declare module '@elastic/eui' {
    export const EuiSideNav: any;
    export const EuiCard: any;
    export const EuiSideNavItem: any;
}


const iconMapping = {
    1: "logoBeats",
    2: "logoCloud",
    3: "logoKibana",
    4: "logoXpack"
};

@WithRouter
@Connected
export class SideNav extends React.Component<SideNavProps, SideNavState> {


    state = {
        selectedTabName: 'browser'
    };


    @Connected
    get model() {
        return Connected.state((state: StoreState) => {
            return { applications: state.session.applications }
        })
    }

    onTabSectionClick = (selectedTabName) => {
        this.setState({ selectedTabName });
    }


    navigate = (path: string) => {
        this.props.history.push(path)
    };


    onApplicationChange = ({ id }) => {
        this.props.history.push(`/${id}/browser/product`)
    };


    createTabSectionItem = (name, icon, selected, key?: string) => {
        return (
            <React.Fragment key={name}>
                <EuiKeyPadMenuItemButton onClick={() => {
                    this.onTabSectionClick(key || name)
                }} label={ucfirst(name)} className={selected && 'selected'}>
                    {icon}
                </EuiKeyPadMenuItemButton>
                <EuiSpacer size={"s"}/>
            </React.Fragment>
        )
    };


    renderTabSection() {
        let applicationId = parseInt(this.props.match.params.applicationId);
        let applicationName = this.model.applications.filter(({ id }) => (id == parseInt(this.props.match.params.applicationId)))[0].name;
        let applicationSection = this.createTabSectionItem(
            applicationName,
            <EuiIcon type={iconMapping[applicationId]} size='xxl'/>,
            'applications' == this.state.selectedTabName,
            'applications'
        )
        const tabSections = navigation.map(({ name, icon }: any) => {
            return this.createTabSectionItem(name, icon, name == this.state.selectedTabName);
        });
        return (
            <React.Fragment>
                {applicationSection}
                <EuiSpacer size={"s"}/>
                {tabSections}
            </React.Fragment>
        )
    }

    renderTabContent() {
        const applicationId = this.props.match.params.applicationId
        const { selectedTabName } = this.state;
        if (selectedTabName == 'applications') {
            return <div>
                applications
            </div>
        }
        const items = navigation.find(({ name }) => (name == selectedTabName)).items;
        console.log("ITEMS", selectedTabName, items)
        return (<div className='eui-textCenter'>
            <EuiTitle size="s">
                <h3>{ucfirst(selectedTabName)}</h3>
            </EuiTitle>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <EuiLink
                            onClick={() => this.navigate(`/${applicationId}/${selectedTabName}/${item.name}`)}
                        >
                            {item.name}
                        </EuiLink>
                    </li>
                ))}
            </ul>
        </div>)
    }


    render() {
        const { match: { params } } = this.props;
        const tabSection = this.renderTabSection();
        const tabContent = this.renderTabContent();
        return (
            <EuiFlexGroup>
                <EuiPanel>
                    <EuiFlexGroup justifyContent='spaceBetween'>
                        <EuiFlexItem grow={false}>
                            {tabSection}
                        </EuiFlexItem>
                        <EuiFlexItem style={{ borderLeft: "1px solid black" }}>
                            <div>
                                {tabContent}
                            </div>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexGroup>

        );
    }
}

export interface SideNavProps extends Partial<RouteComponentProps<{ applicationId: string }>> {
}

export interface SideNavState {
    selectedTabName?: string
}