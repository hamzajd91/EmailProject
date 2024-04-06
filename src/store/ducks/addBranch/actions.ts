import { ADD_BRANCH_REQUEST, ADD_BRANCH_SUCCESS, ADD_BRANCH_FAIL, SET_BRANCH_REQUEST } from './types';


export const setbranch = () => ({
  type: SET_BRANCH_REQUEST
});

export const addbranch = (data: any) => ({
  type: ADD_BRANCH_REQUEST,
  payload: data,
});

export const addbranchSuccess = (events: any) => ({
  type: ADD_BRANCH_SUCCESS,
  payload: events
});

export const addbranchFail = (error: any) => ({
  type: ADD_BRANCH_FAIL,
  payload: error,
});



