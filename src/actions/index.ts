import {Action}        from 'redux';
import {doSomething}   from './dataActions';
import {updateMessage} from './dataActions';
import {extra}         from './dataActions';


export const Actions = createActions({
    updateMessage,
    extra,
    doSomething
});
console.log("ACtions", Actions)
export type Actions = ActionUnion<typeof Actions>;

export interface PayloadAction<T, P> extends Action<T> {
    type: T;
    payload: P;
}

function createActions<T extends { [key: string]: (...args: U) => V }, U extends any[], V>(actions: T): {
    [K in keyof T]: { type: K, is(value: any): value is PayloadAction<K, ReturnType<T[K]>> } & ((...args: ArgType<T[K]>) => PayloadAction<K, ReturnType<T[K]>>)
} {
    return Object.keys(actions).reduce((result, type) => {
        console.log(type);
        result[type] = Object.assign((...args: U) => {
            let actionResult = actions[type](...args);
            if (typeof actionResult === 'function') {
                return actionResult;
            } else {
                return {
                    type: type,
                    payload: actionResult
                }
            }

        }, {
            type: type,
            is(action: Action) {
                return action.type === this.type;
            }
        });
        return result;
    }, {} as any);
}

export type ArgType<T> = T extends (...args: infer A) => any ? A : never;
export type ActionUnion<A extends {
    [key: string]: (...args: any[]) => any
}> = ReturnType<A[keyof A]>;


