import { action } from 'typesafe-actions';
import { GET_TRACTION_REPORT_FAIL, GET_TRACTION_REPORT_REQUEST, GET_TRACTION_REPORT_SUCCESS,GET_TRACTION_REPORT_DATE_REQUEST,GET_TRACTION_REPORT_DATE_SUCCESS,GET_TRACTION_REPORT_DATE_FAIL } from './types';


// get TractionReport
export const getTractionReport = (date: any) => ({
  type: GET_TRACTION_REPORT_REQUEST,
  payload: date,
});

export const getTractionReportSuccess = (events: any) => ({
  type: GET_TRACTION_REPORT_SUCCESS,
  payload: events,
});

export const getTractionReportFail = (error: any) => ({
  type: GET_TRACTION_REPORT_FAIL,
  payload: error,
});

//get TractionReport by date
export const getTractionByDateReport = () => ({
  type: GET_TRACTION_REPORT_DATE_REQUEST
});

export const getTractionByDateReportSuccess = (events: any) => ({
  type: GET_TRACTION_REPORT_DATE_SUCCESS,
  payload: events,
});

export const getTractionByDateReportFail = (error: any) => ({
  type: GET_TRACTION_REPORT_DATE_FAIL,
  payload: error,
});





