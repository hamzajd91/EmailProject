import {Reducer} from "redux";
import {LoginState, LoginActionsTypes} from "./types";

const INITIAL_STATE: LoginState = {
  message: "",
  error: false,
  loading: false,
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case LoginActionsTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LoginActionsTypes.LOGIN_FAILED:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
export default reducer;
