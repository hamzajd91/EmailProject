/**
 * User Action Types
 */

export const GET_TRACTION_REPORT_REQUEST = 'GET_TRACTION_REPORT_REQUEST';
export const GET_TRACTION_REPORT_SUCCESS = 'GET_TRACTION_REPORT_SUCCESS';
export const GET_TRACTION_REPORT_FAIL = 'GET_TRACTION_REPORT_FAIL';

export const GET_TRACTION_REPORT_DATE_REQUEST = 'GET_TRACTION_REPORT_DATE_REQUEST';
export const GET_TRACTION_REPORT_DATE_SUCCESS = 'GET_TRACTION_REPORT_DATE_SUCCESS';
export const GET_TRACTION_REPORT_DATE_FAIL = 'GET_TRACTION_REPORT_DATE_FAIL';

export interface TractionReportState {
  loading: boolean;
  getTractionReport: any;
  getTractionReportByDate: any;
  error: any;
}
