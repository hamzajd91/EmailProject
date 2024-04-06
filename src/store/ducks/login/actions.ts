import {action} from "typesafe-actions";
import {LoginActionsTypes} from "./types";

export const authLogin = (paramas: any) => action(LoginActionsTypes.LOGIN, paramas);
export const authLoginSuccess = (paramas: any) => action(LoginActionsTypes.LOGIN_SUCCESS, paramas);
export const authLoginFailed = (paramas: any) => action(LoginActionsTypes.LOGIN_FAILED, paramas);

export const redirectAfterSuccess = () => {
  const location = JSON.parse(localStorage.getItem("_location") as any);

  if (location) {
    localStorage.removeItem("_location");
    return (window.location.href = location);
  }
  window.location.href = "/";
};
