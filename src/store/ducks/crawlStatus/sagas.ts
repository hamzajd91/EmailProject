import { toast } from 'react-toastify';
import {put, call, takeEvery } from 'redux-saga/effects';
import {get, putCall} from "../../../services/api_helper";
import { actionStatusFail, actionStatusSuccess, addcrawlStatusFail, addcrawlStatusSuccess, crawlStatusFail, crawlStatusSuccess, getcrawlStatus, getCrawlStatusDetailFail, getCrawlStatusDetailSuccess, updateCompanyFail, updateCompanySuccess } from './actions';
import { ACTION_REQUEST, ADD_CRAWL_STATUS_REQUEST, CRAWL_STATUS_DETAIL_REQUEST, CRAWL_STATUS_REQUEST, UPDATE_COMPANY_REQUEST } from './types';
const apiResponces: any = require("../../../lang/i18n/en/common.json");

// get crawlStatus
function* getcrawlStatusAPI(payload: any) {

  const page = payload.payload.page;
  
  try {
    const response = yield call(get, "/crawlStats?page=" + page + "&limit=10");
    yield put(crawlStatusSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(crawlStatusFail(error));
  }
}

// updateCompany
function* updateCompanyAPI(payload: any) {  
  const id = payload.payload;
  try {
    const response = yield call(putCall, "/crawlStats/update-companies/"+id+"?checked=false");
    yield put(updateCompanySuccess(response));
    toast.success("Companies details are updated");
  } catch (error) {
    errorHandling(error);
    yield put(updateCompanyFail(error));
  }
}

// actionAPI
function* actionStatusAPI(payload: any) {  
  const id = payload.payload.id;
  const linkId = payload.payload.linkId;
  try {
    const response = yield call(get, "/crawlStats/rerunLink?processId="+id+"&linkId="+linkId);
    yield put(actionStatusSuccess(response));
    toast.success("Return link successfully");
  } catch (error) {
    errorHandling(error);
    yield put(actionStatusFail(error));
  }
}

// ADD CrawlStatus
function* addcrawlStatus(payload: any) {

  const data = payload.payload;
  
  try {
    const response = yield call(get, "/crawlStats/startCrawling/" + data);
    toast.success("Crawler added successfully")
    yield put(getcrawlStatus(1))
    yield put(addcrawlStatusSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(addcrawlStatusFail(error));
  }
}
// get Crawl Status Detail
function* getCrawlStatusDetail(payload: any) {
  const id = payload.payload.id;
  const page = payload.payload.page; 
  const website = payload.payload.website;  
  const visited = payload.payload.visited;  
  const address = payload.payload.address;  
  const phone = payload.payload.phone;  
  const email = payload.payload.email;  
  const description = payload.payload.description;  
  const error = payload.payload.error;  
  try {
    const response = yield call(
      get,
      "/crawlStats/" +
        id +
        "?page=" +
        page +
        "&limit=10&filter=%7B%22w_f%22:%22"+website+"%22,%22v_f%22:%22"+visited+"%22,%22e_f%22:%22"+email+"%22,%22a_f%22:%22"+address+"%22,%22d_f%22:%22"+description+"%22,%22p_f%22:%22"+phone+"%22,%22error_f%22:%22"+error+"%22%7D"
    );
    yield put(getCrawlStatusDetailSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(getCrawlStatusDetailFail(error));
  }
}

const errorHandling = (error : any) =>{
  
  let err_message = "";
  switch (error.response.status) {
    case 401:
      toast.error(error.response.data.message);
      break;
    case 403:
      toast.error(error.response.data.error.message);
      break;
    default:
      //server error
      err_message = "Server Error.";
  }
}


function* crawlStatusAPI() {
  yield takeEvery(ACTION_REQUEST, actionStatusAPI);
  yield takeEvery(UPDATE_COMPANY_REQUEST, updateCompanyAPI);
  yield takeEvery(CRAWL_STATUS_DETAIL_REQUEST, getCrawlStatusDetail);
  yield takeEvery(ADD_CRAWL_STATUS_REQUEST, addcrawlStatus);
  yield takeEvery(CRAWL_STATUS_REQUEST, getcrawlStatusAPI);
}

export default crawlStatusAPI;
