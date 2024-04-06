/**
 * Location Action Types
 */

export enum LocationActionsTypes {
  SET_LOCATION = "@location/SET_LOCATION",
}

export interface LocationState {
  location: string;
}
