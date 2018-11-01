import {Applications} from "../store/state";
import {Actions}      from "./index";


export function changeSelectedApplicationId(selectedApplicationId: string) {
  return {selectedApplicationId}
}

export function updateApplications(applications:Applications) {
  return {applications}
}

export function updateSessionUser(user: any) {
  return {user}
}

export function doSomething(message: string) {

  return {message: message, someExtraOption: {items: [{firstName: "Jogn"}], total: 1}}
}

export const authorize = (username: string, password: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(Actions.showLoader());
      let user = await Parse.User.logIn(username, password);
      dispatch(Actions.hideLoader());
      dispatch(Actions.updateSessionUser(user));
      return true;
    } catch (e) {
      dispatch(Actions.hideLoader());
      alert("Invalid cred")
    }
  }
}

export const changeSelectedApplication = (selectedApplicationId: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(Actions.showLoader());
      //todo re-initialize Parse.
      //todo clean/reset store
      //todo get schemas
      dispatch(Actions.changeSelectedApplicationId(selectedApplicationId));
      dispatch(Actions.hideLoader());
    } catch (e) {
      dispatch(Actions.hideLoader());
    }
  }
}

