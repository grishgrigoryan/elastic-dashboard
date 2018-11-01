import {Actions} from "./index";


export function updateMessage(message: string) {
    return { message: message }
}

export function doSomething(message: string) {

    return { message: message, someExtraOption: { items: [{ firstName: "Jogn" }], total: 1 } }
}

export function extra(message: string) {
    console.log("extra upper");
    return  (dispatch: any, getState: any) => {
        console.log("extra inner");
        dispatch(Actions.updateMessage(message));
    }
}