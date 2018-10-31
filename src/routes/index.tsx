import * as React from 'react';
import Products   from "../pages/Products";
import {Session}  from "../pages/Session";
import {EuiIcon} from '@elastic/eui';


const PagePlaceholder = ({ match }: any) => {
    return <div>PagePlaceholder. Match {JSON.stringify(match)}</div>
}
export const navigation: any = [
    {
        name: 'browser',
        icon:<EuiIcon type="spacesApp" size='xxl'/>,
        items: [
            {
                name: 'product',
                component: Products,
            },
            {
                name: 'role',
                component: PagePlaceholder,
            },
            {
                name: 'session',
                component: Session,
            },
            {
                name: 'user',
                component: PagePlaceholder,
            }
        ],
    },
    {
        name: 'jobs',
        icon:<EuiIcon type="createMultiMetricJob" size='xxl'/>,
        items: [
            {
                name: 'all',
                component: PagePlaceholder,
            },
            {
                name: 'scheduled',
                component: PagePlaceholder,
            },
            {
                name: 'status',
                component: PagePlaceholder,
            },
        ]
    },
    {
        name: 'logs',
        icon:<EuiIcon type="monitoringApp" size='xxl'/>,
        items: [
            {
                name: 'info',
                component: PagePlaceholder,
            },
            {
                name: 'error',
                component: PagePlaceholder,
            }
        ]
    },
    {
        name: 'push',
        icon:<EuiIcon type="createMultiMetricJob" size='xxl'/>,

        items: [
            {
                name: 'new',
                component: PagePlaceholder,
            },
            {
                name: 'audiences',
                component: PagePlaceholder,
            }
        ]
    },
    {
        name: 'webhooks',
        icon:<EuiIcon type="infraApp" size='xxl'/>,

        component: (PagePlaceholder),
    },
    {
        name: 'config',
        icon:<EuiIcon type="managementApp" size='xxl'/>,

        component: PagePlaceholder,
    }
];
