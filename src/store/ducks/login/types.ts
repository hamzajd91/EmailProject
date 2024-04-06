/**
 * Login Action Types
 */

export enum LoginActionsTypes {
  LOGIN = "@auth/LOGIN",
  LOGIN_SUCCESS = "@auth/LOGIN_SUCCESS",
  LOGIN_FAILED = "@auth/LOGIN_FAILED",
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
export interface LoginState {
  message: String;
  error: false;
  loading: false;
}
