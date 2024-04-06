import { ADD_BRANCH_REQUEST, ADD_BRANCH_SUCCESS, ADD_BRANCH_FAIL, AddBranchState, SET_BRANCH_REQUEST } from "./types";


const INIT_STATE: AddBranchState = {
  loading: false,
  error: {},
  isSuccess: false,
  isError: false,
  getAddBranch: {}
};


const AddBranchReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    // action
    case SET_BRANCH_REQUEST:
      return {
        ...state,
        loading: false,
        isError: false,
        isSuccess: false,
      };

    case ADD_BRANCH_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
        isSuccess: false,
      };
    case ADD_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isError: false,
        getAddBranch: action.payload,
      };
    case ADD_BRANCH_FAIL:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };


    default:
      return state;
  }
};

export default AddBranchReducer;
