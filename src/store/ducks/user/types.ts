/**
 * User Action Types
 */

export enum UserActionsTypes {
  GET_CURRENT_USER = "@user/GET_CURRENT_USER",
  SET_CURRENT_USER = "@user/SET_CURRENT_USER",
  SET_ERRORS = "@user/SET_ERRORS",
}

export interface User {
  id?: number;
  jwt?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  verified?: true;
  lock?: false;
}
export interface UserState {
  isAuthenticated: boolean;
  user: User;
  loading: false;
  token?: string;
}
