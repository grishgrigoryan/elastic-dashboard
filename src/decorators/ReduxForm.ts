import {reduxForm}         from "redux-form";
import {InjectedFormProps} from "redux-form";
import {ConfigProps}       from "redux-form";


export function ReduxForm<P extends InjectedFormProps<any>>(config?: ConfigProps<FormData, P> | object): any {
  let options = (config || {}) as ConfigProps<FormData, P>;

  return (target) => {
    const name = options.form || target.name;
    const Class = reduxForm({
      form: name,
      ...options
    })(target);
    Class['class'] = name;
    return Class
  };
}
