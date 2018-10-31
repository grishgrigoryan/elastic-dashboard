import {UserService} from "../services/UserService";
import {Actions}     from "./index";

interface Identifiable {
    id: string,

    [k: string]: any
}

export function updateUsers(items: Array<Identifiable>) {
    let byId = items.reduce((accumulator, { id, ...other }) => {
        return accumulator[id] = other;
    }, {});
    let ids = Object.keys(byId);
    return { byId, ids }
}

export function doSomething(message: string) {

    return { message: message, someExtraOption: { items: [{ firstName: "Jogn" }], total: 1 } }
}


export function extra(message: string) {
    console.log("extra upper");
    return async (dispatch: any, getState: any) => {
        console.log("extra inner");
        dispatch(Actions.updateMessage(message));
    }
}

export function fetchUsers(pageIndex: number, pageSize: number, sortField: string, sortDirection: 'asc' | 'desc') {
    return async (dispatch: any, getState: any) => {
        const {
            pageOfItems: items,
            totalItemCount,
        } = UserService.findUsers(pageIndex, pageSize, sortField, sortDirection);
        dispatch(Actions.updateUsers(items));
    }
}