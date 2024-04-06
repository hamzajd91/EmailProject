import { Reducer } from 'redux';
import { GET_TRACTION_REPORT_FAIL, GET_TRACTION_REPORT_REQUEST, GET_TRACTION_REPORT_SUCCESS, TractionReportState,GET_TRACTION_REPORT_DATE_REQUEST,GET_TRACTION_REPORT_DATE_SUCCESS,GET_TRACTION_REPORT_DATE_FAIL } from './types';


const INIT_STATE: TractionReportState = {
  loading: false,
  getTractionReport: {},
  getTractionReportByDate:{},
  error: {},
};


const tractionReport = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    // get Company list
    case GET_TRACTION_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TRACTION_REPORT_SUCCESS:
      return {
        ...state,
        getTractionReport: action.payload,
        loading: false,
      };
    case GET_TRACTION_REPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_TRACTION_REPORT_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TRACTION_REPORT_DATE_SUCCESS:
      return {
        ...state,
        getTractionReportByDate: action.payload,
        loading: false,
      };
    case GET_TRACTION_REPORT_DATE_FAIL:
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
