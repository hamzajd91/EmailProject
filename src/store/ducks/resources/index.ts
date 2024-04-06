import {Reducer} from "redux";
import {ResourcesState, ResourcesActionsTypes} from "./types";

const INITIAL_STATE: ResourcesState = {
  blog: {
    data: [],
    loading: true,
  },
  press: {
    data: [],
    loading: true,
  },
  industry: {
    data: [],
    loading: true,
  },
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ResourcesActionsTypes.GET_RESOURCES_DATA:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    case ResourcesActionsTypes.SET_RESOURCES_DATA:
      return {
        ...state,
        [action.payload.data.resources]: {
          data: action.payload.data.data,
          loading: false,
        },
      };

    default:
      return state;
  }
};
export default reducer;
