import * as React                from 'react';
import {connect}                 from "react-redux";
import {Dispatch}                from "redux";
import {AnyAction}               from "redux";
import {bindActionCreators}      from 'redux';
import {ActionCreatorsMapObject} from "redux";


export interface State {
}

export function Connected<T extends React.ComponentClass<any>>(target: T): T
export function Connected(target: React.Component<any>, key: string, desc: PropertyDescriptor): PropertyDescriptor
export function Connected(target: React.Component<any> | any, key?: string, desc?: PropertyDescriptor) {
    if (typeof target == 'function' && !key) {
        let mapStateToProps = null, mapDispatchToProps = null;
        Object.getOwnPropertyNames(target).forEach(key => {
            const desc = Object.getOwnPropertyDescriptor(target, key);
            const type = desc.get && desc.get[Connected.propery];
            if (type == Connected.state) {
                mapStateToProps = desc.get;
            }
            if (type == Connected.actions) {
                mapDispatchToProps = (dispatch: Dispatch, props: any) => {
                    return { [key]: (desc.get as any)(dispatch, props) }
                };
            }
        });
        return connect(mapStateToProps, mapDispatchToProps)(target);
    } else
    // decorated propertyactions
    if (typeof target == 'object' && key) {
      const desc = Object.getOwnPropertyDescriptor(target.constructor.prototype, key);
      const type = desc.get && desc.get()[Connected.propery];
      Object.defineProperty(target.constructor,key,{
        get: desc.get(),
      });
      return {
        get(){
          return type == Connected.state ? this.props : this.props[key];
        }
       } as PropertyDescriptor
    }

}

export namespace Connected {
    export const propery = Symbol('ConnectedProperty');

    export function state<T extends (state: State, props: any) => any>(call: T): ReturnType<T> {
        return Object.assign(call, { [propery]: state }) as any;
    }

    export function actions<T extends (dispatch: Dispatch<AnyAction>, props: any) => ActionCreatorsMapObject>(call: T): ReturnType<T>
    export function actions<A>(call: A): A;
    export function actions(call: any) {
        if (typeof call != 'function') {
            return Object.assign((dispatch: Dispatch) => bindActionCreators(call, dispatch), { [propery]: actions }) as any;
        } else {
            return Object.assign(call, { [propery]: actions }) as any;
        }

    }
}