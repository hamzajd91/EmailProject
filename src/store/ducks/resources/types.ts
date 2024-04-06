/**
 * Resources Action Types
 */

export enum ResourcesActionsTypes {
  GET_RESOURCES_DATA = "@resources/GET_RESOURCES_DATA",
  SET_RESOURCES_DATA = "@resources/SET_RESOURCES_DATA",
  SET_ERRORS = "@resources/SET_ERRORS",
}

export interface ResourcesState {
  blog: {
    data: [];
    loading: boolean;
  };
  press: {
    data: [];
    loading: boolean;
  };
  industry: {
    data: [];
    loading: boolean;
  };
}
