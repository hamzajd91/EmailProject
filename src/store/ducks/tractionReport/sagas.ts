import {put, call, takeEvery} from "redux-saga/effects";
import {get} from "../../../services/api_helper";
import {
  getTractionReportFail,
  getTractionReportSuccess,
  getTractionByDateReportFail,
  getTractionByDateReportSuccess
} from "./actions";
import {GET_TRACTION_REPORT_REQUEST,GET_TRACTION_REPORT_DATE_REQUEST} from "./types";

// get country list
function* getTractionReport(payload: any) {
  const date = payload.payload;  
  try {
    const response = yield call(get,"/reports2/week/"+date );
    yield put(getTractionReportSuccess(response));
  } catch (error) {
    yield put(getTractionReportFail(error));
  }
}

// get country list
function* getTractionByDateReport(payload: any) {
  const date = payload.payload;  
  try {
    const response = yield call(get,"/reports2/traction-report");
    yield put(getTractionByDateReportSuccess(response));
  } catch (error) {
    yield put(getTractionByDateReportFail(error));
  }
}



function* tractionReportAPI() {
  yield takeEvery(GET_TRACTION_REPORT_REQUEST, getTractionReport);
  yield takeEvery(GET_TRACTION_REPORT_DATE_REQUEST, getTractionByDateReport);
}

export default tractionReportAPI;
