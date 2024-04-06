import { toast } from "react-toastify";
import {put, call, takeEvery} from "redux-saga/effects";
import { get, post, del, putCall } from "../../../services/api_helper";
import {
  addCompanyFail,
  addCompanySuccess,
  getCompanyFail,
  getCompanySuccess,
  getCountryFail,
  getCountrySuccess,
  getExportCompanyFail,
  getExportCompanySuccess,
  getIndustriesFail,
  getIndustriesSuccess,
  getProficienciesFail,
  getProficienciesSuccess,
  deleteCompanySuccess,
  deleteCompanyFail,
  updateCompanySuccess,
  updateCompanyFail,
  getCompanyDetailSuccess,
  getCompanyDetailFail,
  getDashboardSuccess,
  getDashboardFail
} from "./actions";
import {ADD_COMPANY_REQUEST, DELETE_COMPANY_REQUEST, GET_COMPANY_REQUEST, GET_COUNTRY_REQUEST, GET_INDUSTRIES_REQUEST, GET_PROFICIENCIES_REQUEST,UPDATE_ADMIN_COMPANY_REQUEST,GET_COMPANY_DETAIL_REQUEST, EXPORT_COMPANY_REQUEST, GET_DASHBOARD_REQUEST} from "./types";



// getExportCompany
function* getExportCompany(payload : any) {

  console.log("-------payload----------", payload.payload);

  const data = payload.payload;
  
  try {
    const response = yield call(
      get,
      "/companies/export/data?company_name_end=" +
        data.endPoint +
        "&company_name_start=" +
        data.startPoint +
        "&company_address=" +
        data.address +
        "&proficiency=" +
        data.proficiencies +
        "&subscription_type=" +
        data.subscription_type +
        "&date_signed_up_start=" +
        data.date +
        "&date_signed_up_end=" +
        data.enddate +
        "&date_claimed_start=" +
        data.dateClaimed +
        "&date_claimed_end=" +
        data.enddateClaimed +
        "&date_subscribed_start=" +
        data.dateSubscribed +
        "&date_subscribed_end=" +
        data.enddateSubscribed
    );

    if (response.length === 0){
        toast.error("No data found")
    }
    yield put(getExportCompanySuccess(response));
  } catch (error) {
    yield put(getExportCompanyFail(error));
  }
}
// get Dashboard
function* getDashboard(payload: any) {
  
  const data = payload.payload
  try {
    const response = yield call(get, "/users/dashboard-count");
    yield put(getDashboardSuccess(response));
    // toast.success("Company added successfully")
  } catch (error) {
    yield put(getDashboardFail(error));
  }
}
// add Company
function* addCompany(payload: any) {
  
  const data = payload.payload
  try {
    const response = yield call(post, "/companies", data);
    yield put(addCompanySuccess(response));
    toast.success("Company added successfully")
  } catch (error) {
    yield put(addCompanyFail(error));
  }
}

// get Proficiencies list
function* getProficiencies() {
  try {
    const response = yield call(get, "proficiencies/get/all");
    yield put(getProficienciesSuccess(response));
  } catch (error) {
    yield put(getProficienciesFail(error));
  }
}

// get country list
function* getCompany(payload: any) {
  const page = payload.payload.page;
  const text = payload.payload.text;  
  
  try {
    const response = yield call(get, "/companies/all?page=" + page + "&limit=10&searchText="+text);
    yield put(getCompanySuccess(response));
  } catch (error) {
    yield put(getCompanyFail(error));
  }
}

// get country list
function* getAllCountry() {
  try {
    // const response = yield call(get, "/api/v1/countries");
    const response = yield call(get, "/countries");
    yield put(getCountrySuccess(response));
  } catch (error) {
    yield put(getCountryFail(error));
  }
}

// get industries list
function* getAllIndustries() {
  try {
    const response = yield call(get, "/industries");
    yield put(getIndustriesSuccess(response));
  } catch (error) {
    yield put(getIndustriesFail(error));
  }
}

// delete Company
function* deleteCompany(payload :any) {
  const data = payload.payload
  try {
    console.log('deleteApiPrams',JSON.stringify(payload)+" "+JSON.stringify(data))
    const response = yield call(del,`/companies/${data.id}`);
    yield put(deleteCompanySuccess(response));
    toast.success("Company added successfully")
  } catch (error) {
    yield put(deleteCompanyFail(error));
  }
}

// update Company
function* updateAdminCompany(payload :any) {
  const data = payload.payload
  try {
    console.log('deleteApiPrams'," "+JSON.stringify(data))
    const response = yield call(putCall,"/companies/"+data.id,data.data);
    yield put(updateCompanySuccess(response));
    toast.success("Company added successfully")
  } catch (error) {
    yield put(updateCompanyFail(error));
  }
}

// delete Company
function* getCompanyDetail(payload :any) {
  const data = payload.payload
  try {
    const response = yield call(get,"/companies/"+data.id);
    yield put(getCompanyDetailSuccess(response));
  } catch (error) {
    yield put(getCompanyDetailFail(error));
  }
}


function* addFirmsAPI() {
  yield takeEvery(EXPORT_COMPANY_REQUEST, getExportCompany);
  yield takeEvery(ADD_COMPANY_REQUEST, addCompany);
  yield takeEvery(GET_PROFICIENCIES_REQUEST, getProficiencies);
  yield takeEvery(GET_COMPANY_REQUEST, getCompany);
  yield takeEvery(GET_COUNTRY_REQUEST, getAllCountry);
  yield takeEvery(GET_INDUSTRIES_REQUEST, getAllIndustries);
  yield takeEvery(DELETE_COMPANY_REQUEST, deleteCompany);
  yield takeEvery(UPDATE_ADMIN_COMPANY_REQUEST, updateAdminCompany);
  yield takeEvery(GET_COMPANY_DETAIL_REQUEST, getCompanyDetail);
  yield takeEvery(GET_DASHBOARD_REQUEST, getDashboard);
}

export default addFirmsAPI;
