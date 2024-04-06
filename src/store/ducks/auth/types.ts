/**
 * User Action Types
 */

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";
export const LINKEDIN_REQUEST = "LINKEDIN_REQUEST";


export interface AuthState {
  loading: boolean;
  getUser: any;
  getLoginUser: any;
  error: any;
}