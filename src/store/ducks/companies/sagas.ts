/* eslint-disable import/no-cycle */
import { call, put } from "redux-saga/effects";

import api from "../../../services/api";
import { setErrors, setCompanies, setAutoComplete, setUserHasCompany } from "./actions";
import { ApplicationState } from "../..";
import appApi from "../../../services/appApi";

export const getCompanies = (state: ApplicationState) => state.companies.searchResponse;

export function* search(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };

    const { query, location, distance, filters } = params.payload;

    let { sortFilters } = params.payload;
    sortFilters = sortFilters || "";
    const filter = JSON.stringify(filters);

    const response = yield call(
      api.get,
      `/companies?query=${encodeURIComponent(query).replace(
        /%20/g,
        "+"
      )}&location=${location}&distance=${distance}&filter=${filter}&sort=${sortFilters}`,
      options
    );
    yield put(setCompanies(response.data));

    if (response.data.error) {
      yield put(setErrors({ message: response.data.errorMessage }));
    }
  } catch (error) {
    const errors = error.response.data.error;
    yield put(setErrors(errors));
  }
}
export function* searchOnLoad(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const { query, location, distance, filters, page } = params.payload;
    let { sortFilters } = params.payload;
    sortFilters = sortFilters || "";

    const filter = JSON.stringify(filters);

    const response = yield call(
      api.get,
      `/companies?query=${encodeURIComponent(query).replace(
        /%20/g,
        "+"
      )}&location=${location}&page=${page}&distance=${distance}&filter=${filter}&sort=${sortFilters}`,
      options
    );

    yield put(setCompanies(response.data));
    if (response.data.error) {
      yield put(setErrors({ message: response.data.errorMessage }));
    }
  } catch (error) {
    const errors = error.response.data.error;
    yield put(setErrors(errors));
  }
}
export function* loadMore(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const { query, location, distance, filters } = params.payload;
    let { sortFilters } = params.payload;
    sortFilters = sortFilters || "";
    const filter = JSON.stringify(filters);

    const response = yield call(
      api.get,
      `/companies?query=${encodeURIComponent(query).replace(
        /%20/g,
        "+"
      )}&location=${location}&distance=${distance}&filter=${filter}&sort=${sortFilters}`,
      options
    );

    yield put(setCompanies(response.data));
  } catch (error) {
    const errors = error.response.data.error;
    yield put(setErrors(errors));
  }
}
export function* getAutoComplete(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const response = yield call(api.get, `/ajax/search?query=${params.payload}`, options);
    yield put(setAutoComplete(response.data));
  } catch (error) {
    console.error(error);
  }
}
export function* checkHasCompany() {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const response = yield call(appApi.get, `users/claimed/companies`, options);
    yield put(setUserHasCompany(response.data));
  } catch (error) {
    console.error(error);
  }
}



