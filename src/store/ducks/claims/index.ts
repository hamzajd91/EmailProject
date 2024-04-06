import { Reducer } from 'redux';
import { GET_CLAIM_FAIL, GET_CLAIM_REQUEST, GET_CLAIM_SUCCESS, ClaimState } from './types';


const INIT_STATE: ClaimState = {
  loading: false,
  getClaim: {},
  error: {},
};


const tractionReport = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    // get Company list
    case GET_CLAIM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CLAIM_SUCCESS:
      return {
        ...state,
        getClaim: action.payload,
        loading: false,
      };
    case GET_CLAIM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tractionReport;
