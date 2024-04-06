import {action} from "typesafe-actions";
import {RegisterActionsTypes} from "./types";

export const authRegister = (paramas: any) => action(RegisterActionsTypes.REGISTER, paramas);
export const authRegisterSuccess = () => action(RegisterActionsTypes.REGISTER_SUCCESS);
export const authRegisterFailed = (paramas: any) => action(RegisterActionsTypes.REGISTER_FAILED, paramas);
