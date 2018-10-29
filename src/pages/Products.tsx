import * as React           from 'react';
import {EuiButton}         from '@elastic/eui';
import {StoreState}         from '../store/state';
import {Actions}            from "../actions";
import {Connected}          from "../decorators/Connected";



@Connected
export class Products extends React.Component<ProductsProps, any> {

    @Connected
    get model() {
        return Connected.state((state: StoreState) => {
            return { message: state.data.message }
        })
    }

    @Connected
    get actions() {
        const updateMessage = Actions.updateMessage;
        const extra = Actions.extra;
        return Connected.actions({ extra, updateMessage })
    }

    count: number = 0;
    onClick = (e: any) => {
        this.actions.extra(`Message Count is ${this.count}`);
        this.count++;
    };

    render() {
        console.log("On PROD props", this.props);
        return (
            <div>
                {this.model.message}
                <EuiButton
                    type="submit"
                    color="primary"
                    onClick={this.onClick}
                >
                    Update
                </EuiButton>
            </div>
        );
    }
}

export interface ProductsProps{

}

export default Products;
