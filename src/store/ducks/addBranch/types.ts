/**
 * User Action Types
 */

export const SET_BRANCH_REQUEST = "SET_BRANCH_REQUEST";
export const ADD_BRANCH_REQUEST = "ADD_BRANCH_REQUEST";
export const ADD_BRANCH_SUCCESS = "ADD_BRANCH_SUCCESST";
export const ADD_BRANCH_FAIL = "ADD_BRANCH_FAIL";



export interface AddBranchState {
  loading: boolean;
  error: any;
  isSuccess: any;
  isError: any,
  getAddBranch: any;
}
