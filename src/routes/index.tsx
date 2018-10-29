import * as React from 'react';
import Products   from "../pages/Products";
import {Session}  from "../pages/Session";


const PagePlaceholder = ({ match }: any) => {
    return <div>PagePlaceholder. Match {JSON.stringify(match)}</div>
}
export const navigation: any = [
    {
        name: 'Browser',
        items: [
            {
                name: 'Product',
                component: Products,
            },
            {
                name: 'Role',
                component: PagePlaceholder,
            },
            {
                name: 'Session',
                component: Session,
            },
            {
                name: 'User',
                component: PagePlaceholder,
            }
        ],
    },
    {
        name: 'Jobs',
        items: [
            {
                name: 'All',
                component: PagePlaceholder,
            },
            {
                name: 'Scheduled',
                component: PagePlaceholder,
            },
            {
                name: 'Status',
                component: PagePlaceholder,
            },
        ]
    },
    {
        name: 'Logs',
        items: [
            {
                name: 'Info',
                component: PagePlaceholder,
            },
            {
                name: 'Error',
                component: PagePlaceholder,
            }
        ]
    },
    {
        name: 'Push',
        items: [
            {
                name: 'new',
                component: PagePlaceholder,
            },
            {
                name: 'Audiences',
                component: PagePlaceholder,
            }
        ]
    },
    {
        name: 'Webhooks',
        component: (PagePlaceholder),
    },
    {
        name: 'Config',
        component: PagePlaceholder,
    },
    {
        name: 'Api Console',
        component: PagePlaceholder,
    },

];
// export const routes = navigation.map(({ name, items, ...rest },key) => {
//         let topItem: any = {
//             name,
//             type: slugify(name),
//             key,
//             ...rest
//         };
//         if (items) {
//             topItem.items = items.map(({ name: itemName, ...rest },key) => ({
//                 name: itemName,
//                 key,
//                 path: `${slugify(name)}/${slugify(itemName)}`,
//                 ...rest,
//             }));
//         }
//     }
// );
