import {AuthState, LINKEDIN_REQUEST, SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "./types";


const INIT_STATE: AuthState = {
  loading: false,
  getUser: {},
  getLoginUser: {},
  error: {},
};


const authReducer = (state = INIT_STATE, action : any) => {
  switch (action.type) {
    // post signup user
    case LINKEDIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        getUser: action.payload,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // post signin user
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        getLoginUser: action.payload,
        loading: false,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
