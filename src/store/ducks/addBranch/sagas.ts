
import { put, call, takeEvery } from 'redux-saga/effects';
import { post } from "../../../services/api_helper";
import { addbranchSuccess, addbranchFail } from './actions';
import { ADD_BRANCH_REQUEST } from './types';
import { toast } from 'react-toastify';



// get crawlStatus
export function* postAddBranch(payload: any) {
  try {
    console.log(payload)
    const values = payload.payload;
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const response = yield call(post, `companies`, values, options);
    yield put(addbranchSuccess(response));
    toast.success('add branch success')
  } catch (error) {
    toast.error('somthing want to wrong')
    console.error(error);
    yield put(addbranchFail(error));
  }
}





function* addbranch() {
  yield takeEvery(ADD_BRANCH_REQUEST, postAddBranch);

}

export default addbranch;
