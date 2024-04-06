import {Reducer} from "redux";
import {LocationState, LocationActionsTypes} from "./types";

const INITIAL_STATE: LocationState = {
  location: "",
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocationActionsTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
