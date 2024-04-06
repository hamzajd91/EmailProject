/**
 * REGISTER Action Types
 */

export enum RegisterActionsTypes {
  REGISTER = "@auth/REGISTER",
  REGISTER_SUCCESS = "@auth/REGISTER_SUCCESS",
  REGISTER_FAILED = "@auth/REGISTER_FAILED",
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
export interface RegisterState {
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  message: String;
  success: boolean;
}
