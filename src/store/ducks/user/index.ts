import {Reducer} from "redux";
import {UserState, UserActionsTypes} from "./types";
import StorageService from "../../../services/StorageService";

const INITIAL_STATE: UserState = {
  user: StorageService.getUser(),
  isAuthenticated: Object.keys(StorageService.getUser()).length !== 0 ? true : false,
  loading: false,
  token: StorageService.getToken(),
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.GET_CURRENT_USER:
      return {
        ...state,
        loading: false,
      };
    case UserActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
export default reducer;
