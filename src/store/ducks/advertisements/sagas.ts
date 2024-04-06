import { toast } from 'react-toastify';
import { put, call, takeEvery } from 'redux-saga/effects';
import { get, post, postApi } from '../../../services/api_helper';
import { addAdvertisementsFail, addAdvertisementsSuccess, advertisementsFail, advertisementsSuccess, changeAnalyticsFail, changeAnalyticsSuccess, changeSubscriptionFail, changeSubscriptionSuccess, getCompaniesFail, getCompaniesSuccess, getSubscription, subscriptionFail, subscriptionSuccess} from './actions';
import { ADD_ADVERTISEMENT_REQUEST, ADVERTISEMENT_REQUEST, CHANGE_ANALYTICS_REQUEST, CHANGE_SUBSCRIPTION_REQUEST, GET_COMPANIES_REQUEST, SUBSCRIPTION_REQUEST } from './types';
const apiResponces: any = require("../../../lang/i18n/en/common.json");


// post changeSubscription
function* changeAnalytics(payload: any) {
  const data = payload.payload;
  try {
    const response = yield call(post, "/subscriptions/change/analytics", data);
    yield put(changeAnalyticsSuccess(response));
    toast.success(response.message);
    yield put(getSubscription());
  } catch (error) {
    errorHandling(error);
    yield put(changeAnalyticsFail(error));
  }
}

// post changeSubscription
function* changeSubscription(payload : any) {
  const data = payload.payload;  
  try {
    const response = yield call(post, "/subscriptions/change", data);    
    yield put(changeSubscriptionSuccess(response));
    toast.success(response.message);
    yield put(getSubscription());
  } catch (error) {
    errorHandling(error);
    yield put(changeSubscriptionFail(error));
  }
}

// getSubscription
function* getSubscription1() {
  try {
    const response = yield call(get, "/subscriptions/get");
    yield put(subscriptionSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(subscriptionFail(error));
  }
}

// getSubscription
function* getCompanies(payload : any) {

  const text = payload.payload;
  try {
    const response = yield call(get, "/companies/get/company?query="+text);
    yield put(getCompaniesSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(getCompaniesFail(error));
  }
}

// getAdvertisements
function* getAdvertisements(payload: any) {
  const page = payload.payload.page;

  try {
    const response = yield call(get, "/companies/get/advertisements?page=" + page + "&limit=10");
    yield put(advertisementsSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(advertisementsFail(error));
  }
}

// addAdvertisements
function* addAdvertisements(payload: any) {
 // const data = payload.payload;
  const data = payload.payload.data;
  const history = payload.payload.history;

  console.log("-=----data------", data);

  let formData = new FormData()
  formData.append("company",data.company);
  formData.append("amount",data.amount);
  formData.append("dateFrom",data.dateFrom);
  formData.append("dateTo", data.dateTo);
  formData.append("bannerImage", data.bannerImage);
  
  try {
    const response = yield call(postApi, "/companies/add/advertisements",formData, {headers : {"Content-Type": "multipart/form-data"}});
    yield put(addAdvertisementsSuccess(response));
    history.push("/admin/firmAdvertisement")
  } catch (error) {
    errorHandling(error);
    yield put(addAdvertisementsFail(error));
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


function* advertisementsAPI() {
  yield takeEvery(ADD_ADVERTISEMENT_REQUEST, addAdvertisements);
  yield takeEvery(GET_COMPANIES_REQUEST, getCompanies);
  yield takeEvery(CHANGE_ANALYTICS_REQUEST, changeAnalytics);
  yield takeEvery(CHANGE_SUBSCRIPTION_REQUEST, changeSubscription);
  yield takeEvery(SUBSCRIPTION_REQUEST, getSubscription1);
  yield takeEvery(ADVERTISEMENT_REQUEST, getAdvertisements);
}

export default advertisementsAPI;
