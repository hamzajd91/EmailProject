import {put, call, takeEvery} from "redux-saga/effects";
import {get} from "../../../services/api_helper";
import {
  getClaimsFail,
  getClaimsSuccess
} from "./actions";
import {GET_CLAIM_REQUEST} from "./types";

// get country list
function* getClaims(payload: any) {
  const date = payload.payload.date; 
  const key=payload.payload.key
  try {
    const response = yield call(get,"/reports2/"+key+"/"+date);
    yield put(getClaimsSuccess(response));
  } catch (error) {
    yield put(getClaimsFail(error));
  }
}

function* claimsAPI() {
  yield takeEvery(GET_CLAIM_REQUEST,getClaims);
}

export default claimsAPI;
