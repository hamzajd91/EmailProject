import {action} from "typesafe-actions";
import {ResourcesActionsTypes} from "./types";

export interface SearchResourcesData {
  data: [];
  resources: string;
}

export const setResources = (data: SearchResourcesData) => action(ResourcesActionsTypes.SET_RESOURCES_DATA, {data});