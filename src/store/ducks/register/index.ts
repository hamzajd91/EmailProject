import {Reducer} from "redux";
import {RegisterState, RegisterActionsTypes} from "./types";

const INITIAL_STATE: RegisterState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  success: false,
  message: "",
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RegisterActionsTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "",
        success: true,
      };
    case RegisterActionsTypes.REGISTER_FAILED:
      return {
        ...state,
        message: action.payload.message,
        success: false,
      };
    default:
      return state;
  }
};
export default reducer;
