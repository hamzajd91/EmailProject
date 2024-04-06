import {call, put} from "redux-saga/effects";
import api from "../../../services/api";
import {
  setProfile,
  setErrors,
  setReviews,
  setPermissions,
  setReviewFilters,
  emptyReviews,
  setFilteredReviews,
  setDetails,
} from "./actions";

export function* getProfile(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };
    const {id} = params.payload;

    const response = yield call(api.get, `/companies/${id}?fields=ratings&new=${params.payload.new}`, options);
    yield put(setProfile(response.data.company));
    yield put(setPermissions(response.data.permissions));
    yield put(setReviews(response.data.reviews));
  } catch (error) {
    console.log(error);
    // yield put(setErrors())
  }
}
export function* getDetails(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: token || ""},
    };
    const {id} = params.payload;

    const response = yield call(api.get, `/companies/${id}`, options);
    console.log(response);

    if (response.data.redirect) {
      window.location.href = response.data.url;
    }

    yield put(setDetails(response.data));
  } catch (error) {
    yield put(setErrors("Company Not found"));
  }
}
export function* saveDetails(data: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };
    const {companyId} = data.payload;

    yield call(api.put, `/companies/${companyId}`, data.payload, options);
    // yield put(saveSuccess());
  } catch (error) {
    yield put(error);
  }
}
export function* filterReviews(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };
    const {companyId, currentFilters} = params.payload;

    const response = yield call(
      api.get,
      `/companies/${companyId}?r_s=${currentFilters.r_s}&r_l=${currentFilters.r_l}&r_d=${currentFilters.r_d}&r_o=${currentFilters.r_o}`,
      options
    );
    yield put(emptyReviews([]));
    yield put(setFilteredReviews(response.data.reviews));

    yield put(setReviewFilters(response.data.currentRatingFilters));
  } catch (error) {
    console.log(error);
  }
}
export function* loadMoreReviews(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };
    const {id, page, currentFilters} = params.payload;

    const response = yield call(
      api.get,
      `/companies/${id}?page=${page}&r_s=${currentFilters.r_s}&r_l=${currentFilters.r_l}&r_d=${currentFilters.r_d}&r_o=${currentFilters.r_o}`,
      options
    );
    yield put(setReviews(response.data.reviews));
  } catch (error) {
    console.log(error);
  }
}
export function* claimCompany(body: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };
    const {companyId} = body.payload;

    yield call(api.post, `/companies/${companyId}/claim`, body.payload, options);
  } catch (error) {
    console.log(error);
    // yield put(setErrors({"Un"}))
  }
}
export function* updateBanner(body: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const {id, data} = body.payload;
    const options = {
      headers: {Authorization: `JWT ${token}`},
    };

    yield call(api.put, `/companies/${id}/image`, data, options);
  } catch (error) {
    console.log(error);
  }
}

export function* bookmarkCompany(params: any) {
  try {
    const {id, favorite} = params.payload;
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}` || ""},
    };
    if (favorite) {
      yield call(api.delete, `/companies/${id}/favorite`, options);
      const response = yield call(api.get, `/companies/${id}?fields=ratings`, {
        headers: {Authorization: `JWT ${token}` || ""},
      });
      yield put(setProfile(response.data.company));
    } else {
      yield call(api.post, `/companies/${id}/favorite`, {}, options);
      const response = yield call(api.get, `/companies/${id}?fields=ratings`, {
        headers: {Authorization: `JWT ${token}` || ""},
      });
      yield put(setProfile(response.data.company));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* shareCompany(params: any) {
  try {
    const id = params.payload.companyId;
    const body = {
      emails: params.payload.emails,
      note: params.payload.notes,
    };
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}` || ""},
    };

    yield call(api.put, `/companies/${id}/share`, body, options);
  } catch (error) {
    console.log(error);
  }
}
export function* setHelpfulReview(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}` || ""},
    };
    const id = params.payload;

    yield call(api.put, `/reviews/${id}/vote`, {}, options);
  } catch (error) {
    console.log(error);
  }
}
export function* removeHelpfulReview(params: any) {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: `JWT ${token}` || ""},
    };
    const id = params.payload;

    yield call(api.delete, `/reviews/${id}/vote`, options);
  } catch (error) {
    console.log(error);
  }
}
