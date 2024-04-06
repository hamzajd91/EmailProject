import {action} from "typesafe-actions";
import {LocationActionsTypes} from "./types";

export const setUserLocation = (data: any) => action(LocationActionsTypes.SET_LOCATION, data);
