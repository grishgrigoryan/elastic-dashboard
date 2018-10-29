import * as React      from 'react';
import {EuiBasicTable, EuiButton, EuiHealth} from '@elastic/eui';
import {EuiDescriptionList} from '@elastic/eui';
import {EuiButtonIcon} from '@elastic/eui';
import {formatDate} from '@elastic/eui';


declare module '@elastic/eui' {
    export const EuiBasicTable: any;
    export const formatDate: any;
}
const userTests:any= [
    {
        "id": "5bd709d3fec9138f1a6d4c5a",
        "firstName": "Elsie",
        "lastName": "Fischer",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d38c27909b29f10f73",
        "firstName": "Helga",
        "lastName": "Wilkerson",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d38ebcee1dcd78739a",
        "firstName": "Jones",
        "lastName": "Velasquez",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d32a185780d1b66c2a",
        "firstName": "Shawn",
        "lastName": "Byers",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d3979e86a200d3c4dd",
        "firstName": "Castaneda",
        "lastName": "Raymond",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d3b358b10129f4db35",
        "firstName": "Benson",
        "lastName": "Franklin",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    }
];
const countries = [{
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱'
}]

export const createDataStore = () => {
    const users =userTests

    return {
        users,
        countries,
        findUsers: (pageIndex, pageSize, sortField, sortDirection) => {
            let items;

            if (sortField) {
                items = users.slice(0);
            } else {
                items = users;
            }

            let pageOfItems;

            if (!pageIndex && !pageSize) {
                pageOfItems = items;
            } else {
                const startIndex = pageIndex * pageSize;
                pageOfItems = items.slice(startIndex, Math.min(startIndex + pageSize, items.length));
            }

            return {
                pageOfItems,
                totalItemCount: items.length
            };
        },

        deleteUsers: (...ids) => {
            ids.forEach(id => {
                const index = users.findIndex(user => user.id === id);
                if (index >= 0) {
                    users.splice(index, 1);
                }
            });
        },

        cloneUser: (id:any) => {
            const index = users.findIndex(user => user.id === id);
            if (index >= 0) {
                const user = users[index];
                users.splice(index, 0, { ...user, id: users.length });
            }
        },

        getCountry: (code) => countries.find(country => country.code === code)
    };
};
const store = createDataStore();
export class Session extends React.Component<SessionProps, any> {
    state = {
        pageIndex: 0,
        pageSize: 5,
        sortField: 'firstName',
        sortDirection: 'asc',
        selectedItems: [],
        itemIdToExpandedRowMap: {},
    };


    onTableChange = ({ page = {}, sort = {} }:any) => {
        const {
            index: pageIndex,
            size: pageSize,
        } = page;

        const {
            field: sortField,
            direction: sortDirection,
        } = sort;

        this.setState({
            pageIndex,
            pageSize,
            sortField,
            sortDirection,
        });
    };

    onSelectionChange = (selectedItems) => {
        this.setState({ selectedItems });
    };

    onClickDelete = () => {
        const { selectedItems } = this.state;
        store.deleteUsers(...selectedItems.map(user => user.id));

        this.setState({
            selectedItems: []
        });
    };

    renderDeleteButton() {
        const { selectedItems } = this.state;

        if (selectedItems.length === 0) {
            return;
        }

        return (
            <EuiButton
                color="danger"
                iconType="trash"
                onClick={this.onClickDelete}
            >
                Delete {selectedItems.length} Users
            </EuiButton>
        );
    }

    toggleDetails = (item) => {
        const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap };
        if (itemIdToExpandedRowMap[item.id]) {
            delete itemIdToExpandedRowMap[item.id];
        } else {
            const { nationality, online } = item;
            const country = store.getCountry(nationality);
            const color = online ? 'success' : 'danger';
            const label = online ? 'Online' : 'Offline';
            const listItems = [
                {
                    title: 'Nationality',
                    description: `${country.flag} ${country.name}`,
                }, {
                    title: 'Online',
                    description: <EuiHealth color={color}>{label}</EuiHealth>,
                }
            ];
            itemIdToExpandedRowMap[item.id] = (
                <EuiDescriptionList listItems={listItems}/>
            );
        }
        this.setState({ itemIdToExpandedRowMap });
    };

    render() {
        const {
            pageIndex,
            pageSize,
            sortField,
            sortDirection,
            itemIdToExpandedRowMap,
        } = this.state;

        const {
            pageOfItems,
            totalItemCount,
        } = store.findUsers(pageIndex, pageSize, sortField, sortDirection);

        const deleteButton = this.renderDeleteButton();

        const columns = [{
            field: 'firstName',
            name: 'First Name',
            sortable: true,
            truncateText: true,
            hideForMobile: true,
        }, {
            field: 'lastName',
            name: 'Last Name',
            truncateText: true,
            hideForMobile: true,
        }, {
            field: 'fullName',
            name: 'Full Name',
            sortable: true,
            isMobileHeader: true,
            render: (name, item) => (
                <span>{item.firstName} {item.lastName}</span>
            )
        }, {
            field: 'dateOfBirth',
            name: 'Date of Birth',
            dataType: 'date',
            render: (date) => formatDate(date, 'dobLong'),
            sortable: true
        }, {
            name: 'Actions',
            actions: [{
                name: 'Clone',
                description: 'Clone this person',
                type: 'icon',
                icon: 'copy',
                onClick: () => ''
            }]
        }, {
            width: '40px',
            isExpander: true,
            render: (item) => (
                <EuiButtonIcon
                    onClick={() => this.toggleDetails(item)}
                    aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
                    iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
                />
            )
        }];

        const pagination = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalItemCount: totalItemCount,
            pageSizeOptions: [3, 5, 8]
        };

        const sorting = {
            sort: {
                field: sortField,
                direction: sortDirection,
            },
        };

        const selection = {
            selectable: (user) => user.online,
            selectableMessage: (selectable) => !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: this.onSelectionChange
        };

        return (
            <React.Fragment>
                {deleteButton}
                <EuiBasicTable
                    items={pageOfItems}
                    itemId="id"
                    itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
                    isExpandable={true}
                    hasActions={true}
                    columns={columns}
                    pagination={pagination}
                    sorting={sorting}
                    isSelectable={true}
                    selection={selection}
                    onChange={this.onTableChange}
                />
            </React.Fragment>
        );
    }

}

export interface SessionProps {
}

    