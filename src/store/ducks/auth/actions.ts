import { LINKEDIN_REQUEST, SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './types';


// post Register
export const signUpUser = (user: any) => ({
         type: SIGNUP_REQUEST,
         payload: user,
       });

export const signUpUserSuccess = (events: any) => ({
         type: SIGNUP_SUCCESS,
         payload: events,
       });

export const signUpUserFail = (error: any) => ({
         type: SIGNUP_FAIL,
         payload: error,
       });


// post Login
export const signInUser = (user: any, history : any) => ({
         type: SIGNIN_REQUEST,
         payload: {user, history},
       });

export const signInUserSuccess = (events: any) => ({
         type: SIGNIN_SUCCESS,
         payload: events,
       });

export const signInUserFail = (error: any) => ({
         type: SIGNIN_FAIL,
         payload: error,
       });

       
export const linkedinUser = (payload :any) => ({
         type: LINKEDIN_REQUEST,
         payload: {payload},
       });

// export const signInUserSuccess = (events: any) => ({
//          type: LINKEDIN_SUCCESS,
//          payload: events,
//        });

// export const signInUserFail = (error: any) => ({
//          type: LINKEDIN_FAIL,
//          payload: error,
//        });


