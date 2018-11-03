import {Application}  from "../store/state";
import {Applications} from "../store/state";
import {Actions}      from "./index";


export function changeSelectedApplicationId(selectedApplicationId: string) {
  return {selectedApplicationId}
}

export function updateApplications(applications: Applications) {
  return {applications}
}

export function updateSessionUser(user: any) {
  return {user}
}

export const authorize = (username: string, password: string) => {
  return async (dispatch: any, getState: any) => {
    Parse.initialize(
      'KQEi9xr2OZZ5RFmfQTCUaJB0JoZUxbE5H6mgwGng',
      '3qbWEr513fbmoQIafSm2fU6PbC1eNwXxM0rws2Gp'
    );
    Parse.serverURL = 'https://parseapi.back4app.com/';
    let user = await Parse.User.logIn(username, password);
    dispatch(Actions.updateSessionUser(user));
    return true;
  }
};

export const fetchApplications = () => {
  return async (dispatch: any, getState: any) => {
    let applications: Array<any> = await new Parse.Query("App").find();
    //todo make some Parse service will handle all this weird stuff
    await Parse.User.logOut();

    let fistAppId: string = applications[0].id;
    let normApp: Applications = applications.reduce((normalized, {id, attributes}) => {
      normalized[id] = {...{id}, ...attributes};
      return normalized;
    }, {});
    dispatch(Actions.updateApplications(normApp));
    dispatch(changeSelectedApplication(normApp[fistAppId]))

    return true;
  }
};

export const changeSelectedApplication = (application: Application) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(Actions.showLoader());
      Parse.initialize(application.applicationId, application.masterKey);
      Parse.serverURL = application.serverURL;
      Parse.masterKey = application.masterKey;
      dispatch(Actions.changeSelectedApplicationId(application.id));
      dispatch(Actions.hideLoader());
    } catch (e) {
      dispatch(Actions.hideLoader());
    }
  }
};

// _ApplicationId: "APPLICATION_ID"
// _ClientVersion: "js2.1.0"
// _InstallationId: "de54ff6e-ebd7-013e-89c4-6bbd24d72fd4"
// _JavaScriptKey: "MASTER_KEY"
// _method: "GET"


/*
applicationId: "APPLICATION_ID"
createdAt: "2018-10-31T14:41:19.306Z"
iconType: "logoKibana"
masterKey: "MASTER_KEY"
name: "Test"
objectId: "6Wg8zFaayu"
*/